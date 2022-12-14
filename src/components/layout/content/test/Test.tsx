import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { useTest } from '../../../../hooks/test-hooks';
import { purgeTestData, setAnswer } from '../../../../store/testSlice';
import classes from './Test.module.scss';
import TestItem from './testItem/TestItem';

const Test: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const test = useTest();
    useEffect(() => {
        test.createTest();

        // return () => {
        //     dispatch(purgeTestData());
        // };
    }, []);

    const testData = useAppSelector((state) => state.testSlice);
    const sendAnswer = (id: number, answer: string) => {
        dispatch(setAnswer([id, answer]));
    };
    return (
        <div className={classes.wrapper}>
            {testData.wordsCount < 10 ? (
                <>
                    <h2 className={classes.title}>
                        Недостаточно слов, чтобы начать тестирование
                    </h2>
                    <span className={classes.wordsCount}>
                        Минимально-необходимое количество: 10
                    </span>
                    <span className={classes.wordsCount}>
                        Слов в вашем словаре: {testData.wordsCount}
                    </span>
                </>
            ) : (
                <>
                    <h2 className={classes.title}>
                        Тест на владение словами и фразами
                    </h2>
                    <span className={classes.wordsCount}>
                        Слов в тесте: {testData.words.length}
                    </span>
                    <div className={classes.test}>
                        {testData.words.map((word) => (
                            <TestItem
                                word={word}
                                key={word.id}
                                sendAnswer={sendAnswer}
                            />
                        ))}
                    </div>

                    <button
                        className={classes.button}
                        onClick={() => {
                            test.endTest();
                            navigate(`results`);
                        }}
                    >
                        Закончить тест
                    </button>
                </>
            )}
        </div>
    );
};
export default Test;
