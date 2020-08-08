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
          <q-select :disable="actionType === 'view'" v-model="userType" :options="userLevel" label="User Level" stack-label/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="(actionType === 'view') ? 'Close' : 'Cancel'" v-close-popup />
          <q-btn flat :disable="userType === null || user === null || fullName === null" @click="performAction" v-if="!(actionType === 'view')" :label="buttonText" color="primary" v-close-popup />
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
      @request="getListingData"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td class="text-green-9">{{props.row.id}}</q-td>
          <q-td>{{props.row.name}}</q-td>
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
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 5
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
      ],
      data: []
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
      this.fullName = data.name
      this.user = data.email
      this.id = data.id
      this.userType = this.userLevel.find((e) => e.label === data.user_level)
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
        name: this.fullName,
        user_level_id: this.userType.value
      }

      let method

      if (this.actionType === 'update') {
        method = this.$axios.patch(`/api/users/${this.id}`, { data: payload })
      } else {
        method = this.$axios.post('/api/register', payload)
      }
        method.then((result) => {
          if (result) {
            this.$q.notify({
              color: 'positive',
              message: `Record has been ${(this.actionType === 'update') ? 'updated' : 'created'} successfully`,
              position: 'top-right'
            })
            this.getListingData(
              {
                pagination: this.pagination,
                filter: undefined
              }
            )
          }
        })
        .catch((error) => {
          this.$q.notify({
            color: 'negative',
            message: `Failed to ${(this.actionType === 'update') ? 'updated' : 'created'} record`,
            position: 'top-right'
          })
        })
    },
    async getListingData (props) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
			const filter = props.filter

			this.loading = true

      // update rowsCount with appropriate value
			// this.pagination.rowsNumber = await this.getRowsNumberCount(filter)

			// get all rows if "All" (0) is selected
			const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

			// calculate starting row of data
			const startRow = (page - 1) * rowsPerPage

			// fetch list of assignments within the given parameters
      await this.$axios.get('api/users?startRow=' + startRow + '&fetchCount=' + fetchCount + '&orderBy=' + sortBy)
        .then(response => {
          this.tableData = response.data.data

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        })
    },
    async getUserLevels () {
      await this.$axios.get('api/user_levels')
        .then((response) => {
          this.tableData = response.data.map((element) => {
            return {
              value: element.id,
              label: element.user_level
            }
          })
        })
        .catch((error) => {
        })
    }
  },
  created () {
    this.getUserLevels()
    this.getListingData(
      {
        pagination: this.pagination,
        filter: undefined
      }
    )
  }
}
</script>
