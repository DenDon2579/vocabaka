import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { IUser } from '../types';

const useAuth = () => {
    return () => login();
};

const login = async (): Promise<IUser> => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const session = await signInWithPopup(auth, provider);
    const user = session.user;
    return {
        userID: user.uid,
        displayName: user.displayName ? user.displayName : '',
        photoURL: user.photoURL ? user.photoURL : '',
    };
};

export default useAuth;
