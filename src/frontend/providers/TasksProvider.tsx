import { createContext, useContext, useEffect, useState } from 'react';
import { getUserTasks, getTaskInvitations } from '../services/tasks';
import { unsubscribeAll } from '../utilities';

const TasksContext = createContext(null);

const TasksProvider = (props) => {
    const [tasks, setTasks] = useState(null);
    const [taskInvitations, setTaskInvitations] = useState({});

    useEffect(() => {
        const unsubscribeUserTasks = getUserTasks(setTasks);
        const unsubscribeTasksInvitation =
            getTaskInvitations(setTaskInvitations);

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

export const useTasks: UseTasks = () => useContext(TasksContext);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
type UseTasks = () => {
    tasks: Record<TaskSchema['taskId'], TaskSchema>;
    taskInvitations: Record<TaskSchema['taskId'], TaskInvitationSchema>;
};
