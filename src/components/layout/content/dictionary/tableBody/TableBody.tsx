import React, { useEffect } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../../hooks/redux-hooks';
import { useVoc } from '../../../../../hooks/vocabulary-hooks';
import { showPopup } from '../../../../../store/visualSlice';
import classes from './TableBody.module.scss';
import WordItem from './wordItem/WordItem';

const TableBody: React.FC = () => {
    const voc = useVoc();
    useEffect(() => {
        voc.loadWords();
    }, []);
    const dispatch = useAppDispatch();
    const words = useAppSelector((state) => state.vocabularySlice.words);
    const remove = (id: number) => {
        voc.deleteWord(id);
        voc.loadWords();
    };
    return (
        <div className={classes.table}>
            {!words?.length ? (
                <span className={classes.message}>
                    В вашем словаре пока что нет слов, но вы можете{' '}
                    <b onClick={() => dispatch(showPopup())}>добавить</b> их,
                    чтобы начать вести словарь.
                </span>
            ) : null}
            {words?.map((word, i, arr) => (
                <WordItem
                    wordData={word}
                    key={i}
                    delay={arr.length - i}
                    remove={remove}
                />
            ))}
        </div>
    );
};
export default TableBody;
