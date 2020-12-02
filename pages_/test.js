import Nav from "../client/components/Nav";
import Container from "../client/components/Container";
import PersonCard from "../client/components/Cards/PersonCard";

const test = () => {
  return (
    <>
      <Nav />
      <Container pageContainer upperPadding>
        <PersonCard
          src="https://randomuser.me/portraits/men/1.jpg"
          name="John Doe"
        />
        <PersonCard
          src="https://randomuser.me/portraits/men/1.jpg"
          name="John Doe"
          alreadyFriend
          status="online"
        />
      </Container>
    </>
  );
};

export default test;
