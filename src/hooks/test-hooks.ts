import { child, get, increment, ref, update } from 'firebase/database';
import { database } from '../firebase';
import { randomInteger } from '../funcs';
import { setResults, setTestWords, setWordsCount } from '../store/testSlice';
import { ITestWordData, IUpdate, IWordData } from '../types';
import { useAppDispatch, useAppSelector } from './redux-hooks';
import { useVoc } from './vocabulary-hooks';

export const useTest = () => {
    const uid = useAppSelector((state) => state.userSlice.userData?.userID);
    const dispatch = useAppDispatch();
    const words = useAppSelector((state) => state.vocabularySlice.words);
    const testWords = useAppSelector((state) => state.testSlice.words);
    const voc = useVoc();

    return {
        createTest() {
            get(child(ref(database), `users/${uid}/userData/wordsCount`))
                .then((snapshot) => {
                    if (snapshot.exists() && words?.length) {
                        const wordsCount = snapshot.val();
                        const test = composeTest(words, wordsCount);

                        dispatch(setWordsCount(wordsCount));
                        dispatch(setTestWords(test));
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        endTest() {
            const updates: IUpdate = {};

            const results = testWords.map((word) => {
                const wordData = { ...word };
                if (word.answer === word.translation) {
                    wordData.isRight = true;
                    if (word.level <= 90) {
                        updates[`/users/${uid}/words/${word.id}/level`] =
                            increment(10);
                        wordData.changes = 10;
                    } else {
                        wordData.changes = 0;
                    }
                } else {
                    wordData.isRight = false;

                    if (word.level >= 10) {
                        updates[`/users/${uid}/words/${word.id}/level`] =
                            increment(-10);
                        wordData.changes = -10;
                    } else {
                        wordData.changes = 0;
                    }
                }
                return wordData;
            });
            dispatch(setResults(results));
            update(ref(database), updates).then(() => {
                voc.loadWords();
            });
        },
    };
};

function composeTest(words: IWordData[], wordsCount: number) {
    interface IWords {
        words: ITestWordData[];
        amountForTest: number;
    }
    const groupedWords = groupeWords(words, wordsCount);
    const groups: IWords[] = Object.values(groupedWords);
    return groups
        .map(({ words, amountForTest }) => {
            const startIndex = randomInteger(0, words.length - amountForTest);
            const endIndex = startIndex + amountForTest;
            return words.slice(startIndex, endIndex);
        })
        .flat();
}

function groupeWords(words: IWordData[], wordsCount: number) {
    interface IGroups {
        [key: number]: {
            words: ITestWordData[];
            amountForTest: number;
        };
    }
    const groupedWords: IGroups = {
        0: { words: [], amountForTest: 2 },
        10: { words: [], amountForTest: 2 },
        20: { words: [], amountForTest: 2 },
        30: { words: [], amountForTest: 2 },
        40: { words: [], amountForTest: 3 },
        50: { words: [], amountForTest: 2 },
        60: { words: [], amountForTest: 2 },
        70: { words: [], amountForTest: 2 },
        80: { words: [], amountForTest: 1 },
        90: { words: [], amountForTest: 1 },
        100: { words: [], amountForTest: 1 },
    };

    words.forEach((wordData) => {
        const word: ITestWordData = {
            ...wordData,
            answer: '',
            isRight: null,
            changes: null,
        };
        groupedWords[wordData.level].words = [
            ...groupedWords[wordData.level].words,
            word,
        ];
    });

    return groupedWords;
}
