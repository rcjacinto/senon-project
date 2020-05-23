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
				title="Assignment"
				:data="data"
				:columns="columns"
				row-key="id"
				:pagination.sync="pagination"
				:loading="loading"
				:filter="filter"
				@request="getListingData"
				binary-state-sort
			>
				<template v-slot:top-right>
					<q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
				<template v-slot:body-cell-action="cellProperties">
					<q-td :props="cellProperties">
						<router-link
							class="q-mr-sm"
							:to="{ path: '/cms/assignment/modify/' + cellProperties.value }"
						>
							<q-btn
								flat
								round
								color="primary"
								icon="search"
							>
							</q-btn>
						</router-link>
					</q-td>
				</template>
			</q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: ''
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
				{ align: 'left', name: 'date_assigned', label: 'Date Assigned', field: 'date_assigned', sortable: true },
        { align: 'left', name: 'ref_num', label: 'Reference Number', field: 'ref_no', sortable: true },
        { align: 'left', name: 'insurer', label: 'Insurance', field: 'insurer', sortable: true },
        { align: 'left', name: 'broker', label: 'Broker', field: 'broker', sortable: true },
        { align: 'left', name: 'adjust', label: 'Adjuster', field: 'adjuster' },
        { align: 'left', name: 'insured', label: 'Insured', field: 'name_insured' },
        { align: 'left', name: 'aging', label: 'Aging', field: 'date_loss', sortable: true },
        { align: 'left', name: 'status', label: 'Status', field: 'status', sortable: true },
        {
          name: 'action',
          label: 'ACTION',
          align: 'center',
          field: row => row.id,
          format: val => `${val}`,
          sortable: false
        }
      ],
      data: []
    }
	},
  mounted () {
		// get initial data from server (1st page)
    this.getListingData({
      pagination: this.pagination,
      filter: undefined
    })
	},	
  methods: {
		// get list of assignments per page
    getListingData (props) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
			const filter = props.filter
			
			this.loading = true

      // update rowsCount with appropriate value
			this.pagination.rowsNumber = this.getRowsNumberCount(filter)

			// get all rows if "All" (0) is selected
			const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage

			// calculate starting row of data
			const startRow = (page - 1) * rowsPerPage

			// fetch list of assignments within the given parameters
      this.$axios.get('api/assignment?startRow=' + startRow + '&fetchCount=' + fetchCount + '&orderBy=' + sortBy)
        .then(response => {
          this.data.splice(0, response.data.data.length, ...response.data.data)

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        })
		},
		// calculate rowsCount with appropriate value
		getRowsNumberCount (filter) {
      this.$axios.get('api/assignment')
        .then(response => {
					if (!filter) {
						return response.data.data.length
          }
          let count = 0
          response.data.data.forEach(data => {
            if (data['ref_no'].includes(filter)) {
              ++count
            }
            if (data['insurer'].includes(filter)) {
              ++count
            }
            if (data['broker'].includes(filter)) {
              ++count
            }
            if (data['adjuster'].includes(filter)) {
              ++count
						}
						if (data['name_insured'].includes(filter)) {
              ++count
						}
						if (data['date_loss'].includes(filter)) {
              ++count
						}
						if (data['status'].includes(filter)) {
              ++count
            }
          })

          return count
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
