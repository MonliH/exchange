import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";
admin.initializeApp();

const env = functions.config();

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex("exchanges_search");

exports.indexExchanges = functions.firestore
  .document("exchanges/{exchangeId}")
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    return index
      .saveObject({
        objectID: objectId,
        ...data,
      })
      .then((res) => {
        console.log("res GOOD", res);
      })
      .catch((err) => {
        console.log("res ERR", err);
      });
  });

exports.unindexExchanges = functions.firestore
  .document("exchanges/{exchangeId}")
  .onDelete((snap, context) => {
    const objectId = snap.id;
    return index.deleteObject(objectId);
  });
