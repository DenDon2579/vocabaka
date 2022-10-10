import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hooks';
import classes from './Content.module.scss';
import Dictionary from './dictionary/Dictionary';
import Login from './login/Login';

const Content: React.FC = () => {
    const isAuth = useAppSelector((state) => state.userSlice.authData.isAuth);
    return (
        <div className={classes.content}>
            <Routes>
                <Route
                    index
                    element={
                        isAuth ? (
                            <Navigate to='dictionary' />
                        ) : (
                            <Navigate to='login' />
                        )
                    }
                />
                <Route
                    path='login'
                    element={isAuth ? <Navigate to='/' /> : <Login />}
                />
                <Route
                    path='dictionary'
                    element={isAuth ? <Dictionary /> : <Navigate to='/login' />}
                />
            </Routes>
        </div>
    );
};
export default Content;
