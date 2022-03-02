import React from 'react';
import './App.css';
import FirebaseTodolist from './components/FirebaseTodolist/FirebaseTodolist';

const firebaseConfig = {
  apiKey: "AIzaSyDl3LFvjCKZqBytsqCyr0cBZ4VnAEVuOn8",
  authDomain: "todo-list-22c2f.firebaseapp.com",
  projectId: "todo-list-22c2f",
  storageBucket: "todo-list-22c2f.appspot.com",
  messagingSenderId: "476093823497",
  appId: "1:476093823497:web:72627d9a8d0e078c9e56d8"
};

const collectionId = 'todo-list';

function App() {
  return (
    <FirebaseTodolist firebaseConfig={firebaseConfig} collectionId={collectionId}/>
  );
}

export default App;
