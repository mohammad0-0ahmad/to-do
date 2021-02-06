import NoContent from '../client/components/Cards/NoContent';
import TaskInvitationCard from '../client/components/Cards/TaskInvitationCard';
import SectionBase from '../client/components/SectionBase';
import withRedirectionManger from '../client/components/withRedirectionManger';
import { useTasks } from '../client/context/TasksProvider';
import { getServerSidePropsForNextTranslate } from '../client/utilities';
export const getServerSideProps = getServerSidePropsForNextTranslate;

const TasksInvitations = () => {
    const tasks = useTasks();
    const taskInvitations =
        tasks?.taskInvitations && Object.entries(tasks.taskInvitations);

    return (
        <SectionBase>
            {!taskInvitations?.length ? (
                <NoContent CustomMessageCode="tasks-invitations.label1" />
            ) : (
                taskInvitations.map(([taskId, { ...props }]) => {
                    return <TaskInvitationCard key={taskId} {...props} />;
                })
            )}
        </SectionBase>
    );
};

export default withRedirectionManger(TasksInvitations, { requireAuth: true });
