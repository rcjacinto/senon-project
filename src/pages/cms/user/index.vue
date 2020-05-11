<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"> {{ labelText }} User</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Email" :disable="actionType === 'view'" v-model="user" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          <q-input label="Full Name" :disable="actionType === 'view'" v-model="fullName" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
            <q-select v-model="userType" :options="userLevel" label="User Level" stack-label/>
          <q-input type="password" label="Password" :disable="actionType === 'view'" v-model="password" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          <q-input type="password" label="Confirm Password" :disable="actionType === 'view'" v-model="enPassword" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="(actionType === 'view') ? 'Close' : 'Cancel'" v-close-popup />
          <q-btn flat :disable="password!=enPassword || password===''" @click="performAction" v-if="!(actionType === 'view')" :label="buttonText" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <!-- <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/cms/assignment" />
        <q-breadcrumbs-el label="Listing" icon="list" />
      </q-breadcrumbs> -->
    </div>
    <div class="q-pa-md">
      <q-btn color="grey-8" @click="openDialog('add', { id: null, user: '' })" icon="add" label="New User"/>
    </div>
    <div class="q-pa-md">
      <q-table
      title="User Module"
      :data="tableData"
      :columns="columns"
      separator="cell"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td class="text-green-9">{{props.row.id}}</q-td>
          <q-td>{{props.row.fullName}}</q-td>
          <q-td>{{props.row.email}}</q-td>
          <q-td>
            <q-btn @click="openDialog('view', props.row)" color="grey-8" label="View" size="sm" icon="search"/>
            &nbsp;
            <q-btn @click="openDialog('update', props.row)" color="yellow-8" label="Update" size="sm" icon="update"/>
          </q-td>
        </q-tr>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { firebaseAuth, firebaseDb } from 'boot/firebase'

export default {
  data () {
    return {
      prompt: false,
      user: '',
      fullName: '',
      id: '',
      actionType: 'view',
      userType: null,
      tableData: [],
      password: '',
      enPassword: '',
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { align: 'left', name: 'id', label: '#', field: 'id', sortable: true },
        { align: 'left', name: 'fullName', label: 'Full Name', field: 'fullName', sortable: true },
        { align: 'left', name: 'email', label: 'Email', field: 'email', sortable: true },
        { align: 'left', name: 'action', label: 'Action', field: 'action', sortable: false }
      ],
      userLevel: [
        {
          label: 'Admin',
          value: 1
        },
        {
          label: 'User',
          value: 2
        }
      ]
    }
  },
  computed: {
    buttonText () {
      if (this.actionType === 'view') {
        return 'Confirm'
      } else if (this.actionType === 'update') {
        return 'Update'
      }
      return 'Add'
    },
    labelText () {
      if (this.actionType === 'view') {
        return 'View'
      } else if (this.actionType === 'update') {
        return 'Update'
      }
      return 'Add'
    }
  },
  methods: {
    openDialog (value, data) {
      this.actionType = value
      this.prompt = true
      this.user = data.user
      this.id = data.id
    },
    checkPassword () {
      if (this.password !== this.enPassword) {
        this.$q.notify({
          color: 'negative',
          message: 'Invalid Password',
          position: 'top-right'
        })
      }
    },
    performAction () {
      let payload = {
        email: this.user,
        password: this.password,
        name: this.fullName,
        userType: this.userType
      }
      firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          /* CREATE RECORD ON DB */
          let userId = firebaseAuth.currentUser.uid
          firebaseDb.doc('users/' + userId).set({
            fullName: payload.name,
            email: payload.email,
            userType: payload.userType
          })
          this.$q.notify({
            color: 'positive',
            message: `Record has been added successfully`,
            position: 'top-right'
          })
          this.getListingData()
        })
        .catch(err => {
          return err
        })
    },
    performAction2 () {
      this.$q.loading.show()
      let action = ''
      if (this.actionType === 'update') {
        action = this.$axios.patch(`/api/brokers/${this.id}`, { data: { user: this.user } })
      } else {
        action = this.$axios.post('/api/brokers', { user: this.user })
      }
      action.then(res => {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          message: `Record has been ${(this.actionType === 'update') ? 'updated' : 'created'} successfully`,
          position: 'top-right'
        })
        this.getListingData()
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          message: err.response.data.message,
          position: 'top-right'
        })
        this.$q.loading.hide()
      })
    },
    async getListingData () {
      this.tableData = []
      await firebaseDb.collection('users').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.tableData.push({ id: doc.id, ...doc.data() })
          })
        })
      console.log(this.tableData)
    }
  },
  created () {
    this.getListingData()
  }
}
</script>
