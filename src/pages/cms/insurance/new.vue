<template>
  <q-page padding>
     <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/assignment" />
        <q-breadcrumbs-el label="Create New Assignment" icon="assignment_turned_in" />
      </q-breadcrumbs>
    </div>
     <q-form
      @submit="onSubmit"
      ref="myForm"
      >
    <div class="q-pa-md">
      <p class="text-h5">Create Assignment</p>
      <div class="row">
          <!-- <div class="col q-ma-sm">
            <q-input label="Reference Number" type="hidden" v-model="form.ref_no" stack-label/>
          </div> -->
          <div class="col q-ma-sm">
            <q-input label="Date Assigned" v-model="form.date_assigned" stack-label type="date" readonly/>
          </div>
          <div class="col q-ma-sm">
            <q-select v-model="form.pol_type" :options="policies" label="Type of Policy" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Policy No." v-model="form.pol_no" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Insured" stack-label v-model="form.name_insured" :rules="[ val => val && val.length > 0 || 'Required']"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Location of Risk" stack-label v-model="form.risk_location" :rules="[ val => val && val.length > 0 || 'Required']"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Nature of Loss" v-model="form.nature_loss" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date of Loss" v-model="form.date_loss" stack-label type="date" :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Loss Reserve" v-model="form.loss_reserve" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-select v-model="form.adjuster" :options="adjuster" label="Adjuster" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-select v-model="form.insurer" :options="insurer" label="Insurer" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Third Party" v-model="form.third_party" stack-label :rules="[ val => val && val.length > 0 || 'Required']"/>
          </div>
          <div class="col q-ma-sm">
            <q-select v-model="form.broker" :options="broker" label="Broker" stack-label/>
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
      <q-btn label="Create" icon="done" color="primary" type="submit"/>
    </div>
    </q-form>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  // name: 'PageName',
  data () {
    return {
      policies: [],
      broker: [],
      adjuster: [],
      insurer: [],
      form: {
        date_assigned: date.formatDate(new Date(), 'YYYY-MM-DD'),
        ref_no: null,
        pol_type: null,
        pol_no: null,
        name_insured: null,
        risk_location: null,
        nature_loss: null,
        date_loss: date.formatDate(new Date(), 'YYYY-MM-DD'),
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
  created () {
    this.$q.loading.show()
    this.getPolicy()
    this.getInsurer()
    this.getAdjuster()
    this.getBroker()
    this.$q.loading.hide()
  },
  methods: {
    onSubmit () {
      this.$refs.myForm.validate().then(success => {
        if (success) {
          this.submitValidatedForm()
        } else {

        }
      })
    },
    submitValidatedForm () {
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
        this.$q.notify({
          color: 'negative',
          message: err.response.data.message,
          position: 'top-right'
        })
        this.$q.loading.hide()
      })
    },
    getAdjuster () {
      /* Adjusters */
      this.$axios.get('/api/adjuster').then(res => {
        console.log(res)
        this.adjuster = res.data.map(re => {
          return {
            label: re.adjuster,
            value: re.id
          }
        })
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getBroker () {
      /* Brokers */
      this.$axios.get('/api/brokers').then(res => {
        this.broker = res.data.map(re => {
          return {
            label: re.broker,
            value: re.id
          }
        })
        console.log(this.broker)
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getInsurer () {
      /* Insurers */
      this.$axios.get('/api/insurer').then(res => {
        console.log(res)
        this.insurer = res.data.map(re => {
          return {
            label: re.insurer,
            value: re.id
          }
        })
      }).catch(err => {
        console.log(err.response.data)
      })
    },
    getPolicy () {
      /* Policies */
      this.$axios.get('/api/policy').then(res => {
        console.log(res)
        this.policies = res.data.map(re => {
          return {
            label: re.policy_type,
            value: re.id
          }
        })
      }).catch(err => {
        console.log(err.response.data)
      })
    }
  }
}
</script>
