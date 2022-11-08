import {
  child,
  get,
  increment,
  query,
  ref,
  update,
  onValue,
  getDatabase,
} from 'firebase/database';
import { database } from '../firebase';
import { setWords } from '../store/vocabularySlice';
import { IUpdate, IWordData } from '../types';
import { useAppDispatch, useAppSelector } from './redux-hooks';

import { getAuth } from 'firebase/auth';
import { setWordsCount } from '../store/userSlice';

export const useVoc = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector((state) => state.userSlice.userData?.userID);

  return {
    listenWordsCount() {
      onValue(
        ref(database, `/users/${uid}/userData/wordsCount`),
        (snapshot) => {
          const wordsCount = snapshot.val() ? snapshot.val() : 0;
          console.log(wordsCount);
          dispatch(setWordsCount(wordsCount));
        }
      );
    },
    addWord(data: IWordData) {
      const updates: IUpdate = {};
      updates[`/users/${uid}/words/${data.id}`] = data;
      updates[`/users/${uid}/userData/wordsCount`] = increment(1);
      update(ref(database), updates).then(() => {
        this.loadWords();
      });
    },
    editWord(data: IWordData) {
      const updates: IUpdate = {};
      updates[`/users/${uid}/words/${data.id}`] = data;
      update(ref(database), updates).then(() => this.loadWords());
    },
    loadWords() {
      get(child(ref(database), `users/${uid}/words`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch(setWords(Object.values(snapshot.val())));
          } else {
            dispatch(setWords([]));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteWord(id: number) {
      const updates: IUpdate = {};
      updates[`/users/${uid}/words/${id}`] = null;
      updates[`/users/${uid}/userData/wordsCount`] = increment(-1);
      update(ref(database), updates).then(() => this.loadWords());
    },
    toggleFav(id: number) {
      const updates: IUpdate = {};
      get(ref(database, `/users/${uid}/words/${id}/isFav`))
        .then(
          (res) => (updates[`/users/${uid}/words/${id}/isFav`] = !res.val())
        )
        .then(() =>
          update(ref(database), updates).then(() => this.loadWords())
        );
    },
  };
};
