// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjY5IkFmX2-62s_RUxmKgOjIpYp8HA2fw",
    authDomain: "testing123-d4963.firebaseapp.com",
    projectId: "testing123-d4963",
    storageBucket: "testing123-d4963.appspot.com",
    messagingSenderId: "703381431077",
    appId: "1:703381431077:web:29d39316d4e216153870cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to add a document
async function addDocument() {
    const name = document.getElementById('document-name').value;
    const completionDate = document.getElementById('completion-date').value;

    try {
        await db.collection('documents').add({
            name: name,
            completion_date: completionDate,
            upload_date: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Document added successfully');
        loadDocuments();
    } catch (error) {
        console.error('Error adding document: ', error);
        alert('Error adding document');
    }
}

// Function to load documents
async function loadDocuments() {
    const tableBody = document.getElementById('documents-table-body');
    tableBody.innerHTML = '';

    try {
        const snapshot = await db.collection('documents').get();
        snapshot.forEach(doc => {
            const documentData = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${documentData.name}</td>
                <td>${documentData.upload_date ? documentData.upload_date.toDate().toLocaleDateString() : ''}</td>
                <td><input type="checkbox" data-id="${doc.id}"></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading documents: ', error);
        alert('Error loading documents');
    }
}

// Function to delete a document
async function deleteDocument() {
    const selected = document.querySelector('input[type="checkbox"]:checked');
    if (selected) {
        const id = selected.getAttribute('data-id');
        try {
            await db.collection('documents').doc(id).delete();
            alert('Document deleted successfully');
            loadDocuments();
        } catch (error) {
            console.error('Error deleting document: ', error);
            alert('Error deleting document');
        }
    } else {
        alert('Please select a document to delete');
    }
}

// Load documents on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDocuments();
});
