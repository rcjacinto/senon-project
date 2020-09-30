<template>
	<q-page padding>
    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Borderaux" icon="print" to="/cms/borderaux" />
        <q-breadcrumbs-el label="Listing" icon="list" />
      </q-breadcrumbs>
    </div>
    <!-- <div class="q-pa-md">
      <q-btn color="primary" label="Create New Assignment" v-bind:to="'/cms/assignment/create'"/>
    </div> -->
		<div class="q-pa-md">
			<div class="row">
				<div class="col q-ma-sm">
					<q-select v-model="reportSelected" :options="reportSelection" @input="onReportSelected" label="Selection" emit-value map-options/>
				</div>
				<div class="col q-ma-sm">
					<q-select v-model="filter" :options="filterOptions" label="Selection" emit-value map-options/>
				</div>
				<div class="col q-ma-sm q-gutter-sm">
					<q-btn color="primary" label="Generate" @click="generateReport"/>
					<q-btn color="primary" label="Export" @click="exportReport"/>
				</div>
			</div>
    </div>

		<br/>

		<div class="q-pa-md">
			<div class="row">
				{{ reportSelected }}
			</div>
		</div>
  </q-page>
</template>

<script>
export default {
	data () {
		return {
			reportSelected: null,
			filter: null,
			reportSelection: [
				{
					label: 'Per Adjuster',
					value: 'adjuster'
				},
				{
					label: 'Per Broker',
					value: 'broker',
				},
				{
					label: 'Per Insurer',
					value: 'insurer'
				},
				// {
				// 	label: 'Quarterly Report',
				// 	value: 'quarterly'
				// }
			],
			filterOptions: []
		}
	},

	methods: {
		async onReportSelected () {
			const selection = this.reportSelected

			this.filterOptions = []
			
			if (selection !== 'quarterly') {
				const result = await this.$axios.get('api/selection_options?selection=' + selection)
					.then(response => response.data)
					.catch(error => console.log(error))

				if (selection === 'adjuster') {
					this.filterOptions = result.map(result => {
						return { label: result.adjuster, value: result.adjuster }
					})
				}

				if (selection === 'broker') {
					this.filterOptions = result.map(result => {
						return { label: result.broker, value: result.broker }
					})
				}

				if (selection === 'insurer') {
					this.filterOptions = result.map(result => {
						return { label: result.insurer, value: result.insurer }
					})
				}
			}
		},

		generateReport () {
			//
		},

		exportReport () {
			const selection = this.reportSelected
			const filter = this.filter
			
			window.open(`http://localhost/senon-be/public/api/export_report?selection=${selection}&value=${filter}`)
		}
	}
}
</script>