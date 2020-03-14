<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"> {{ labelText }} Broker</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Broker" :disable="actionType === 'view'" v-model="broker" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat :label="(actionType === 'view') ? 'Close' : 'Cancel'" v-close-popup />
          <q-btn flat @click="performAction" v-if="!(actionType === 'view')" :label="buttonText" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
      <!-- <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/cms/assignment" />
        <q-breadcrumbs-el label="Listing" icon="list" />
      </q-breadcrumbs> -->
    </div>
    <div class="q-pa-md">
      <q-btn color="grey-8" @click="openDialog('add', { id: null, broker: '' })" icon="add" label="New Broker"/>
    </div>
    <div class="q-pa-md">
      <q-table
      title="Broker Module"
      :data="tableData"
      :columns="columns"
      separator="cell"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td class="text-green-9">{{props.row.id}}</q-td>
          <q-td>{{props.row.broker}}</q-td>
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
export default {
  data () {
    return {
      prompt: false,
      broker: '',
      id: '',
      actionType: 'view',
      tableData: '',
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 3
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { align: 'left', name: 'id', label: '#', field: 'id', sortable: true },
        { align: 'left', name: 'broker', label: 'Broker Name', field: 'broker', sortable: true },
        { align: 'left', name: 'action', label: 'Action', field: 'action', sortable: false }
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
      this.broker = data.broker
      this.id = data.id
    },
    performAction () {
      this.$q.loading.show()
      let action = ''
      if (this.actionType === 'update') {
        action = this.$axios.patch(`/api/brokers/${this.id}`, { data: { broker: this.broker } })
      } else {
        action = this.$axios.post('/api/brokers', { broker: this.broker })
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
    getListingData () {
      this.$axios.get('api/brokers').then(res => {
        let result = []
        result = res.data
        this.tableData = result
        console.log(this.tableData)
      })
    }
  },
  created () {
    this.getListingData()
  }
}
</script>
