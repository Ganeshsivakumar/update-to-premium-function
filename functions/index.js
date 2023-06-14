const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app = express();
app.use(cors({origin: true}));

const db = admin.firestore();

exports.updatePremium = functions.firestore.document('/PremiumUser/{documentId}').onCreate(async (snapshot,context)=>{
    try{
    const uid = snapshot.data().uid;
    const reqDoc = db.collection("Users").doc(uid);
    const docSnapshot = await reqDoc.get();
    if (docSnapshot.exists) {
        await reqDoc.update({
          isPremium: true,
        });
      }
    }
    catch(e){
    console.log(e);
    }
    return Promise.resolve();
})