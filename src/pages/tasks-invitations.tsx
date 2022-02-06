import NoContent from 'frontend/components/Cards/NoContent';
import TaskInvitationCard from 'frontend/components/Cards/TaskInvitationCard';
import SectionBase from 'frontend/components/SectionBase';
import withRedirectionManger from 'frontend/HOCs/withRedirectionManger';
import { useTasks } from 'frontend/providers/TasksProvider';

const TasksInvitations = () => {
    const tasks = useTasks();
    const taskInvitations =
        tasks?.taskInvitations && Object.entries(tasks.taskInvitations);

    return (
        <SectionBase>
            {!taskInvitations?.length ? (
                <NoContent CustomMessageCode="tasks-invitations.label1" />
            ) : (
                taskInvitations.map(([taskId, props]) => {
                    return <TaskInvitationCard key={taskId} {...props} />;
                })
            )}
        </SectionBase>
    );
};

export default withRedirectionManger(TasksInvitations, { requireAuth: true });
