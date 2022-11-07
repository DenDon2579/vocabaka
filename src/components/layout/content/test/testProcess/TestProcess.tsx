import React from 'react';
import { ITestWordData } from '../../../../../types';
import TestItem from '../testItem/TestItem';
import classes from './TestProcess.module.scss';

interface IProps {
  sendAnswer: (id: number, answer: string) => void;
  words: ITestWordData[];
}

const TestProcess: React.FC<IProps> = ({ words, sendAnswer }) => {
  return (
    <div className={classes.test}>
      {words.map((word) => (
        <TestItem word={word} key={word.id} sendAnswer={sendAnswer} />
      ))}
    </div>
  );
};

export default TestProcess;
