import React from 'react';
import styles from './Input.module.css';

type InputType = {
    value: string;
    onChange: (value: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    errorMessage: boolean;
};

function Input({ onKeyPress, onChange, errorMessage, ...props }: InputType) {
    return (
        <>
            {errorMessage && <div className={styles.errorMessage}>Error</div>}
            <input
                className={styles.input}
                onKeyPress={(e) => onKeyPress(e)}
                onChange={(e) => onChange(e.currentTarget.value)}
                {...props}
            />
        </>
    );
}

export default Input;
