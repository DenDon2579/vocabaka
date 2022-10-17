import React, { useState } from 'react';
import { ITestWordData } from '../../../../../../types';
import WordItem from '../../../dictionary/tableBody/wordItem/WordItem';
import classes from './ResultItem.module.scss';

interface IProps {
    word: ITestWordData;
}

const ResultItem: React.FC<IProps> = ({ word }) => {
    const [isOtherWordsVisible, setIsOtherWordsVisible] = useState(false);
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

            <div className={`${classes.block} ${classes.rightAnswer}`}>
                <span className={classes.property}>Верный ответ</span>
                <span className={classes.value}>
                    «{word.translations[0]}»
                    {word.translations.length > 1 && (
                        <span
                            className={classes.info}
                            onMouseEnter={() => setIsOtherWordsVisible(true)}
                            onMouseLeave={() => setIsOtherWordsVisible(false)}
                        >
                            {' '}
                            +{word.translations.length - 1}
                        </span>
                    )}
                </span>
                {word.translations.length > 1 && (
                    <div
                        className={`${classes.otherWords} ${
                            word.isRight ? classes.up : classes.down
                        }`}
                        style={{
                            opacity: isOtherWordsVisible ? '1' : '0',
                        }}
                    >
                        <h2>Альтернативные переводы</h2>
                        {word.translations.slice(1).map((word, i) => (
                            <React.Fragment key={i}>
                                <span>{word}</span>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>

            <div className={classes.block}>
                <span className={classes.property}>Прогресс</span>
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
