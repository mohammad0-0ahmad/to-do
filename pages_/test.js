import Nav from "../client/components/Nav";
import Container from "../client/components/Container";
import { Grid } from "@material-ui/core";
import PeopleSection from "../client/components/Sections/PeopleSection";
import FriendsSection from "../client/components/Sections/FriendsSection";
import MainSection from "../client/components/Sections/MainSection";

const test = () => {
  return (
    <>
      <Nav />
      <Container pageContainer upperPadding>
        <Grid container spacing={4}>
          <PeopleSection />
          <MainSection />
          <FriendsSection />
        </Grid>
      </Container>
    </>
  );
};

export default test;
