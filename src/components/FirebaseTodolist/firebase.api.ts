import {initializeApp} from 'firebase/app';
import {addDoc, collection, deleteDoc, doc, getFirestore, setDoc, updateDoc} from 'firebase/firestore';

import {TaskModel} from './Task.model';
import {CollectionReference, DocumentReference} from '@firebase/firestore';

export class FirebaseApi{
  static firestore:any;
  static collection:CollectionReference;

  static init(firebaseOptions:Object){
    initializeApp(firebaseOptions);
    FirebaseApi.firestore = getFirestore();
  }

  static getFirestore(){
    return FirebaseApi.firestore;
  }

  static registerCollection(collectionId:string){
    FirebaseApi.collection = collection(FirebaseApi.firestore, collectionId);
  }

  static async addTask(task:Partial<TaskModel>){
    const id = `${Date.now()}`;
    await setDoc(FirebaseApi.getDocRef(id), {id:`${Date.now()}`, ...task});
  }

  static async deleteTask(taskId:string){
    await deleteDoc(FirebaseApi.getDocRef(taskId));
  }

  static async updateTaskDone(taskId:string, done:boolean){
    await updateDoc( FirebaseApi.getDocRef(taskId), {done});
  }

  static getDocRef(taskId:string):DocumentReference{
     return doc(FirebaseApi.firestore, FirebaseApi.collection.path, taskId);
  }
}
