import React, { useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

function App() {
    // const task = [
    //     { id: 1, title: 'HTML&CSS', isDone: true },
    //     { id: 2, title: 'JS', isDone: true },
    //     { id: 3, title: 'ReactJS', isDone: false },
    // ];

    // const [tasks, setTasks] = useState(task);

    const [tasks, setTasks] = useState([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'ReactJS', isDone: false },
        { id: 5, title: 'ReactJS', isDone: false },
        { id: 6, title: 'ReactJS', isDone: false },
    ]);

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const changeFilter = (value: 'all' | 'active' | 'completed') => {
        setFilter(value);
    };

    const selectedTasks = () => {
        // не меняем массив в local state: отрисовываем переменную с копией отфильтрованного массива
        let filteredTasks = tasks;
        switch (filter) {
            case 'all':
                filteredTasks = tasks;
                break;
            case 'active':
                filteredTasks = tasks.filter((el) => !el.isDone);
                break;
            case 'completed':
                filteredTasks = tasks.filter((el) => el.isDone);
                break;
        }
        return filteredTasks;
    };
    const filteredTasks = selectedTasks();

    const removeTask = (id: number) => {
        // изменяем исходный массив
        setTasks(tasks.filter((el) => el.id !== id));
    };

    // const selectTasks = (stateTasks: 'all' | 'active' | 'completed') => {
    //     switch (stateTasks) {
    //         // отрисовываем нужный массив
    //         case 'all':
    //             setTasks(task);
    //             break;
    //         case 'active':
    //             setTasks(task.filter((el) => !el.isDone));
    //             break;
    //         case 'completed':
    //             setTasks(task.filter((el) => el.isDone));
    //             break;
    //     }
    // };

    return (
        <div className='App'>
            <Todolist
                title='What to learn'
                tasks={filteredTasks}
                // tasks={tasks}
                removeTask={removeTask}
                // selectTasks={selectTasks}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
