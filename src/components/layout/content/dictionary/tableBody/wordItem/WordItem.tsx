import React, { ChangeEvent, useState } from 'react';
import { useVoc } from '../../../../../../hooks/vocabulary-hooks';
import { IWordData } from '../../../../../../types';
import classes from './WordItem.module.scss';

interface IProps {
    wordData: IWordData;
    delay: number;
    remove: (id: number) => void;
    edit: (data: IWordData) => void;
}

const WordItem: React.FC<IProps> = ({ wordData, delay, remove, edit }) => {
    const [isOtherWordsVisible, setIsOtherWordsVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        word: wordData.word,
        translations: wordData.translations.join(', '),
        level: wordData.level,
    });
    const setEditMode = (status: boolean) => {
        setIsEditMode(status);
    };
    const cancelChanges = () => {
        setIsEditMode(false);
    };
    const applyChanges = () => {
        edit({
            id: wordData.id,
            ...formData,
            translations: splitTranslations(formData.translations),
        });
        setIsEditMode(false);
    };

    const wordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            word: e.target.value.toLowerCase(),
        }));
    };
    const translateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            translations: e.target.value.toLowerCase(),
        }));
    };
    const levelChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, level: +e.target.value }));
    };

    const splitTranslations = (translations: string): string[] => {
        return translations
            .split(',')
            .map((phrase) =>
                phrase
                    .split(' ')
                    .filter((word) => word !== '')
                    .join(' ')
            )
            .filter((word) => word);
    };

    return (
        <div className={classes.wordItem}>
            <div
                className={`${classes.block} ${classes.word}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                {isEditMode ? (
                    <input
                        className={classes.input}
                        onChange={wordChangeHandler}
                        value={formData.word}
                    />
                ) : (
                    <span>{wordData.word}</span>
                )}
            </div>
            <div
                className={`${classes.block} ${classes.translate}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                {isEditMode ? (
                    <input
                        className={classes.input}
                        value={formData.translations}
                        onChange={translateChangeHandler}
                    />
                ) : (
                    <span>{wordData.translations[0]}</span>
                )}
                {wordData.translations.length > 1 && !isEditMode && (
                    <>
                        <div
                            className={classes.info}
                            onMouseEnter={() => setIsOtherWordsVisible(true)}
                            onMouseLeave={() => setIsOtherWordsVisible(false)}
                        >
                            +{wordData.translations.length - 1}
                        </div>
                        {isOtherWordsVisible && (
                            <div className={classes.otherWords}>
                                <h2>Альтернативные переводы</h2>
                                {wordData.translations
                                    .slice(1)
                                    .map((word, i) => (
                                        <React.Fragment key={i}>
                                            <span>{word}</span>
                                        </React.Fragment>
                                    ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            <div
                className={`${classes.block} ${classes.level}`}
                style={{ animationDelay: `${delay / 25}s` }}
            >
                {isEditMode ? (
                    <>
                        <input
                            type='range'
                            min={0}
                            max={100}
                            step={10}
                            value={formData.level}
                            onChange={levelChangeHandler}
                        />
                        <span>{formData.level}%</span>
                    </>
                ) : (
                    <span>{wordData.level}%</span>
                )}
            </div>
            <div className={classes.delete} onClick={() => remove(wordData.id)}>
                ╳
            </div>
            {!isEditMode && (
                <div className={classes.edit} onClick={() => setEditMode(true)}>
                    ✎
                </div>
            )}
            {isEditMode && (
                <>
                    <div
                        className={classes.edit}
                        style={{ color: '#5ea3a3', opacity: 0.8 }}
                        onClick={applyChanges}
                    >
                        ✎
                    </div>
                    <div
                        className={classes.edit}
                        style={{
                            left: '-40px',
                            color: '#F37E7E',
                            opacity: 0.8,
                        }}
                        onClick={cancelChanges}
                    >
                        ✎
                    </div>
                </>
            )}
        </div>
    );
};
export default WordItem;
