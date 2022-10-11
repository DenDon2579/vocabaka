import React from 'react';
import classes from './Profile.module.scss';

const Profile: React.FC = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.profile}></div>
        </div>
    );
};
export default Profile;
