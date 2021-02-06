import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import TaskGeneratorCard from '../Cards/TaskGeneratorCard';
import { useTasks } from '../../context/TasksProvider';
import NoContent from '../Cards/NoContent';

const MainSection = () => {
    const { tasks } = useTasks();
    const tasksArray = Object.entries(tasks);
    return (
        <SectionBase>
            <TaskGeneratorCard />
            {tasksArray.length ? (
                tasksArray.map((task) => (
                    <TaskCard key={task[0]} {...task[1]} />
                ))
            ) : (
                <NoContent
                    CustomMessageCode="MainSection.label1"
                    minHeight="10vh"
                />
            )}
        </SectionBase>
    );
};

export default MainSection;
