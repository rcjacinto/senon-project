import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
  db: firebaseDb
}
const mutations = {

}
const actions = {
  // eslint-disable-next-line no-empty-pattern
  createUser ({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        console.log(res)
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).set({
          fullName: payload.name,
          email: payload.email,
          userType: payload.userType
        })
      })
      .catch(err => {
        return err
      })
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
