import Nav from "../client/components/Nav";
import Container from "../client/components/Container";
import PersonCard from "../client/components/Cards/PersonCard";
import TaskGenerator from "../client/components/Forms/TaskGenerator";
import { Grid } from "@material-ui/core";

const test = () => {
  return (
    <>
      <Nav />
      <Container pageContainer upperPadding>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Container maxWidth="sm" disableGutters>
              <PersonCard
                src="https://randomuser.me/portraits/men/1.jpg"
                name="John Doe"
              />
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Container maxWidth="sm" disableGutters>
              <Grid container justify="center">
                <TaskGenerator />
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Container maxWidth="sm" disableGutters>
              <Grid container justify="flex-end">
                <PersonCard
                  src="https://randomuser.me/portraits/men/1.jpg"
                  name="John Doe"
                  alreadyFriend
                  status="online"
                />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default test;
