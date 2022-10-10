import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/auth-hooks';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { logIn, logOut } from '../../../store/userSlice';
import classes from './Header.module.scss';

const Header: React.FC = () => {
    const isAuth = useAppSelector((state) => state.userSlice.authData.isAuth);
    const userData = useAppSelector((state) => state.userSlice.userData);
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const signIn = () => {
        auth().then((userData) => dispatch(logIn(userData)));
    };

    return (
        <div className={classes.header}>
            <div className={classes.main}>
                <div className={classes.logo}>
                    <Link to='/dictionary' className={classes.title}>
                        VOCABAKA
                    </Link>
                </div>
                <div className={classes.test}>
                    {isAuth && (
                        <Link className={classes.link} to='test'>
                            пройти тест
                        </Link>
                    )}
                </div>
                {isAuth ? (
                    <div className={classes.microProfile}>
                        <img src={userData?.photoURL} alt='avatar' />
                        <span>
                            {userData?.displayName}{' '}
                            <b onClick={() => dispatch(logOut())}>╳</b>
                        </span>
                    </div>
                ) : (
                    <div className={classes.login}>
                        <button className={classes.button} onClick={signIn}>
                            Войти
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;
