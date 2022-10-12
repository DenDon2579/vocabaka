import React from 'react';
import { IWordData } from '../../../../../../types';
import classes from './WordItem.module.scss';

interface IProps {
    wordData: IWordData;
    delay: number;
    remove: (id: number) => void;
}

const WordItem: React.FC<IProps> = ({ wordData, delay, remove }) => {
    return (
        <div className={classes.wordItem}>
            <div
                className={`${classes.block} ${classes.word}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                <span>{wordData.word}</span>
            </div>
            <div
                className={`${classes.block} ${classes.translate}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                <span>{wordData.translation}</span>
            </div>
            <div
                className={`${classes.block} ${classes.level}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                <span>{wordData.level}%</span>
            </div>
            <div className={classes.delete} onClick={() => remove(wordData.id)}>
                ╳
            </div>
        </div>
    );
};
export default WordItem;
