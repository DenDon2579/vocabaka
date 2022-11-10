import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { showPopup } from '../../../../store/visualSlice';
import { IWordData } from '../../../../types';
import AddWordPopup from './addWordPopup/AddWordPopup';
import classes from './Dictionary.module.scss';
import TableBody from './tableBody/TableBody';
import searchIcon from '../../../../static/media/search.png';
import DropZones from './dropZones/DropZones';

const Dictionary: React.FC = () => {
  const isPopupVisible = useAppSelector(
    (state) => state.visualSlice.isPopupVisible
  );
  const isDropZonesShow = useAppSelector(
    (state) => state.vocabularySlice.visual.dragAndDrop.isDropZonesShow
  );
  const words = useAppSelector((state) => state.vocabularySlice.words);
  const [wordList, setWordList] = useState<IWordData[]>([]);
  const [isUpSort, setIsUpSort] = useState<boolean>(true);
  const [mode, setMode] = useState<'all' | 'fav'>('all');
  const dispatch = useAppDispatch();
  const [searchQuery, setSeatchQuery] = useState<string>('');
  const toggleSort = () => {
    setIsUpSort((prev) => !prev);
  };

  const sort = () => {
    if (isUpSort) {
      setWordList((prev) =>
        [...prev].sort((wordA, wordB) => wordA.level - wordB.level)
      );
    } else {
      setWordList((prev) =>
        [...prev].sort((wordA, wordB) => wordB.level - wordA.level)
      );
    }
  };

  const renderNewWords = () => {
    if (words) {
      if (mode === 'fav') {
        setWordList(() => [...words].filter((word) => word.isFav));
      } else {
        setWordList(words);
      }
      sort();
      search(searchQuery);
    }
  };

  useEffect(renderNewWords, [mode]);

  useEffect(() => sort(), [isUpSort]);

  useEffect(renderNewWords, [words]);

  const search = (query: string) => {
    if (words) {
      if (query) {
        setWordList(
          words.filter(
            (item) =>
              (item.word.includes(query) ||
                item.translations.join('').includes(query)) &&
              (mode === 'fav' ? item.isFav : true)
          )
        );
      } else {
        if (mode === 'all') {
          setWordList(words);
        } else {
          setWordList(() => [...words].filter((word) => word.isFav));
        }
      }
      sort();
    }
  };

  const queryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSeatchQuery(e.target.value);
    search(e.target.value);
  };

  const toggleMode = () => {
    setMode((prev) => {
      if (prev === 'all') {
        return 'fav';
      }
      return 'all';
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <div className={classes.left}>
          <span className={classes.toggleButton} onClick={toggleMode}>
            ⤸
          </span>
          <div className={classes.modes} data-mode={mode}>
            <span className={classes.allMode} onClick={toggleMode}>
              Весь словарь
            </span>
            <span className={classes.favMode} onClick={toggleMode}>
              Избранное
            </span>
          </div>
          <input
            className={classes.search}
            onChange={queryChangeHandler}
            placeholder='поиск'
          />
        </div>

        <div className={classes.right}>
          <span onClick={() => dispatch(showPopup())}>Добавить</span>
        </div>
      </div>
      <div className={classes.table}>
        <div className={`${classes.grid} ${classes.header}`}>
          <div className={`${classes.headerColumn} ${classes.word}`}>
            <span>Слово или фраза</span>{' '}
          </div>
          <div className={`${classes.headerColumn} ${classes.translate}`}>
            <span>Перевод</span>
          </div>
          <div className={`${classes.headerColumn} ${classes.level}`}>
            <span>Владение</span>
          </div>
          <div
            className={classes.sort}
            onClick={toggleSort}
            title='Сортировать'
          >
            ⇅
          </div>
        </div>
        <TableBody words={wordList} />
      </div>
      {isPopupVisible && <AddWordPopup />}
      {isDropZonesShow && <DropZones />}
    </div>
  );
};
export default Dictionary;
