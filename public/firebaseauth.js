// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_b1jvtnCgXZN3MUaGiWmWBR38y7pXwwU",
  authDomain: "login-form-63ded.firebaseapp.com",
  projectId: "login-form-63ded",
  storageBucket: "login-form-63ded.appspot.com",
  messagingSenderId: "541170987623",
  appId: "1:541170987623:web:6dcfd9cdd66ff8b5011ac2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Show message function
function showMessage(message, divId){
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function(){
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Display user information in the sidebar
function displayUserInfo(user) {
  const nameElement = document.querySelector('.name');
  const professionElement = document.querySelector('.profession');

  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        nameElement.textContent = `${userData.firstName} ${userData.lastName}`;
        professionElement.textContent = userData.email;
      } else {
        nameElement.textContent = "Profile";
        professionElement.textContent = "GMAIL/ID";
      }
    }).catch((error) => {
      console.error("Error fetching user data: ", error);
    });
  } else {
    nameElement.textContent = "Profile";
    professionElement.textContent = "GMAIL/ID";
  }
}

// Sign-Up with Email and Password
document.getElementById('submitSignUp').addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          displayUserInfo(user);
          window.location.href = '/homepage/homepage.html';
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists!', 'signUpMessage');
      } else {
        showMessage('Unable to create user', 'signUpMessage');
      }
    });
});

// Sign-In with Email and Password
document.getElementById('submitSignIn').addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      displayUserInfo(user);
      window.location.href = '/homepage/homepage.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not exist', 'signInMessage');
      }
    });
});

// Google Sign-In
document.querySelectorAll('#signInGoogleButton').forEach(button => {
  button.addEventListener('click', () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, "users", user.uid);

        // Check if the user already exists in Firestore
        getDoc(userRef).then((docSnap) => {
          if (!docSnap.exists()) {
            // If not, create a new user document
            const userData = {
              email: user.email,
              firstName: user.displayName.split(' ')[0],
              lastName: user.displayName.split(' ')[1] || ''
            };
            setDoc(userRef, userData)
              .then(() => {
                displayUserInfo(user);
                window.location.href = '/homepage/homepage.html';
              })
              .catch((error) => {
                console.error("Error writing document", error);
              });
          } else {
            displayUserInfo(user);
            window.location.href = '/homepage/homepage.html';
          }
        }).catch((error) => {
          console.error("Error fetching user data: ", error);
        });
      }).catch((error) => {
        console.error('Error during sign-in: ', error.code, error.message, error.email, GoogleAuthProvider.credentialFromError(error));
      });
  });
});

// Check the user's sign-in status
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
    displayUserInfo(user);
  } else {
    console.log('No user is signed in.');
    displayUserInfo(null);
  }
});
