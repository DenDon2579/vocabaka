import React from 'react';
import { ITestWordData } from '../../../../../../types';
import WordItem from '../../../dictionary/tableBody/wordItem/WordItem';
import classes from './ResultItem.module.scss';

interface IProps {
    word: ITestWordData;
}

const ResultItem: React.FC<IProps> = ({ word }) => {
    const newLevel = word.level + (word.changes !== null ? word.changes : 0);
    const changes = word.changes !== null ? word.changes : 0;

    return (
        <div
            className={`${classes.card} ${
                word.isRight ? classes.right : classes.wrong
            }`}
        >
            <div className={classes.block}>
                <span className={classes.property}>Слово</span>
                <span className={classes.value}>«{word.word}»</span>
            </div>

            <div className={classes.block}>
                <span className={classes.property}>Вы ответили</span>
                <span className={classes.value}>
                    {word.answer ? `«${word.answer}»` : '-'}
                </span>
            </div>

            <div className={classes.block}>
                <span className={classes.property}>Верный ответ</span>
                <span className={classes.value}>«{word.translation}»</span>
            </div>

            <div className={classes.block}>
                <span className={classes.property}>Изменения</span>
                <div className={classes.changes}>
                    <div className={classes.level}>{word.level}%</div>
                    <span className={classes.arrow}>➝</span>
                    <div
                        className={`${classes.level} ${
                            changes > 0
                                ? classes.up
                                : changes < 0
                                ? classes.down
                                : classes.default
                        }`}
                    >
                        {newLevel}%
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResultItem;
