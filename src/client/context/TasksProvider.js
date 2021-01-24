import { createContext, useContext, useEffect, useState } from 'react';
import { getUserTasks, getTaskInvitations } from '../services/tasks';
import { unsubscribeAll } from '../utils';

const TasksContext = createContext();

const TasksProvider = (props) => {
    const [tasks, setTasks] = useState({});
    const [taskInvitations, setTaskInvitations] = useState({});

    useEffect(() => {
        const unsubscribeUserTasks = getUserTasks(setTasks);
        const unsubscribeTasksInvitation = getTaskInvitations(
            setTaskInvitations
        );
        return unsubscribeAll([
            unsubscribeUserTasks,
            unsubscribeTasksInvitation,
        ]);
    }, []);

    return (
        <TasksContext.Provider {...props} value={{ tasks, taskInvitations }} />
    );
};

export default TasksProvider;
export const useTasks = () => useContext(TasksContext);
