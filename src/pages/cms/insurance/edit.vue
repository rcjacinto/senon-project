<template>
  <q-page padding>
     <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs class="text-right">
        <q-breadcrumbs-el label="Insurance Assignment" icon="assignment" to="/assignment" />
        <q-breadcrumbs-el label="View/ Edit Assignment" icon="assignment_turned_in" />
      </q-breadcrumbs>
    </div>
    <div class="q-pa-md">
      <p class="text-h5">View/Edit Assignment</p>
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Reference Number" v-model="form.refNo" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date Assigned" v-model="form.insuredDate" stack-label type="date"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Type of Policy" v-model="form.typeOfPolicy" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Policy No." v-model="form.policyNo" stack-label/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Insured" stack-label v-model="form.isInsured"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
        <div class="col q-ma-sm">
          <q-input label="Address" stack-label v-model="form.address"/>
        </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Nature of Loss" v-model="form.natureOfLoss" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Date of Loss" v-model="form.dateOfLoss" stack-label type="date"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Loss Reserve" v-model="form.lossReserve" stack-label/>
          </div>
      </div>
      <!-- Break -->
      <div class="row">
          <div class="col q-ma-sm">
            <q-input label="Adjuster" v-model="form.adjuster" stack-label/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Insurer" v-model="form.insurer" stack-label type="date"/>
          </div>
          <div class="col q-ma-sm">
            <q-input label="Third Party" v-model="form.thirdParty" stack-label/>
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
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      form: {
        insuredDate: null,
        refNo: null,
        typeOfPolicy: null,
        policyNo: null,
        isInsured: null,
        address: null,
        natureOfLoss: null,
        dateOfLoss: null,
        lossReserve: null,
        adjuster: null,
        insurer: null,
        thirdParty: null,
        broker: null,
        remarks: null
      }
    }
  }
}
</script>
