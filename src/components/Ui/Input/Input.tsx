import React from 'react';
import styles from './Input.module.css';

type InputType = {
    value: string;
    onChange: (value: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    errorMessage: boolean;
    autoFocus?: boolean;
};

function Input({
    onKeyPress,
    onChange,
    errorMessage,
    onBlur,
    ...props
}: InputType) {
    return (
        <>
            {errorMessage && <div className={styles.errorMessage}>Error</div>}
            <input
                className={styles.input}
                onKeyPress={(e) => onKeyPress(e)}
                onChange={(e) => onChange(e.currentTarget.value)}
                onBlur={onBlur}
                {...props}
            />
        </>
    );
}

export default Input;
