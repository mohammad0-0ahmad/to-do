import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import { useTasks } from '../../providers/TasksProvider';
import NoContent from '../Cards/NoContent';

const MainSection = () => {
    const { tasks } = useTasks();
    const tasksArray = Object.entries(tasks || {});

    return (
        <SectionBase>
            <TaskCard variant="generator" />
            {tasksArray.length ? (
                tasksArray.map((task) => (
                    <TaskCard key={task[0]} {...task[1]} />
                ))
            ) : (
                <NoContent CustomMessageCode="MainSection.label1" />
            )}
        </SectionBase>
    );
};

export default MainSection;
