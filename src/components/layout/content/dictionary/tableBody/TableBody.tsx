import React, { DragEvent, MouseEvent, useEffect } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/redux-hooks';
import { useVoc } from '../../../../../hooks/vocabulary-hooks';
import { showPopup } from '../../../../../store/visualSlice';
import { IWordData } from '../../../../../types';
import classes from './TableBody.module.scss';
import WordItem from './wordItem/WordItem';

interface IProps {
  words: IWordData[] | null;
}

const TableBody: React.FC<IProps> = ({ words }) => {
  const voc = useVoc();
  useEffect(() => {
    voc.loadWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useAppDispatch();

  const remove = (id: number) => {
    voc.deleteWord(id);
  };
  const edit = (data: IWordData) => {
    voc.editWord(data);
  };

  const toggFav = (id: number) => {
    voc.toggleFav(id);
  };

  return (
    <>
      <div className={classes.table}>
        {!words?.length ? (
          <span className={classes.message}>
            В вашем словаре пока что нет слов, но вы можете{' '}
            <b onClick={() => dispatch(showPopup())}>добавить</b> их, чтобы
            начать вести словарь.
          </span>
        ) : null}
        {words?.map((word, i, arr) => (
          <WordItem
            wordData={word}
            key={i}
            delay={arr.length - i}
            remove={remove}
            edit={edit}
            toggleFav={toggFav}
          />
        ))}
      </div>
    </>
  );
};
export default TableBody;
