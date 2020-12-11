import SectionBase from '../SectionBase';
import SearchField from '../Inputs/SearchField';
import PersonCard from '../Cards/PersonCard';
//TODO: connect it with real data.
const PeopleSection = () => {
    return (
        <SectionBase>
            <SearchField label="Look for new friends" />
            <PersonCard
                src="https://randomuser.me/portraits/men/1.jpg"
                name="John Doe"
            />
        </SectionBase>
    );
};

export default PeopleSection;
