import React, { useState, useEffect } from "react";

// yarn add firebase@9.6.4 react-firebase-hooks lodash.debounce lodash.mapvalues

// const { data, add, update, remove, loading, error } = useCollection("pages")

// TODO: analytics

// V9
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence,
  serverTimestamp,
  collection,
  query,
  orderBy,
  where,
  limit,
  addDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collectionGroup,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getPerformance } from "firebase/performance";

import debounce from "lodash.debounce";
import mapValues from "lodash.mapvalues";
import merge from "lodash.merge";

// apparently I can't destructure *and* rename when using the ES6 import
const {
  useCollection: useCollectionHook,
  useDocumentData,
} = require("react-firebase-hooks/firestore");

const FirebaseContext = React.createContext();
const FirestoreContext = React.createContext();
const FirebaseUserContext = React.createContext();

async function storeUser({ user, db }) {
  // TODO: save a write if the user hasn't changed that much?

  if (!user) return {};

  const { uid, displayName, photoURL, email, isAnonymous } = user;
  const { creationTime, lastSignInTime } = user.metadata;

  const userRef = doc(db, "users", user.uid);

  const userData = {
    uid,
    displayName,
    photoURL,
    email,
    isAnonymous,
  };

  // if(!userData.photoURL){
  //   userData.photoURL = `https://www.gravatar.com/avatar/${md5(email.toLowerCase().trim())}`
  // }

  if (creationTime) userData.creationTime = new Date(creationTime);
  if (lastSignInTime) userData.lastSignInTime = new Date(lastSignInTime);

  const res = await setDoc(userRef, userData, { merge: true });
  return { userRef, userData };
}

export function FirebaseProvider({ children, config, enablePersistence }) {
  const [user, setUser] = useState(null);

  const firebaseApp = initializeApp(config);
  const db = getFirestore(firebaseApp);
  // const auth = getAuth(firebaseApp);
  const auth = getAuth();

  useEffect(() => {
    if (enablePersistence && false) {
      enableIndexedDbPersistence(db, { synchronizeTabs: true }).catch((err) => {
        if (err.code == "failed-precondition") {
          alert(
            "Oh yikes—looks like multiple tabs are open. Offline support may get weird."
          );
        } else if (err.code == "unimplemented") {
          // The current browser does not support all of the
          // features required to enable persistence
          console.error(
            "Offline Firestore persistence isn't supported in this browser."
          );
        }
      });
    }
  }, [enablePersistence, config]);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      const { userData } = await storeUser({ user, db });
      setUser(userData || null);
    });
  }, [db]);

  return (
    <FirebaseContext.Provider value={firebaseApp}>
      <FirebaseUserContext.Provider value={user}>
        <FirestoreContext.Provider value={db}>
          {children}
        </FirestoreContext.Provider>
      </FirebaseUserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export function useFirestore() {
  const context = React.useContext(FirestoreContext);
  if (context === undefined) {
    throw new Error("useFirestore must be used within a FirebaseProvider");
  }
  return context;
}

export function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

export function useStorage(bucketUrl = null) {
  const firebaseApp = useFirebase();
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const storage = getStorage(firebaseApp, bucketUrl);

  // upload({data: blob, path: `/files/foo.png`, metadata: {}, onProgress: ((total, transferred, percent)=>{console.log({percent})})})
  function upload({ data, path, metadata = {}, onProgress }) {
    const objectRef = ref(storage, path);

    const uploadTask = uploadBytesResumable(objectRef, data, metadata);

    // const pause = () => uploadTask.pause()
    // const resume = () => uploadTask.resume()
    // const cancel = () => uploadTask.cancel()

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (typeof onProgress === "function") {
            const total = snapshot.totalBytes;
            const transferred = snapshot.bytesTransferred;
            const percent = (transferred / total) * 100;
            onProgress({ total, transferred, percent });
          }
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED:
          //     console.log("Upload is paused");
          //     break;
          //   case firebase.storage.TaskState.RUNNING:
          //     console.log("Upload is running");
          //     break;
          // }
        },
        function (error) {
          reject(error);
        },
        function () {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve({
              url,
              ref: uploadTask.snapshot.ref,
              bucket: bucketUrl,
              path,
            });
            //   console.log("File available at", downloadURL);
          });
        }
      );
    });
  }

  return { upload, progress, error };
}

// const { user, signOut, signinWithGoogle } = useAuth();
export function useAuth() {
  const auth = getAuth();
  const context = React.useContext(FirebaseUserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }

  // TODO: link anonymous user with logged in user
  // https://firebase.google.com/docs/auth/web/anonymous-auth#convert-an-anonymous-account-to-a-permanent-account
  // firebase.auth().signInAnonymously()
  // TODO: error and loading?

  // signin buttons with svgs: https://flowbite.com/docs/components/buttons/
  return {
    user: context,
    signOut: () => signOut(auth),
    signinWithGoogle: ({ scopes }) => {
      const provider = new GoogleAuthProvider();

      // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      // provider.addScope("https://www.googleapis.com/auth/youtube.upload");
      // provider.setCustomParameters({
      //   'login_hint': 'user@example.com'
      // });x
      if (scopes) scopes.forEach((scope) => provider.addScope(scope));

      return signInWithPopup(auth, provider);
    },
    checkEmailLink: () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("firebase:email");
        if (!email)
          email = window.prompt("Please provide your email for confirmation");
        if (email)
          signInWithEmailLink(auth, email, window.location.href)
            .then((res) => {
              window.localStorage.removeItem("firebase:email");
            })
            .catch((err) => {
              alert(err.message);
            });
      }
    },
    resetPassword: ({ email, url }) => {
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#sendpasswordresetemail
      sendPasswordResetEmail(auth, email, { url, handleCodeInApp: true });
    },
    confirmPasswordReset: ({ code, password }) => {
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#confirmpasswordreset
      confirmPasswordReset({ code, newPassword: password });
    },
    signinWithEmail: ({ email, password }) => {
      // https://firebase.google.com/docs/auth/web/email-link-auth?authuser=0#send_an_authentication_link_to_the_users_email_address
      const actionCodeSettings = {
        url: document.location.href.replace(document.location.search, ""),
        handleCodeInApp: true,
      };
      if (password) {
        alert(`${email} ${password}`);
      } else {
        window.localStorage.setItem("firebase:email", email);
        sendSignInLinkToEmail(auth, email, actionCodeSettings);
      }
    },
  };
}

