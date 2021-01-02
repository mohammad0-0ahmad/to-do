import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import PersonCard from '../Cards/PersonCard';
import { useUsers } from '../../context/UsersProvider';

//TODO: connect it with real data.
const PeopleSection = () => {
    const { people } = useUsers();
    return (
        <SectionBase>
            <SearchField label="Look for new friends" />
            {Object.entries(people).map((person) => (
                <PersonCard key={person[0]} {...person[1]} />
            ))}
            {/*<PersonCard
                src="https://randomuser.me/portraits/men/1.jpg"
                name="John Doe"
            />
            */}
        </SectionBase>
    );
};

export default PeopleSection;
