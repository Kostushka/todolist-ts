import React, { useState } from 'react';
import Input from '../Ui/Input';

type ChangedTitleType = {
    title: string;
    changeTitle: (title: string) => void;
};

function ChangedTitle({ title, changeTitle }: ChangedTitleType) {
    const [value, setValue] = useState(title);
    const [error, setError] = useState(false);
    const [isEditMode, setEditMode] = useState<boolean>(false);

    const onChangeHandler = (value: string) => {
        setError(false);
        setValue(value);
    };

    const changeTitleHandler = () => {
        setEditMode(false);
        changeTitle(value);
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false);
        }
    };

    return (
        <>
            {isEditMode ? (
                <Input
                    onKeyPress={onKeyPress}
                    value={value}
                    errorMessage={error}
                    onChange={onChangeHandler}
                    autoFocus
                    onBlur={changeTitleHandler}
                />
            ) : (
                <span onDoubleClick={() => setEditMode(true)}>{title}</span>
            )}
        </>
    );
}

export default ChangedTitle;
