import React, { KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../types/types';
import { TaskType } from '../../types/types';
import AddItemForm from '../AddItemForm';
import ChangedTitle from '../ChangedTitle/ChangedTitle';
import Button from '../Ui/Button';
import Checkbox from '../Ui/Checkbox/Checkbox';
import Input from '../Ui/Input';

import styles from './Todolist.module.css';

type PropsType = {
    todoId: string;
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType;
    removeTask: (todoId: string, taskId: string) => void;
    changeFilter: (todoId: string, value: FilterValuesType) => void;
    addTask: (todoId: string, title: string) => void;
    changeIsDone: (todoId: string, taskId: string, isDone: boolean) => void;
    removeTodoList: (todoId: string) => void;
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todoId: string, title: string) => void;
};

function Todolist({
    removeTodoList,
    todoId,
    addTask,
    changeFilter,
    changeIsDone,
    removeTask,
    tasks,
    title,
    filter,
    changeTaskTitle,
    changeTodolistTitle,
}: PropsType) {
    const addNewTask = (value: string) => {
        addTask(todoId, value);
    };

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todoId, title);
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

    const changeFilterClickHandler = (filter: FilterValuesType) => {
        return () => changeFilter(todoId, filter);
    };

    return (
        <div>
            <div className={styles.title__container}>
                <ChangedTitle
                    title={title}
                    changeTitle={changeTodolistTitleHandler}
                />
                <Button children={'x'} onClick={() => removeTodoList(todoId)} />
            </div>

            <AddItemForm addItem={addNewTask} />

            {tasks && (
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
                                        changeIsDone(todoId, t.id, checked)
                                    }
                                />
                                <ChangedTitle
                                    title={t.title}
                                    changeTitle={(title) =>
                                        changeTaskTitle(todoId, t.id, title)
                                    }
                                />
                                <Button
                                    children={'x'}
                                    onClick={() => removeTask(todoId, t.id)}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}

            <div>
                <Button
                    className={filterButtonClass.buttonAllClass()}
                    onClick={changeFilterClickHandler('all')}
                    children={'All'}
                />
                <Button
                    className={filterButtonClass.buttonActiveClass()}
                    onClick={changeFilterClickHandler('active')}
                    children={'Active'}
                />
                <Button
                    className={filterButtonClass.buttonCompleteClass()}
                    onClick={changeFilterClickHandler('completed')}
                    children={'Completed'}
                />
            </div>
        </div>
    );
}

export default Todolist;
