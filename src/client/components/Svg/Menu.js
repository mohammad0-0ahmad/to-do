import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    Menu: {
        '& path': {
            transition: 'opacity 0.3s',
        },
    },
    hidden: { opacity: 0 },
});

const Menu = ({ open, ...props }) => {
    const classes = useStyles();
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            {...props}
            className={classes.Menu}
        >
            <path d="M4 4H8V8H4V4Z" fill="currentColor"></path>
            <path
                d="M4 10H8V14H4V10Z"
                fill="currentColor"
                className={open && classes.hidden}
            ></path>
            <path d="M8 16H4V20H8V16Z" fill="currentColor"></path>
            <path
                d="M10 4H14V8H10V4Z"
                fill="currentColor"
                className={open && classes.hidden}
            ></path>
            <path d="M14 10H10V14H14V10Z" fill="currentColor"></path>
            <path
                d="M10 16H14V20H10V16Z"
                fill="currentColor"
                className={open && classes.hidden}
            ></path>
            <path d="M20 4H16V8H20V4Z" fill="currentColor"></path>
            <path
                d="M16 10H20V14H16V10Z"
                fill="currentColor"
                className={open && classes.hidden}
            ></path>
            <path d="M20 16H16V20H20V16Z" fill="currentColor"></path>
        </svg>
    );
};

export default Menu;