<template>
  <q-page padding>
     <div class="q-pa-md ">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/cms/assignment" />
        <q-breadcrumbs-el label="Assignment Details" icon="assignment_turned_in" />
      </q-breadcrumbs>
    </div>
     <q-form
      @submit="onSubmit"
      ref="copyForm"
      >
    <div class="q-pa-md">
      <p class="text-h5">Manage Assignment</p>
      <div class="row">
        <div class="col-5"><q-btn icon="edit" label="Edit Details" class="q-ma-sm" @click="edit =!edit" color="primary" v-if="edit"/>
        <q-btn icon="compare" label="Receiving Copy" color="blue-5" @click="receiving_prompt =!receiving_prompt" class="q-ma-sm"/></div>
        <div class="col-7 text-right"><q-btn color="primary" label="Manage Status"  @click="prompt = true"/></div>
      </div>
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Reference Number" readonly v-model="form.ref_no" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date Assigned" v-model="form.date_assigned" stack-label type="date" readonly/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Type of Policy" :disable="edit" v-model="form.pol_type" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Policy No." :disable="edit" v-model="form.pol_no" stack-label />
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Insured" :disable="edit" stack-label v-model="form.name_insured" :rules="[ val => val && val.length > 0 || 'Required']"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Location of Risk" :disable="edit" stack-label v-model="form.risk_location" :rules="[ val => val && val.length > 0 || 'Required']"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Nature of Loss" :disable="edit" v-model="form.nature_loss" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date of Loss" :disable="edit" v-model="form.date_loss" stack-label type="date" :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Loss Reserve" :disable="edit" v-model="form.loss_reserve" stack-label />
          </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Adjuster" :disable="edit" v-model="form.adjuster" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Insurer" :disable="edit" v-model="form.insurer" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Third Party" :disable="edit" v-model="form.third_party" stack-label />
          </div>
          <div class="col q-ma-sm">
            <q-input label="Broker" :disable="edit" v-model="form.broker" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Contact Person" :disable="edit" v-model="form.contact_person" stack-label />
          </div>
          <div class="col q-ma-sm">
            <q-input label="Contact Number" :disable="edit" v-model="form.contact_number" stack-label />
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Remarks" :disable="edit" stack-label v-model="form.remarks" type="textarea"/>
        </div>
      </div>
    </div>
    <!-- Break -->
    <div class="q-pa-md">
      <q-btn label="Update" icon="done_all" color="primary" :disable="edit" type="submit"/>
    </div>
    </q-form>
    <!-- Receiving Copy -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Status</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-select v-model="form.status_id_list" :options="options" label="Event Status" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Confirm" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Receiving Copy -->
    <q-dialog v-model="receiving_prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Receiving Copy</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select v-model="receiving_copy.reports" :options="reportOptions" label="Report" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Attachment" type="file" v-model="receiving_copy.file" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
        </q-card-section>

        <q-card-section class="q-pt-none">
            <q-input label="Received by" v-model="receiving_copy.received_by" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-input label="Date Received" type="date" v-model="receiving_copy.date_received" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-select v-model="receiving_copy.status" :options="options" label="Event Status" />
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" type="button" v-close-popup />
          <q-btn label="Confirm" type="submit" @click="submitReceivingCopy()" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  // name: 'PageName',
  data () {
    return {
      edit: true,
      prompt: false,
      receiving_prompt: false,
      options: [],
      reportOptions: [],
      receiving_copy: {
        reports: null,
        file: null,
        received_by: null,
        date_received: null,
        status: null
      },
      form: {
        date_assigned: null,
        ref_no: null,
        pol_type: null,
        pol_no: null,
        name_insured: null,
        risk_location: null,
        nature_loss: null,
        date_loss: null,
        loss_reserve: null,
        adjuster: null,
        insurer: null,
        contact_person: null,
        contact_number: null,
        third_party: null,
        broker: null,
        remarks: null,
        status_list_id: 1,
        created_by: 'admin'
      }
    }
  },
  created () {
    this.getAssignmentInfo()
    this.getStatusListInfo()
    this.getReportsListInfo()
  },
  methods: {
    onSubmit () {
      this.$refs.copyForm.validate().then(success => {
        if (success) {
          this.submitValidatedForm()
        } else {

        }
      })
    },
    getStatusListInfo () {
      this.$axios.get('/api/status_lists').then(res => {
        const statList = []
        res.data.map(e => {
          statList.push({
            value: e.id,
            label: e.status
          })
        })
        this.options = statList
      })
    },
    getReportsListInfo () {
      this.$axios.get('/api/report_lists').then(res => {
        const reportList = []
        res.data.map(e => {
          reportList.push({
            value: e.id,
            label: e.report
          })
        })
        this.reportOptions = reportList
      })
    },
    getAssignmentInfo () {
      const assignId = this.$route.params.id
      this.$axios.get('/api/assignment/edit/' + assignId).then(res => {
        this.form = res.data
      })
    },
    submitValidatedForm () {
      this.$q.loading.show()
      this.$axios.post('/api/assignment/' + this.$route.params.id, {
        data: this.form,
        _method: 'PATCH'
      }).then(res => {
        this.$q.loading.hide()
        console.log(res)
        this.$q.notify({
          color: 'positive',
          message: 'Record has been updated successfully',
          position: 'top-right'
        })
        this.$router.push('/cms/assignment')
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          message: err.response.data.message,
          position: 'top-right'
        })
        this.$q.loading.hide()
      })
    },
    submitReceivingCopy () {
      let data = new FormData()
      data.append('attachment', this.receiving_copy.file[0])
      data.append('received_date', this.receiving_copy.date_received)
      data.append('status_list_id', this.receiving_copy.status.value)
      data.append('received_by', this.receiving_copy.received_by)
      data.append('assignment_id', this.$route.params.id)
      data.append('report_submitted_id', this.receiving_copy.reports.value)
      data.append('report_submitted', this.receiving_copy.reports.label)
      this.$q.loading.show()
      this.$axios.post('/api/receiving', data, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        this.$q.loading.hide()
        this.$q.notify({
          color: 'positive',
          message: 'Receiving Copy has been created successfully',
          position: 'top-right'
        })
      }).catch((err) => {
        this.$q.notify({
          color: 'negative',
          message: err.response.data.message,
          position: 'top-right'
        })
        this.$q.loading.hide()
      })
    }
  }
}
</script>
