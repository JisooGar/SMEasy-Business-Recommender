// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { 
  getFirestore, 
  setDoc, 
  doc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Show modal function
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.innerText = message;
  modal.style.display = 'block'; // Make sure modal is displayed
}

// Close modal function
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none'; // Hide the modal
}

// Attach the close function to the 'X' button click
document.querySelector('.close').addEventListener('click', closeModal);

// Function to periodically check if the email is verified
function checkVerification(user) {
  const interval = setInterval(() => {
    user.reload().then(() => {
      if (user.emailVerified) {
        clearInterval(interval); // Stop checking once verified
        window.location.href = '/homepage/homepage.html'; // Redirect to homepage
      }
    });
  }, 2000); // Check every 2 seconds
}

// Sign-Up with Email and Password
document.getElementById('submitSignUp').addEventListener('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;
  const termsCheckbox = document.getElementById('terms');

  // Validate Terms and Conditions checkbox
  if (!termsCheckbox.checked) {
    showModal('You must agree to the Terms and Conditions.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };

      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          sendEmailVerification(user)
            .then(() => {
              showModal('Account created successfully. A verification email has been sent. Please verify to proceed. Kindly refresh your page and Sign in');
              auth.signOut(); // Log out the user until they verify
            })
            .catch((error) => {
              console.error("Error sending email verification:", error);
            });
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showModal('Email Address Already Exists!');
      } else {
        showModal('Unable to create user');
      }
    });
});

// Sign-In with Email and Password
document.getElementById('submitSignIn').addEventListener('click', (event) => {
  event.preventDefault();

  // Correct IDs: emailSignIn and passwordSignIn
  const email = document.getElementById('emailSignIn').value;
  const password = document.getElementById('passwordSignIn').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        // Redirect to homepage if email is verified
        window.location.href = '/homepage/homepage.html';
      } else {
        sendEmailVerification(user)
          .then(() => {
            showModal('Please verify your email to proceed. A verification link has been sent to your email.');
            checkVerification(user); // Start checking for verification
            auth.signOut(); // Log out the user until they verify
          })
          .catch((error) => {
            console.error("Error sending verification email:", error);
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found') {
        showModal('No account found with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        showModal('Incorrect password.');
      } else {
        showModal('An error occurred during sign-in.');
        console.error("Sign-in error:", error.message);  // Log the error message to help with debugging
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

        getDoc(userRef).then((docSnap) => {
          if (!docSnap.exists()) {
            const userData = {
              email: user.email,
              firstName: user.displayName.split(' ')[0],
              lastName: user.displayName.split(' ')[1] || ''
            };
            setDoc(userRef, userData)
              .then(() => {
                window.location.href = '/homepage/homepage.html';
              })
              .catch((error) => {
                console.error("Error writing document", error);
              });
          } else {
            window.location.href = '/homepage/homepage.html';
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });
      })
      .catch((error) => {
        console.error('Error during Google sign-in:', error.code, error.message);
        showModal('An error occurred during Google sign-in. Please try again.');
      });
  });
});

// For Sign Up
const passwordFieldSignUp = document.getElementById('rPassword');
const showPasswordIconSignUp = document.getElementById('showPasswordIconSignUp');

showPasswordIconSignUp.addEventListener('click', function() {
    if (passwordFieldSignUp.type === 'password') {
        passwordFieldSignUp.type = 'text';
        showPasswordIconSignUp.classList.remove('fa-eye');
        showPasswordIconSignUp.classList.add('fa-eye-slash');
    } else {
        passwordFieldSignUp.type = 'password';
        showPasswordIconSignUp.classList.remove('fa-eye-slash');
        showPasswordIconSignUp.classList.add('fa-eye');
    }
});

// For Sign In
const passwordFieldSignIn = document.getElementById('passwordSignIn');
const showPasswordIconSignIn = document.getElementById('showPasswordIconSignIn');

showPasswordIconSignIn.addEventListener('click', function() {
    if (passwordFieldSignIn.type === 'password') {
        passwordFieldSignIn.type = 'text';
        showPasswordIconSignIn.classList.remove('fa-eye');
        showPasswordIconSignIn.classList.add('fa-eye-slash');
    } else {
        passwordFieldSignIn.type = 'password';
        showPasswordIconSignIn.classList.remove('fa-eye-slash');
        showPasswordIconSignIn.classList.add('fa-eye');
    }
});
