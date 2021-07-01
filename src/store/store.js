import { firebaseAuth, firebaseDb } from 'boot/firebase'

const state = {
  allUser: []
}
const mutations = {
  SET_USER ({ user }) {
    state.allUser = {
      ...state.allUser,
      [user]: user.data()
    }
  }
}
const actions = {
  // eslint-disable-next-line no-empty-pattern
  createUser ({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(res => {
        /* CREATE RECORD ON DB */
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.doc('users/' + userId).set({
          fullName: payload.name,
          email: payload.email,
          userType: payload.userType
        })
      })
      .catch(err => {
        return err
      })
  },
  async getUsers ({ commit }) {
    await firebaseDb.collection('users').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          commit('SET_USER', { doc })
        })
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
/*
FIREBASE FUNCTION HELPER

ADD
db.collection("cities").doc("new-city-id").set(data);

// Add a new document with a generated id.
db.collection("cities").add({
    name: "Tokyo",
    country: "Japan"
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})

UPDATE
var docRef = db.collection('objects').doc('some-id');

// Update the timestamp field with the value from the server
var updateTimestamp = docRef.update({
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
});

GET

db.collection("cities").doc("SF")
    .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data());
    });
*/
