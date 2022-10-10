import { child, get, push, ref, remove, update } from 'firebase/database';
import { database } from '../firebase';
import { setWords } from '../store/vocabularySlice';
import { IWordData } from '../types';
import { useAppDispatch, useAppSelector } from './redux-hooks';

export const useVoc = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector((state) => state.userSlice.userData?.userID);
    return {
        addWord(data: IWordData) {
            interface update {
                [key: string]: IWordData;
            }

            const updates: update = {};

            updates[`/users/${uid}/words/${data.id}`] = data;
            update(ref(database), updates).then(() => {
                this.loadWords();
            });
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
            interface update {
                [key: string]: null;
            }
            const updates: update = {};
            updates[`/users/${uid}/words/${id}`] = null;
            update(ref(database), updates);
        },
    };
};
