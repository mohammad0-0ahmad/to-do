import { useMediaQuery, useTheme } from '@material-ui/core';
import NavBar from './NavBar';
import Drawer from './Drawer';

const Nav = () => {
    const { breakpoints } = useTheme();
    const smallScreen = useMediaQuery(breakpoints.down('xs'));
    return smallScreen ? <Drawer /> : <NavBar />;
};

export default Nav;
