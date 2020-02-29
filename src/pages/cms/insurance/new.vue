<template>
  <q-page padding>
     <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/assignment" />
        <q-breadcrumbs-el label="Create New Assignment" icon="assignment_turned_in" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <p class="text-h5">Create Assignment</p>
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Reference Number" v-model="form.ref_no" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date Assigned" v-model="form.date_assigned" stack-label type="date"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Type of Policy" v-model="form.pol_type" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Policy No." v-model="form.pol_no" stack-label/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Insured" stack-label v-model="form.name_insured"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Address" stack-label v-model="form.risk_location"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Nature of Loss" v-model="form.nature_loss" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date of Loss" v-model="form.date_loss" stack-label type="date"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Loss Reserve" v-model="form.loss_reserve" stack-label/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Adjuster" v-model="form.adjuster" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Insurer" v-model="form.insurer" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Third Party" v-model="form.third_party" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Broker" v-model="form.broker" stack-label/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Remarks" stack-label v-model="form.remarks" type="textarea"/>
        </div>
      </div>
    </div>
    <!-- Breal -->
    <div class="q-pa-md">
      <q-btn label="Create" icon="done" color="primary" @click="submit()"/>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
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
        contact_person: 91212345671,
        third_party: null,
        broker: null,
        remarks: null,
        status_list_id: 1,
        created_by: 'admin'
      }
    }
  },
  methods: {
    submit () {
      this.$q.loading.show()
      this.$axios.post('/api/assignment', this.form).then(res => {
        this.$q.loading.hide()
        console.log(res)
        this.$q.notify({
          color: 'positive',
          message: 'Record has been created successfully',
          position: 'top-right'
        })
        this.$router.push('/assignment')
      }).catch((err) => {
        console.log(err)
        this.$q.notify({
          color: 'negative',
          message: 'Failed to create record',
          position: 'top-right'
        })
        this.$q.loading.hide()
      })
    }
  }
}
</script>
