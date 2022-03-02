import React, {useEffect} from 'react';
import {FirebaseApi} from './firebase.api';

export interface FirebaseWrapperProps{
  firebaseConfig:Object;
  collectionId:string;
}

export const withFirebase = (WrappedComponent:any) => (props:FirebaseWrapperProps) => {
  useEffect(()=>{
    FirebaseApi.init(props.firebaseConfig);
    FirebaseApi.registerCollection(props.collectionId);
  }, []);
  return <WrappedComponent {...props}/>;
};
