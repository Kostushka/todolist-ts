import React from 'react';

type CheckboxType = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const Checkbox = ({ checked, onChange }: CheckboxType) => {
    return (
        <>
            <input
                type='checkbox'
                checked={checked}
                onChange={(e) => onChange(e.currentTarget.checked)}
            />
        </>
    );
};

export default Checkbox;
