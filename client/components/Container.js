import { Box, Container as Org, makeStyles } from "@material-ui/core";
import { bool } from "prop-types";

const useStyles = makeStyles(({ palette: { color3, type } }) => ({
  Container: {
    backgroundColor: color3[type],
    minHeight: "100vh",
    "&>div": {
      height: "100vh",
    },
  },
}));

const Container = ({ children, pageContainer }) => {
  const Wrapper = pageContainer ? Box : React.Fragment;
  const classes = useStyles();
  return (
    <Wrapper className={classes.Container}>
      <Org>{children}</Org>
    </Wrapper>
  );
};

Container.propTypes = {
  pageContainer: bool,
};

export default Container;
