import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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

// Wait for DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Profile Dropdown Functionality
  const profileDropdownButton = document.getElementById("profileDropdownButton");
  const profileDropdown = document.getElementById("profileDropdown");

  if (profileDropdownButton && profileDropdown) {
    profileDropdownButton.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("visible");
    });

    document.addEventListener("click", function (e) {
      if (!profileDropdown.contains(e.target) && !profileDropdownButton.contains(e.target)) {
        profileDropdown.classList.remove("visible");
      }
    });
  }

  // Fetch and Update Profile Details
  const userNameElement = document.getElementById("userName");
  const userEmailElement = document.getElementById("userEmail");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      const provider = user.providerData[0].providerId; // Determine login method

      try {
        if (provider === "google.com") {
          // Google Sign-In
          userNameElement.textContent = user.displayName || "Google User";
          userEmailElement.textContent = user.email;
        } else {
          // Email/Password Sign-In
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            userNameElement.textContent = `${userData.firstName} ${userData.lastName}`;
            userEmailElement.textContent = userData.email;
          } else {
            console.error("User document not found in Firestore.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No user is logged in.");
      window.location.href = "/index.html"; // Redirect to login if not logged in
    }
  });

  // Logout Functionality
  const signOutButton = document.getElementById("signOutButton");

  if (signOutButton) {
    signOutButton.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        alert("Signed out successfully.");
        window.location.href = "/index.html"; // Redirect to login page
      } catch (error) {
        console.error("Error during sign-out:", error);
      }
    });
  }
});
