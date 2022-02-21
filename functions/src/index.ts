import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

export const onNewUserCreateProfile = functions.auth
  .user()
  .onCreate(async (user) => {
    try {
      const uid = user.uid;

      // Create profile
      const doc = admin.firestore().doc(`/users/${uid}`);
      await doc.set({
        categories: []
      });

      return functions.logger.info("User profile succesfully created.")
    } catch (error) {
      functions.logger.error("User profile error", error, { structuredData: true });
    }
  })

export const userDeleted = functions.auth
  .user()
  .onDelete(async (user, context) => {
    try {
      const { uid } = user;
      const {} = context;
      
      const doc = admin.firestore().doc(`/users/${uid}`);
      await doc.delete();

      // TODO Query category and delete any categories created

      // TODO: Query all notes created and delete notes
      
      return functions.logger.info("User profile succesfully deleted.")
    } catch (error) {
      functions.logger.error("User profile deletion error", error, { structuredData: true });
    }
  })
