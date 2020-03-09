<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/cms/assignment" />
        <q-breadcrumbs-el label="Listing" icon="list" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <q-btn color="primary" label="Create New Assignment" v-bind:to="'/cms/assignment/create'"/>
    </div>
    <div class="q-pa-md">
      <q-table
      title="Insurance Assignment"
      :data="tableData"
      :columns="columns"
      separator="cell"
    >
        <q-tr slot="body" slot-scope="props" :props="props">
          <q-td class="text-green-9">{{props.row.date_assigned}}</q-td>
          <q-td>{{props.row.ref_no}}</q-td>
          <q-td>{{props.row.insurer}}</q-td>
          <q-td>{{props.row.broker}}</q-td>
          <q-td>{{props.row.adjuster}}</q-td>
          <q-td>{{props.row.name_insured}}</q-td>
          <q-td>{{props.row.third_party}}</q-td>
          <q-td>{{props.row.date_loss}}</q-td>
          <q-td>{{props.row.status}}</q-td>
          <q-td><q-btn color="primary" label="View" v-bind:to="'/cms/assignment/modify/'+props.row.id" size="sm" icon="search"/></q-td>
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
        { align: 'left', name: 'date_assigned', label: 'Date Assigned', field: 'date_assigned', sortable: true },
        { align: 'left', name: 'ref_num', label: 'Reference Number', field: 'ref_no', sortable: true },
        { align: 'left', name: 'insurer', label: 'Insurance', field: 'insurer', sortable: true },
        { align: 'left', name: 'broker', label: 'Broker', field: 'broker', sortable: true },
        { align: 'left', name: 'adjust', label: 'Adjuster', field: 'adjuster' },
        { align: 'left', name: 'insured', label: 'Insured', field: 'name_insured' },
        { align: 'left', name: 'third', label: 'Claimant', field: 'third_party' },
        { align: 'left', name: 'aging', label: 'Aging', field: 'date_loss', sortable: true },
        { align: 'left', name: 'status', label: 'Status', field: 'status', sortable: true },
        { align: 'left', name: 'action', label: 'Action', field: 'action', sortable: false }
      ]
    }
  },
  methods: {
    getListingData () {
      this.$axios.get('api/assignment').then(res => {
        let result = []
        result = res.data.data
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
