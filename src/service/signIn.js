import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';


export const googleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
    } catch (error) {
        console.error('Error during sign-in:', error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    }
};

export const signout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
    }
};
