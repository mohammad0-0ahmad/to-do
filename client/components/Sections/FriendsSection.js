import SectionBase from "../SectionBase";
import SearchField from "../Inputs/SearchField";
import PersonCard from "../Cards/PersonCard";
//TODO: connect it with real data.
const FriendsSection = () => {
  return (
    <SectionBase justify="flex-end">
      <SearchField label="Find a friend" />
      <PersonCard
        src="https://randomuser.me/portraits/men/1.jpg"
        name="John Doe"
        alreadyFriend
        status="online"
      />
    </SectionBase>
  );
};

export default FriendsSection;
