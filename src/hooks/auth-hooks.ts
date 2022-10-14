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
    localStorage.setItem('uid', user.uid);
    localStorage.setItem('name', user.displayName ? user.displayName : '');
    localStorage.setItem('avatar', user.photoURL ? user.photoURL : '');
    return {
        userID: user.uid,
        displayName: user.displayName ? user.displayName : '',
        photoURL: user.photoURL ? user.photoURL : '',
    };
};

export default useAuth;
