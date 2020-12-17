import { createContext, useContext, useEffect, useState } from 'react';
import { getUserTasks } from '../services/tasks';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const unsubscribe = getUserTasks(setTasks);
        return unsubscribe;
    }, []);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export default TasksProvider;
export const useTasks = () => useContext(TasksContext);
