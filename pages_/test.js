import Nav from "../client/components/Nav";
import Container from "../client/components/Container";
import PersonCard from "../client/components/Cards/PersonCard";
import TaskCard from "../client/components/Cards/TaskCard";
import TaskGenerator from "../client/components/Forms/TaskGenerator";
import { Grid } from "@material-ui/core";
import SearchField from "../client/components/Inputs/SearchField";

const test = () => {
  return (
    <>
      <Nav />
      <Container pageContainer upperPadding>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Container maxWidth="sm" disableGutters>
              <SearchField label="Look for new friends" />
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
                <TaskCard
                  title="title.."
                  owner={{ image: "https://randomuser.me/portraits/men/1.jpg" }}
                  participants={[
                    { image: "https://randomuser.me/portraits/men/2.jpg" },
                    { image: "https://randomuser.me/portraits/men/3.jpg" },
                    { image: "https://randomuser.me/portraits/men/4.jpg" },
                    { image: "https://randomuser.me/portraits/men/5.jpg" },
                    { image: "https://randomuser.me/portraits/men/6.jpg" },
                    { image: "https://randomuser.me/portraits/men/7.jpg" },
                  ]}
                  date="2020/12/03"
                  startTime="3.30"
                  endTime="4.30"
                  description="des..."
                />
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Container maxWidth="sm" disableGutters>
              <Grid container justify="flex-end">
                <SearchField label="Find a friend" />

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
