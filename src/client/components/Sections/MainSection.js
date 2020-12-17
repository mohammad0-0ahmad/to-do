import SectionBase from '../SectionBase';
import TaskCard from '../Cards/TaskCard';
import TaskGenerator from '../Forms/TaskGenerator';
import { useTasks } from '../../context/TasksProvider';
//TODO: connect it with real data.


const MainSection = () => {
    const { tasks } = useTasks();
    return (
        <SectionBase justify="center">
            <TaskGenerator />
            {Object.entries(tasks).map(task => <TaskCard key={task[0]} {...task[1]} />)}
            {/*<TaskCard
                title="title.."
                owner={{ image: 'https://randomuser.me/portraits/men/1.jpg' }}
                participants={[
                    { image: 'https://randomuser.me/portraits/men/2.jpg' },
                    { image: 'https://randomuser.me/portraits/men/3.jpg' },
                    { image: 'https://randomuser.me/portraits/men/4.jpg' },
                    { image: 'https://randomuser.me/portraits/men/5.jpg' },
                    { image: 'https://randomuser.me/portraits/men/6.jpg' },
                    { image: 'https://randomuser.me/portraits/men/7.jpg' },
                ]}
                date="2020/12/03"
                startTime="3.30"
                endTime="4.30"
                description="des..."
            />*/}
        </SectionBase>
    );
};

export default MainSection;
