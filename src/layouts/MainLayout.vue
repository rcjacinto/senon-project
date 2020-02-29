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

        <div><q-icon name="settings" style="font-size: 1.4rem;" /></div>
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
    <p class="text-subtitle2">John Smith Morgan</p>
    <p class="text-h6">Administrator</p>
    <p class="text-subtitle1 text-white bg-grey-5 q-pa-lg text-center">
      Senon insurance Adjuster & Appraisers</p>
    </div>
<q-list class="text-subtitle1">
      <q-item clickable v-ripple v-bind:to="'/'">
        <q-item-section avatar>
          <q-icon color="secondary" name="dashboard" />
        </q-item-section>
        <q-item-section>Dashboard</q-item-section>
      </q-item>

      <q-item clickable v-ripple v-bind:to="'/assignment'">
        <q-item-section avatar>
          <q-icon color="secondary" name="assignment" />
        </q-item-section>
        <q-item-section>Assignment</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="secondary" name="print" />
        </q-item-section>
        <q-item-section>Reports</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="secondary" name="settings" />
        </q-item-section>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-separator></q-separator>
      <q-item clickable v-ripple>
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
      leftDrawerOpen: false
    }
  }
}
</script>
