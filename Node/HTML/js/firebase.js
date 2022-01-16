/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDK7XTpdYCJskJP84C8SahAzbPZlh0XHfk",
    authDomain: "nodeapp-eea19.firebaseapp.com",
    projectId: "nodeapp-eea19",
    storageBucket: "nodeapp-eea19.appspot.com",
    messagingSenderId: "19741724639",
    appId: "1:19741724639:web:2001e8281215af11bdbe6a",
    measurementId: "G-RHF4RHV33Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    import {getDatabase, ref, get, set, child, update, remove}
    from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

    var db = getDatabase();
    //REFERENCE
    var userBox = document.getElementById('usrN');
    var emailBox = document.getElementById('email');
    var pswBox = document.getElementById('psw');

    var insBtn = document.getElementById('submit');
    var SeleBtn = document.getElementById('Select');
    var upBtn = document.getElementById('Update');
    var DelBtn = document.getElementById('Delete');

    //InsertData function
    function InsertData() {
        set(ref(db, "TheUser/"+userBox.value), {
            Username: userBox.value,
            Email: emailBox.value,
            password: pswBox.value
        })
        .then(() => {
            alert("data stored successfully");
        })
        .catch((error) => {
            alert("unsuccessfully")
        })
    }

    //Select Data
    function SelectData() {
        const dbref = ref(db);

        get(child(dbref,"TheUser/"+ userBox.value)).then((snapshot) => {
            if(snapshot.exists()) {
                userBox.value = snapshot.val().Username;
                emailBox.value = snapshot.val().Email;
                pswBox.value = snapshot.val().password;
            }
            else {
                alert("No data found!");
            }
        }).catch((error) => {
            alert("unsuccessful, error"+error);
        })
    }
    //Update Data
    function UpdateData() {
        update(ref(db, "TheUser/"+userBox.value),{
            Username: userBox.value,
            Email: emailBox.value,
            password: pswBox.value
        })
        .then(() => {
            alert("data updated successfully!");
        })
        .catch((error) => {
            alert("unsuccessfully, error"+error);
        })
    }

    //Delete Data
    function DeleteData() {
        remove(ref(db, "TheUser/"+userBox.value))
        .then(() => {
            alert("data removed successfully");
        })
        .catch((error) => {
            alert("unsuccessfully, error"+error);
        })
    }

    insBtn.addEventListener('click',InsertData);
    SeleBtn.addEventListener('click',SelectData);
    upBtn.addEventListener('click',UpdateData);
    DelBtn.addEventListener('click', DeleteData);

