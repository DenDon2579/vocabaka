import React from 'react';
import useAuth from '../../../../hooks/auth-hooks';
import { useAppDispatch } from '../../../../hooks/redux-hooks';
import { logIn } from '../../../../store/userSlice';
import classes from './Login.module.scss';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const signIn = () => {
        auth().then((userData) => dispatch(logIn(userData)));
    };
    return (
        <div className={classes.wrapper}>
            <h2>Войдите, чтобы продолжить</h2>
            <div className={classes.login}>
                <button className={classes.button} onClick={signIn}>
                    Войти
                </button>
            </div>
        </div>
    );
};
export default Login;
