import React from 'react';
import styles from './Button.module.css';
type ButtonType = {
    children: React.ReactNode;
    onClick: () => void;
    className?: 'current' | '';
};

function Button({ children, onClick, className }: ButtonType) {
    return (
        <button
            className={`${styles.button} ${
                className === 'current' ? styles.current : styles.default
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
