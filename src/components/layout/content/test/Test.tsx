import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { useTest } from '../../../../hooks/test-hooks';
import { purgeTestData, setAnswer } from '../../../../store/testSlice';
import { testTypes } from '../../../../types';
import classes from './Test.module.scss';
import TestItem from './testItem/TestItem';
import TestProcess from './testProcess/TestProcess';
import TestTypes from './testTypes/TestTypes';

const Test: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const test = useTest();
  const [isTestStarted, setIsTestStarted] = useState(false);
  useEffect(() => {
    setIsTestStarted(false);
    dispatch(purgeTestData());
  }, []);

  const startTest = (type: testTypes) => {
    test.createTest(type);
    setIsTestStarted(true);
  };

  const testData = useAppSelector((state) => state.testSlice);
  const wordsCount = useAppSelector((state) => state.userSlice.wordsCount);
  const sendAnswer = (id: number, answer: string) => {
    dispatch(setAnswer([id, answer]));
  };
  const endTest = () => {
    test.endTest();
    navigate(`results`);
  };
  if (!isTestStarted) {
    return (
      <div className={classes.wrapper}>
        <TestTypes startTest={startTest} />
      </div>
    );
  } else {
    return (
      <div className={classes.wrapper}>
        {wordsCount < 10 ? (
          <>
            <h2 className={classes.title}>
              Недостаточно слов, чтобы начать тестирование
            </h2>
            <span className={classes.wordsCount}>
              Минимально-необходимое количество: 10
            </span>
            <span className={classes.wordsCount}>
              Слов в вашем словаре: {wordsCount}
            </span>
          </>
        ) : (
          <>
            <TestProcess
              sendAnswer={sendAnswer}
              words={testData.words}
              endTest={endTest}
            />
          </>
        )}
      </div>
    );
  }
};
export default Test;
