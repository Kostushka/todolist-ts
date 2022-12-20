import React, { useState } from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { v1 } from 'uuid';
import {
    FilterValuesType,
    TaskStateType,
    TaskType,
    TodolistType,
} from './types/types';
import AddItemForm from './components/AddItemForm';

function App() {
    const id_1 = v1();
    const id_2 = v1();
    const id_3 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        { id: id_1, title: 'What to do', filter: 'all' },
        { id: id_2, title: 'What to buy', filter: 'all' },
        { id: id_3, title: 'What to learn', filter: 'all' },
    ]);
    const [tasks, setTasks] = useState<TaskStateType>({
        [id_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Rest API', isDone: false },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
        [id_2]: [
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Bread', isDone: false },
        ],
        [id_3]: [
            { id: v1(), title: 'Math', isDone: false },
            { id: v1(), title: 'English', isDone: false },
            { id: v1(), title: 'Phisic', isDone: false },
        ],
    });
    // console.log(tasks);

    // const [tasks, setTasks] = useState([
    //     { id: v1(), title: 'HTML&CSS', isDone: true },
    //     { id: v1(), title: 'JS', isDone: true },
    //     { id: v1(), title: 'ReactJS', isDone: false },
    //     { id: v1(), title: 'Rest API', isDone: false },
    //     { id: v1(), title: 'GraphQL', isDone: false },
    // ]);

    // const [filter, setFilter] = useState<FilterValuesType>('all');

    const addNewTodolist = (value: string) => {
        const newId = v1();
        setTodoLists([
            ...todoLists,
            { id: newId, title: value, filter: 'all' },
        ]);
        setTasks({ ...tasks, [newId]: [] });
    };

    const changeTodolistTitle = (todoId: string, title: string) => {
        setTodoLists(
            todoLists.map((el) => (el.id === todoId ? { ...el, title } : el))
        );
    };
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map((el) =>
                el.id === taskId ? { ...el, title } : el
            ),
        });
    };

    function removeTask(todoId: string, id: string) {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].filter((el) => el.id !== id),
        });
    }

    function addTask(todoId: string, title: string) {
        setTasks({
            ...tasks,
            [todoId]: [{ id: v1(), title, isDone: false }, ...tasks[todoId]],
        });
    }

    function changeIsDone(todoId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map((el) =>
                el.id === taskId ? { ...el, isDone } : el
            ),
        });
    }

    function changeFilter(todoId: string, value: FilterValuesType) {
        setTodoLists(
            todoLists.map((el) =>
                el.id === todoId ? { ...el, filter: value } : el
            )
        );
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter((el) => el.id !== todoId));

        // без лишней перерисовки
        // delete tasks[todoId];
        // немутирующий способ
        let copy = { ...tasks };
        delete copy[todoId];
        setTasks(copy);
    };

    const filteredTasksFunc = (
        tasks: Array<TaskType>,
        filter: FilterValuesType
    ) => {
        let tasksForTodolist = tasks;

        switch (filter) {
            case 'active':
                return tasksForTodolist.filter((el) => !el.isDone);
            case 'completed':
                return tasksForTodolist.filter((el) => el.isDone);

            case 'all':
                return tasksForTodolist;
        }
    };

    const todoListCopmonents = todoLists.map((el) => {
        return (
            <Todolist
                key={el.id}
                todoId={el.id}
                title={el.title}
                tasks={filteredTasksFunc(tasks[el.id], el.filter)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeIsDone={changeIsDone}
                removeTodoList={removeTodoList}
                filter={el.filter}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        );
    });

    return (
        <div className='App'>
            <AddItemForm addItem={addNewTodolist} />
            {tasks && <>{todoListCopmonents}</>}
        </div>
    );
}

export default App;
