<template>
  <q-page padding class="bg-grey-4">
    <div class="q-pa-lg q-ma-lg"></div>
    <div class="row justify-center q-mt-xl">
      <div class="col-4 bg-grey-2 q-pa-xl rounded-borders">
        <p class="text-h4 text-center text-blue-8">Senon Insurance Adjusters and Appraisers</p>
      <q-form>
         <div class="col q-ma-sm q-mt-xl">
            <q-input v-model="form.email" label="Email" type="email">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
          </div>
           <div class="col q-ma-sm">
            <q-input v-model="form.password" label="Password" type="password">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </div>
          <div class="col q-ma-sm q-mt-xl">
            <q-btn label="Login" rounded color="primary" class="full-width"/>
          </div>
          <div class="col q-ma-sm q-mt-lg">
            <q-btn label="Forgot Password ?" flat color="red-5" class="full-width"/>
          </div>
      </q-form>
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
        email: null,
        password: null
      }
    }
  }
}
</script>
