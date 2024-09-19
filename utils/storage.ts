import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';

export const storeSession = async (session: { startTime: Date; duration: number }) => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      await db.collection('users').doc(user.uid).collection('lactationSessions').add(session);
    }
  } catch (error) {
    console.error('Error storing session data:', error);
  }
};

export const getSessions = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    const sessions = await db.collection('users').doc(user.uid).collection('lactationSessions').get();
    return sessions.docs.map(doc => doc.data());
  }
  return [];
};