function mapDates(doc) {
  return Object.fromEntries(
    Object.entries(doc).map(([k, v]) => {
      const value = typeof v?.toDate === "function" ? v.toDate() : v;
      return [k, value];
    })
  );
}

function updateDocument(ref, data) {
  // nested object updates use dot notation:
  // https://firebase.google.com/docs/firestore/manage-data/add-data#update_fields_in_nested_objects
  // but you **don't need to use dot notation with merge:true**

  // undefined => null
  const updatedFields = mapValues(data, (v) => v || null);
  const { id } = data;
  delete updatedFields.id;
  delete updatedFields.path;

  // console.log({ updatedFields, data });

  return setDoc(
    ref,
    {
      ...updatedFields,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

const debouncedUpdate = debounce(
  (ref, data) => updateDocument(ref, data),
  1000
);

// const { data, add, update, remove, loading, error } = useCollection("pages")
export function useCollection(collectionPath, options = {}) {
  // const db = useFirestore();
  const db = getFirestore();

  // window.db = db;
  // window.collection = collection;
  // window.orderBy = orderBy;
  // window.where = where;

  // const firebaseApp = useFirebase();
  const { user } = useAuth();

  let path = collectionPath;
  if (user && path[0] !== "/" && !options.group)
    path = `/users/${user.uid}/${path}`;

  let collectionRef;
  if (options.group) collectionRef = collectionGroup(db, path);
  else collectionRef = collection(db, path);

  const queryArgs = [collectionRef];

  if (options.orderBy)
    queryArgs.push(
      orderBy(options.orderBy, options.desc || options.dsc ? "desc" : "asc")
    );

  if (options.where) {
    // where can be an array of arrays or just an array
    // let's force it to be an array of arrays
    let whereClauses = options.where;
    if (!Array.isArray(options.where[0])) whereClauses = [options.where];

    whereClauses.forEach(([a, b, c]) => {
      queryArgs.push(where(a, b, c));
    });
  }

  if (options.limit) queryArgs.push(limit(options.limit));

  let data = null,
    loading = null,
    error = null,
    snap = null;

  // only fetch the data if the limit isn't zero
  // this lets me just get the add function by passing limit=0
  // be careful not to ever change the limit to zero and back again D:
  if (options.limit !== 0) {
    [snap, loading, error] = useCollectionHook(query(...queryArgs));
    if (snap?.docs)
      data = snap.docs.map((doc) => {
        return { ...mapDates(doc.data()), path: doc.ref.path, id: doc.id };
      });
    if (error) console.error(error);
  }

  function add(docData) {
    return addDoc(collectionRef, {
      ...docData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  // TODO: merge properties here? It might already be happening? I might not need to do it with useDoc?
  const update = (docData) =>
    updateDocument(doc(collectionRef, docData.id), docData);
  const remove = (docData) => deleteDoc(doc(collectionRef, docData.id));

  // console.log({ path });
  // return [firebaseData, addDoc, loading, error];
  return { data, add, update, remove, loading, error };
}

export function useDoc(docPath) {
  let path = docPath; // || "/null/null";
  const db = useFirestore();
  const { user } = useAuth();
  if (user && path && path[0] !== "/") path = `/users/${user.uid}/${path}`;

  // use an empty string to get the current user's doc
  if (user && path === "") path = `/users/${user.uid}`;

  if (!path) path = "/";

  const docRef = doc(db, path);
  const [data, setData] = useState(null);

  // idField might not work anymore?
  const [firebaseData, loading, error] = useDocumentData(docRef, {
    idField: "id",
  });

  // update local data if remote data changes
  useEffect(() => {
    setData(
      firebaseData ? { ...mapDates(firebaseData), path, id: docRef.id } : null
    );
  }, [firebaseData, path]);

  const remove = () => deleteDoc(docRef);
  const update = (docData) => updateDocument(docRef, docData);

  function setDataWithFirebase(newData) {
    // I don't know why I have to spread merge, but setData doesn't update if I don't
    // this might not work with setting data to undefined?
    setData({ ...merge(data, newData) });
    debouncedUpdate(docRef, newData);
  }

  return {
    data,
    update,
    upsert: update,
    debouncedUpdate: setDataWithFirebase,
    // if you're fucking around with debounceUpdating nested data,
    // make sure you flush between each written key
    flushDebouncedUpdates: debouncedUpdate.flush,
    remove,
    loading,
    error,
  };
}

// export function useCallableFunction(title, { zone = "us-central1" }) {
//   const firebaseApp = useFirebase();
//   return httpsCallable(getFunctions(firebaseApp, zone), title);
// }

// TODO: update for v9
// export function useIdToken() {
//   const firebase = useFirebase();
//   const { user } = useAuth();
//   const [token, setToken] = useState(null);
//   useEffect(() => {
//     if (!firebase.auth().currentUser) return;
//     async function fetchToken() {
//       const _token = await firebase.auth().currentUser.getIdToken(true);
//       setToken(_token);
//     }
//     fetchToken();
//   }, [user, firebase]);
//   return token;
// }
