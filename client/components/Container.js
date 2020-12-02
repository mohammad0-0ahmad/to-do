import { Box, Container as Org, makeStyles } from "@material-ui/core";
import { bool } from "prop-types";

const useStyles = makeStyles(({ palette: { color2, type } }) => ({
  Container: {
    backgroundColor: color2[type],
    minHeight: "100vh",
  },
  content: {
    paddingTop: ({ upperPadding }) => (upperPadding ? 70 : 0),
  },
}));

const Container = ({ children, upperPadding, pageContainer }) => {
  const classes = useStyles({ upperPadding });
  const content = (
    <Org maxWidth="xl" className={classes.content}>
      {children}
    </Org>
  );

  return pageContainer ? (
    <Box className={classes.Container}>{content}</Box>
  ) : (
    content
  );
};

Container.propTypes = {
  pageContainer: bool,
  upperPadding: bool,
};
Container.defaultProps = {
  pageContainer: false,
  upperPadding: false,
};

export default Container;
