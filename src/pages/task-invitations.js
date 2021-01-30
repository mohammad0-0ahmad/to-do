import TaskInvitationCard from '../client/components/Cards/TaskInvitationCard';
import SectionBase from '../client/components/SectionBase';
import withRedirectionManger from '../client/components/withRedirectionManger';
import { useTasks } from '../client/context/TasksProvider';
import { getServerSidePropsForNextTranslate } from '../client/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const TaskInvitations = () => {
    const tasks = useTasks();
    const taskInvitations =
        tasks?.taskInvitations && Object.entries(tasks.taskInvitations);

    return (
        <SectionBase>
            {taskInvitations &&
                Boolean(taskInvitations.length) &&
                taskInvitations.map(([taskId, { ...props }]) => {
                    return <TaskInvitationCard key={taskId} {...props} />;
                })}
        </SectionBase>
    );
};

export default withRedirectionManger(TaskInvitations, { requireAuth: true });
