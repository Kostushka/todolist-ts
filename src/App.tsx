import React, { useState } from 'react';
import './App.css';
import Todolist from './components/Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Rest API', isDone: false },
        { id: v1(), title: 'GraphQL', isDone: false },
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        setTasks(tasks.filter((el) => el.id !== id));
    }

    function addTask(title: string) {
        setTasks([{ id: v1(), title, isDone: false }, ...tasks]);
    }

    function changeIsDone(taskId: string, isDone: boolean) {
        setTasks(
            tasks.map((el) => (el.id === taskId ? { ...el, isDone } : el))
        );
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const filteredTasksFunc = () => {
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

    return (
        <div className='App'>
            <Todolist
                title='What to learn'
                tasks={filteredTasksFunc()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeIsDone={changeIsDone}
                filter={filter}
            />
        </div>
    );
}

export default App;
