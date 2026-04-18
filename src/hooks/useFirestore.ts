import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { ApplicationFormData } from '../types';

export const useFirestore = () => {
  const saveApplication = async (
    data: ApplicationFormData
  ): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'applications'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving application:', error);
      throw error;
    }
  };

  const updateApplication = async (
    docId: string,
    updates: Partial<ApplicationFormData>
  ) => {
    try {
      await updateDoc(doc(db, 'applications', docId), {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  const getApplicationsByEmail = async (email: string) => {
    try {
      const q = query(
        collection(db, 'applications'),
        where('email', '==', email)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  };

  const getAllApplications = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error fetching all applications:', error);
      throw error;
    }
  };

  return {
    saveApplication,
    updateApplication,
    getApplicationsByEmail,
    getAllApplications,
  };
};
