<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <!-- <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/cms/assignment" />
        <q-breadcrumbs-el label="Listing" icon="list" />
      </q-breadcrumbs> -->
    </div>
    <div class="q-pa-md">
      <q-btn color="grey-8" icon="add" label="New Policy"/>
    </div>
    <div class="q-pa-md">
      <q-table
      title="Type of Policies"
      :data="tableData"
      :columns="columns"
      separator="cell"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td class="text-green-9">{{props.row.id}}</q-td>
          <q-td>{{props.row.policy_type}}</q-td>
          <q-td><q-btn color="grey-8" label="View" v-bind:to="'/cms/settings/policy#'+props.row.id" size="sm" icon="search"/></q-td>
        </q-tr>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
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
        { align: 'left', name: 'policy_type', label: 'Type of Policy', field: 'policy_type', sortable: true },
        { align: 'left', name: 'action', label: 'Action', field: 'action', sortable: false }
      ]
    }
  },
  methods: {
    getListingData () {
      this.$axios.get('api/policy').then(res => {
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
