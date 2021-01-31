import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import TaskGeneratorCard from '../Cards/TaskGeneratorCard';
import { useTasks } from '../../context/TasksProvider';

const MainSection = () => {
    const { tasks } = useTasks();
    return (
        <SectionBase justify="center">
            <TaskGeneratorCard />
            {Object.entries(tasks).map((task) => (
                <TaskCard key={task[0]} {...task[1]} />
            ))}
        </SectionBase>
    );
};

export default MainSection;
