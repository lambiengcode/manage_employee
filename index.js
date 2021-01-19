require('dotenv').config();
const firebase = require("firebase");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "manage-employee-4631c.firebaseapp.com",
  projectId: "manage-employee-4631c",
  storageBucket: "manage-employee-4631c.appspot.com",
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: "G-E1FSSYER51",
};

firebase.initializeApp(firebaseConfig);

app.post("/auth/create-user", (req, res) => {
  (async () => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
          console.log(user.user.uid);
          return res.status(200).send(user.user.uid);
        })
        .catch((error) => {
          return res.status(400).send(error);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/auth/login", (req, res) => {
    (async () => {
        try {
            firebase
              .auth()
              .signInWithEmailAndPassword(req.body.email, req.body.password)
              .then((user) => {
                return res.status(200).send(user.user.uid);
              })
              .catch((error) => {
                return res.status(400).send(error);
              });
          } catch (error) {
            console.log(error);
            return res.status(500).send(error);
          }
    })();
});

app.listen(8000, () => {
  console.log("App run on port 8000");
});
