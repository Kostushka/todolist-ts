import React, { KeyboardEvent } from 'react';
import { useState } from 'react';
import Button from '../Ui/Button';
import Input from '../Ui/Input';

type AddItemFormType = {
    addItem: (value: string) => void;
};

function AddItemForm({ addItem }: AddItemFormType) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const onChangeHandler = (value: string) => {
        setError(false);
        setValue(value);
    };

    const addNewValue = () => {
        if (value.trim()) {
            addItem(value.trim());
        } else {
            setError(true);
        }
        setValue('');
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewValue();
        }
    };

    return (
        <div>
            <Input
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                value={value}
                errorMessage={error}
            />
            <Button children={'+'} onClick={addNewValue} />
        </div>
    );
}

export default AddItemForm;
