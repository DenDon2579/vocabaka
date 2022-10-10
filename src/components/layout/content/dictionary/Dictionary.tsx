import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { showPopup } from '../../../../store/visualSlice';
import AddWordPopup from './addWordPopup/AddWordPopup';
import classes from './Dictionary.module.scss';
import TableBody from './tableBody/TableBody';

const Dictionary: React.FC = () => {
    const isPopupVisible = useAppSelector(
        (state) => state.visualSlice.isPopupVisible
    );
    const dispatch = useAppDispatch();
    return (
        <div className={classes.wrapper}>
            <div className={classes.top}>
                <div className={classes.left}>
                    <span>Ваш словарь</span>
                </div>
                <div className={classes.right}>
                    <span onClick={() => dispatch(showPopup())}>Добавить</span>
                </div>
            </div>
            <div className={classes.table}>
                <div className={`${classes.grid} ${classes.header}`}>
                    <div className={`${classes.headerColumn} ${classes.word}`}>
                        <span>Слово или фраза</span>
                    </div>
                    <div
                        className={`${classes.headerColumn} ${classes.translate}`}
                    >
                        <span>Перевод</span>
                    </div>
                    <div className={`${classes.headerColumn} ${classes.level}`}>
                        <span>Владение</span>
                    </div>
                </div>
                <TableBody />
            </div>
            {isPopupVisible && <AddWordPopup />}
        </div>
    );
};
export default Dictionary;
