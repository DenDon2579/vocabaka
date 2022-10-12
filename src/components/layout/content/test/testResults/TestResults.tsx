import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import classes from './TestResults.module.scss';
import TestItem from '../testItem/TestItem';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../../hooks/redux-hooks';
import ResultItem from './resultItem/ResultItem';

const TestResults: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const testData = useAppSelector((state) => state.testSlice);

    return (
        <div className={classes.wrapper}>
            <>
                <h2 className={classes.title}>Результаты теста</h2>

                <div className={classes.test}>
                    {testData.words.map((word) => (
                        <ResultItem word={word} key={word.id} />
                    ))}
                </div>

                <button
                    className={classes.button}
                    onClick={() => navigate('../../dictionary')}
                >
                    Выйти
                </button>
            </>
        </div>
    );
};
export default TestResults;
