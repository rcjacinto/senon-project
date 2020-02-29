<template>
  <q-page padding>
     <div class="row items-start">
       <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-secondary text-white">

            <q-icon name="all_inbox" style="font-size:48px;"/>
            <div class="text-h6">Reports</div>
          </q-card-section>

        </q-card>
       </div>

       <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-secondary text-white">
            <q-icon name="account_box" style="font-size:48px;"/>
            <div class="text-h6">Accounts </div>
          </q-card-section>

        </q-card>
       </div>

       <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-secondary text-white">
            <q-icon name="assignment" style="font-size:48px;"/>
            <div class="text-h6">Assignments</div>
          </q-card-section>
        </q-card>
       </div>
  </div>
  </q-page>
</template>

<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
  // name: 'PageName',
}
</script>
