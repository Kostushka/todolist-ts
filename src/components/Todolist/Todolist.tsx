import React, { KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../App';
import Button from '../Ui/Button';
import Checkbox from '../Ui/Checkbox/Checkbox';
import Input from '../Ui/Input';

import styles from './Todolist.module.css';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
    changeIsDone: (taskId: string, isDone: boolean) => void;
};

function Todolist({
    addTask,
    changeFilter,
    changeIsDone,
    removeTask,
    tasks,
    title,
    filter,
}: PropsType) {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const addTaskHandler = () => {
        if (value.trim()) {
            addTask(value.trim());
        } else {
            setError(true);
        }
        setValue('');
    };

    const onChangeHandler = (value: string) => {
        setError(false);
        setValue(value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler();
        }
    };

    const filterButtonClass = {
        buttonAllClass() {
            if (filter === 'all') {
                return 'current';
            }
        },
        buttonActiveClass() {
            if (filter === 'active') {
                return 'current';
            }
        },
        buttonCompleteClass() {
            if (filter === 'completed') {
                return 'current';
            }
        },
    };

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <Input
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={value}
                    errorMessage={error}
                />
                <Button children={'+'} onClick={addTaskHandler} />
            </div>
            <ul>
                {tasks.map((t) => {
                    return (
                        <li
                            key={t.id}
                            className={
                                t.isDone ? styles.isDone : styles.default
                            }
                        >
                            <Checkbox
                                checked={t.isDone}
                                onChange={(checked) =>
                                    changeIsDone(t.id, checked)
                                }
                            />
                            <span>{t.title}</span>
                            <Button
                                children={'x'}
                                onClick={() => removeTask(t.id)}
                            />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    className={filterButtonClass.buttonAllClass()}
                    onClick={() => changeFilter('all')}
                    children={'All'}
                />
                <Button
                    className={filterButtonClass.buttonActiveClass()}
                    onClick={() => changeFilter('active')}
                    children={'Active'}
                />
                <Button
                    className={filterButtonClass.buttonCompleteClass()}
                    onClick={() => changeFilter('completed')}
                    children={'Completed'}
                />
            </div>
        </div>
    );
}

export default Todolist;
