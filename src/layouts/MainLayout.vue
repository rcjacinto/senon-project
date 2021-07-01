<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="text-subtitle1">
          SENON INSURANCE ADJUSTERS & APPRAISERS
        </q-toolbar-title>

        <div><q-icon name="notifications" style="font-size: 1.4rem;" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
    <div class="text-center text-primary q-pt-lg">
    <q-icon name="account_circle" size="100px"/>
    <p class="text-subtitle2">{{ this.user }}</p>
    <p class="text-h6">{{ this.userLevel }}</p>
    <p class="text-subtitle1 text-white bg-grey-5 q-pa-lg text-center">
      Senon insurance Adjuster & Appraisers</p>
    </div>
<q-list class="text-subtitle1">
      <q-item clickable v-ripple v-bind:to="'/cms/'">
        <q-item-section avatar>
          <q-icon color="secondary" name="dashboard" />
        </q-item-section>
        <q-item-section>Dashboard</q-item-section>
      </q-item>

      <q-item clickable v-ripple v-bind:to="'/cms/assignment'">
        <q-item-section avatar>
          <q-icon color="secondary" name="assignment" />
        </q-item-section>
        <q-item-section>Assignment</q-item-section>
      </q-item>

      <q-item clickable v-ripple v-bind:to="'/cms/borderaux'">
        <q-item-section avatar>
          <q-icon color="secondary" name="print" />
        </q-item-section>
        <q-item-section>Borderaux</q-item-section>
      </q-item>

      <q-expansion-item class="bg-grey-4">
        <template v-slot:header>
          <q-item-section avatar>
          <q-icon color="secondary" name="settings" />
          </q-item-section>

          <q-item-section>
            Setting
          </q-item-section>
        </template>
        <q-list class="q-ml-lg">
          <q-item clickable v-ripple v-bind:to="'/cms/settings/broker'">
            <q-item-section avatar>
              <q-icon color="blue-8" name="person" />
            </q-item-section>
            <q-item-section class="text-grey-8">Brokers</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-bind:to="'/cms/settings/insurer'">
            <q-item-section avatar>
              <q-icon color="blue-8" name="perm_identity" />
            </q-item-section>
            <q-item-section class="text-grey-8">Insurer</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-bind:to="'/cms/settings/policy'">
            <q-item-section avatar>
              <q-icon color="blue-8" name="list" />
            </q-item-section>
            <q-item-section class="text-grey-8">Types of Policy</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-bind:to="'/cms/settings/event_status'">
            <q-item-section avatar>
              <q-icon color="blue-8" name="all_inbox" />
            </q-item-section>
            <q-item-section class="text-grey-8">Event Status</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-bind:to="'/cms/settings/users'">
            <q-item-section avatar>
              <q-icon color="blue-8" name="group_work" />
            </q-item-section>
            <q-item-section class="text-grey-8">Users</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
     <!--  -->
      <q-separator></q-separator>
      <q-item clickable v-ripple @click="logout">
        <q-item-section avatar>
          <q-icon color="secondary" name="power_settings_new" />
        </q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {},

  data () {
    return {
			leftDrawerOpen: false,
			loginInfo: JSON.parse(localStorage.loginInfo)
    }
	},
	
	computed: {
		user () {
			return this.loginInfo.user
		},

		userLevel () {
			return this.loginInfo.userLevel
		}
	},

  methods: {
    logout () {
      this.$axios.post('/api/logout', {})
        .then((response) => {
          localStorage.removeItem('loginInfo')
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          console.warn(error)
        })
    }
  }
}
</script>
