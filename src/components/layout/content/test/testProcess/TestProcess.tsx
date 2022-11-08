import React from 'react';
import { ITestWordData } from '../../../../../types';
import TestItem from '../testItem/TestItem';
import classes from './TestProcess.module.scss';

interface IProps {
  sendAnswer: (id: number, answer: string) => void;
  words: ITestWordData[];
  endTest: () => void;
}

const TestProcess: React.FC<IProps> = ({ words, sendAnswer, endTest }) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Тест на владение словами и фразами</h2>
      <span className={classes.wordsCount}>Слов в тесте: {words.length}</span>
      <div className={classes.test}>
        {words.map((word) => (
          <TestItem word={word} key={word.id} sendAnswer={sendAnswer} />
        ))}
      </div>
      <button className={classes.button} onClick={endTest}>
        Закончить тест
      </button>
    </div>
  );
};

export default TestProcess;
