<template>
  <q-page padding>
    <div class="row items-start">
      <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">

            <q-icon name="all_inbox" style="font-size:48px;"/>
            <div class="text-h6">Borderaux</div>
          </q-card-section>

        </q-card>
      </div>

      <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <q-icon name="account_box" style="font-size:48px;"/>
            <div class="text-h6">Accounts </div>
          </q-card-section>

        </q-card>
      </div>

      <div class="col q-pa-md">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <q-icon name="assignment" style="font-size:48px;"/>
            <div class="text-h6">Assignments</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row items-start">
      <div class="col-sm-12 col-md-7 col-lg-7 q-pa-md">
        <q-markup-table flat bordered square>
          <thead class="bg-primary text-white">
            <tr>
              <th colspan="3">
                <div class="row">
                  <div class="text-h6 text-uppercase">Cases per adjuster</div>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left text-uppercase">Adjuster</th>
              <th class="text-right text-uppercase">Active</th>
              <th class="text-right text-uppercase">Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cases" v-bind:key="item.adjuster">
              <td class="text-left">{{ item.adjuster }}</td>
              <td class="text-right">{{ item.active }}</td>
              <td class="text-right">{{ item.completed }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      <div class="col-sm-12 col-md-5 col-lg-5 q-pa-md">
        <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 q-mb-xs">Announcements</div>
        </q-card-section>
          <q-list>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="notification_important" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Announcement 1</q-item-label>
                <q-item-label caption>Have a drink.</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="notification_important" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Announcement 2</q-item-label>
                <q-item-label caption>Fill your gas tank.</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="notification_important" />
              </q-item-section>

              <q-item-section>
                <q-item-label>Announcement 3</q-item-label>
                <q-item-label caption>Watch a movie.</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      cases: []
    }
  },
  mounted () {
    this.getBarReport()
  },
  methods: {
    async getBarReport () {
      await this.$axios.get('/api/graphs/cases_per_adjuster').then(result => {
        this.cases = result.data
        console.log(this.cases)
      })
    }
  }
  // name: 'PageName',
}
</script>
