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
				<template v-slot:body-cell-action="actionProperty">
					<q-td :props="actionProperty">
						<router-link
							class="q-mr-sm"
							:to="{ path: '/cms/assignment/modify/' + actionProperty.value }"
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
import Vue from 'vue'

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
        rowsNumber: 10
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
        { align: 'left', name: 'ref_no', label: 'Reference Number', field: 'ref_no', sortable: true },
        { align: 'left', name: 'insurer', label: 'Insurance', field: 'insurer', sortable: true },
        { align: 'left', name: 'broker', label: 'Broker', field: 'broker', sortable: true },
        { align: 'left', name: 'adjuster', label: 'Adjuster', field: 'adjuster' },
        { align: 'left', name: 'name_insured', label: 'Insured', field: 'name_insured' },
        { align: 'left', name: 'nature_loss', label: 'Nature of Loss', field: 'nature_loss' },
        { align: 'left', name: 'date_loss', label: 'Date of Loss', field: 'date_loss' },
        { align: 'left', name: 'contact_person', label: 'Contact Person', field: 'contact_person' },
        { align: 'left', name: 'contact_number', label: 'Contact Number', field: 'contact_number' },
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
    async getListingData (props) {
      const { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
			const filter = props.filter
			
			this.loading = true

      // update rowsCount with appropriate value
			this.pagination.rowsNumber = await this.getRowsNumberCount(filter)

			// get all rows if "All" (0) is selected
			const fetchCount = rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage
			
			// calculate starting row of data
			const startRow = (page - 1) * rowsPerPage

			// fetch list of assignments within the given parameters
      await this.$axios.get('api/assignment?startRow=' + startRow + '&fetchCount=' + fetchCount + '&sortBy=' + sortBy + '&filterBy=' + filter)
        .then(response => {
          this.data.splice(0, this.data.length, ...response.data.data)

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
			return new Promise((resolve, reject) => {
				this.$axios.get('api/filtered_assignments_count?filter=' + filter)
				.then(response => {
					resolve(response.data[0].count)
				})
				.catch(error => console.log(error))
			})
		}
  }
}
</script>
