import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux-hooks';
import { useVoc } from '../../../../../hooks/vocabulary-hooks';
import { hidePopup } from '../../../../../store/visualSlice';
import classes from './AddWordPopup.module.scss';

const AddWordPopup: React.FC = () => {
    const [formData, setFormData] = useState({
        word: '',
        translations: '',
        level: 0,
    });
    const voc = useVoc();
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

    const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        voc.addWord({
            ...formData,
            translations: splitTranslations(formData.translations),
            id: Date.now(),
        });
        dispatch(hidePopup());
        setFormData({
            word: '',
            translations: '',
            level: 0,
        });
    };

    const dispatch = useAppDispatch();

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
        <div className={classes.overlay} onClick={() => dispatch(hidePopup())}>
            <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                <div className={classes.title}>
                    <h2>Добавление слова или фразы</h2>
                </div>

                <form className={classes.form} onSubmit={formSubmitHandler}>
                    <label>Введите слово или фразу на английском</label>
                    <input
                        type='text'
                        className={classes.word}
                        value={formData.word}
                        onChange={wordChangeHandler}
                        autoFocus
                        required
                    />
                    <label>Введите перевод слова или фразы</label>
                    <input
                        type='text'
                        className={classes.translate}
                        value={formData.translations}
                        onChange={translateChangeHandler}
                        required
                    />
                    <label>
                        Укажите ваш уровень владения словом или фразой
                    </label>
                    <input
                        type='range'
                        value={formData.level}
                        min={0}
                        max={100}
                        step={10}
                        className={classes.level}
                        onChange={levelChangeHandler}
                    />
                    <span>{formData.level}%</span>
                    <button type='submit'>Добавить</button>
                </form>
            </div>
        </div>
    );
};
export default AddWordPopup;
