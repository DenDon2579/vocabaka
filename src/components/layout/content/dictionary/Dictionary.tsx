import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { showPopup } from "../../../../store/visualSlice";
import { IWordData } from "../../../../types";
import AddWordPopup from "./addWordPopup/AddWordPopup";
import classes from "./Dictionary.module.scss";
import TableBody from "./tableBody/TableBody";
import searchIcon from "../../../../static/media/search.png";

const Dictionary: React.FC = () => {
  const isPopupVisible = useAppSelector(
    (state) => state.visualSlice.isPopupVisible
  );
  const words = useAppSelector((state) => state.vocabularySlice.words);
  const [wordList, setWordList] = useState<IWordData[]>([]);
  const [isUpSort, setIsUpSort] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (words) {
      setWordList([...words].sort((wordA, wordB) => wordA.level - wordB.level));
    }
  }, [words]);

  const toggleSort = () => {
    setIsUpSort((prev) => !prev);
  };

  const sort = () => {
    if (isUpSort) {
      console.log("up");

      setWordList((prev) =>
        [...prev].sort((wordA, wordB) => wordB.level - wordA.level)
      );
    } else {
      console.log("down");
      setWordList((prev) =>
        [...prev].sort((wordA, wordB) => wordA.level - wordB.level)
      );
    }
  };

  useEffect(() => sort(), [isUpSort]);

  const search = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (words) {
      if (query) {
        setWordList(
          words.filter(
            (item) =>
              item.word.includes(query) ||
              item.translations.join("").includes(query)
          )
        );
      } else {
        setWordList(words);
      }
      sort();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.top}>
        <div className={classes.left}>
          <span>Ваш словарь</span>
          <input
            className={classes.search}
            onChange={search}
            placeholder="поиск"
          />
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
          <div className={`${classes.headerColumn} ${classes.translate}`}>
            <span>Перевод</span>
          </div>
          <div className={`${classes.headerColumn} ${classes.level}`}>
            <span>Владение</span>
          </div>
          <div className={classes.sort} onClick={toggleSort}>
            ⇅
          </div>
        </div>
        <TableBody words={wordList} />
      </div>
      {isPopupVisible && <AddWordPopup />}
    </div>
  );
};
export default Dictionary;
