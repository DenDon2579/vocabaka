import React, {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    useEffect,
    useState,
} from 'react';
import { ITestWordData, IWordData } from '../../../../../types';
import classes from './TestItem.module.scss';

interface IProps {
    word: ITestWordData;
    sendAnswer: (id: number, answer: string) => void;
}

const TestItem: React.FC<IProps> = ({ word, sendAnswer }) => {
    const [value, setValue] = useState<string>('');
    const [color, setColor] = useState<string>('black');

    useEffect(() => {
        sendAnswer(word.id, '');
    }, []);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const inputBlurHandler = () => {
        sendAnswer(word.id, value);
        setColor('#488C8F');
    };
    const inputFocusHandler = () => {
        setColor('black');
    };
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendAnswer(word.id, value);
            setColor('#488C8F');
        }
    };

    return (
        <div className={classes.card}>
            <div className={classes.top}>
                <span className={classes.text}>Переведите</span>
                <span className={classes.word}>«{word.word}»</span>
                <span className={classes.lang}>на русский</span>
            </div>
            <div className={classes.bot}>
                <input
                    style={{ color: color }}
                    className={classes.input}
                    placeholder='ответ'
                    value={value}
                    onChange={inputChangeHandler}
                    onFocus={inputFocusHandler}
                    onBlur={inputBlurHandler}
                    onKeyDown={keyDownHandler}
                />
            </div>
        </div>
    );
};
export default TestItem;
