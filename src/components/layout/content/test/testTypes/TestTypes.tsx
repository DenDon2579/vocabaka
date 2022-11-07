import React from 'react';
import { testTypes } from '../../../../../types';
import classes from './TestTypes.module.scss';

interface IProps {
  startTest: (type: testTypes) => void;
}

const TestTypes: React.FC<IProps> = ({ startTest }) => {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>Выберите тип теста</h2>
      <div className={classes.types}>
        <div className={classes.card} onClick={(_) => startTest('all')}>
          <h3 className={classes.subTitle}>Тест по словарю</h3>
          <p className={classes.text}>
            Слова для теста будут отобраны из всего вашего словаря
          </p>
        </div>
        <div className={classes.card} onClick={(_) => startTest('fav')}>
          <h3 className={classes.subTitle}>Тест по "Избранное"</h3>
          <p className={classes.text}>
            В тесте будут присутствовать все слова из "Избранное"
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestTypes;
