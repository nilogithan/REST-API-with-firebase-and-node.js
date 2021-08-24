const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();

const app = express();


//Get all users 
app.get('/getAllUser', async (req,res)=> {
  const snapshot = await admin.firestore().collection('user').get();
  let users = [];
  // for (let index = 0; index < snapshot.length; index++) {
  //     let id = snapshot[index].id;
  //     let data = snapshot[index].data();
  //     users.push({id, ...data})
  // }
  snapshot.forEach(doc => {
      let id = doc.id;
      let data = doc.data();

      users.push({id,...data});
  });
  res.status(200).send(JSON.stringify(users));
});

//Add new user
app.post('/addUser', async (req,res)=> {
  const user = req.body;

  admin.firestore().collection("user").add(user);
  res.status(201).send();
 
});

//get single user
app.get('/getSingleUser/:id', async (req, res) => {
  const snapshot = await admin.firestore().collection('user').doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();

  res.status(200).send(JSON.stringify({id: userId, ...userData}));

})


//update a user
app.put('/editUser/:id', async (req,res) => {
  const body = req.body;
  await admin.firestore().collection('user').doc(req.params.id).update({
    ...body
   });
   res.status(200).send();
});

//delete the user
app.delete('/delete/:id', async (req, res) => {
  await admin.firestore().collection('user').doc(req.params.id).delete;
  res.status(200).send();
});

exports.user = functions.https.onRequest(app);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
