import { Badge, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const Menu: FC<MenuPropsType> = ({
    open,
    counter = false,
    className,
    ...props
}) => {
    const classes = useStyles();
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            badgeContent={counter}
            classes={{ badge: classes.badge }}
            invisible={!counter}
        >
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                {...props}
                className={clsx(classes.Menu, {
                    className: Boolean(className),
                })}
            >
                <g>
                    <path d="M4 4H8V8H4V4Z" />
                    <path
                        d="M4 10H8V14H4V10Z"
                        className={clsx({ [classes.hidden]: open })}
                    />
                    <path d="M8 16H4V20H8V16Z" />
                    <path
                        d="M10 4H14V8H10V4Z"
                        className={clsx({ [classes.hidden]: open })}
                    />
                    <path d="M14 10H10V14H14V10Z" />
                    <path
                        d="M10 16H14V20H10V16Z"
                        className={clsx({ [classes.hidden]: open })}
                    />
                    <path d="M20 4H16V8H20V4Z" />
                    <path
                        d="M16 10H20V14H16V10Z"
                        className={clsx({ [classes.hidden]: open })}
                    />
                    <path d="M20 16H16V20H20V16Z" />
                </g>
            </svg>
        </Badge>
    );
};

export default Menu;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type MenuPropsType = {
    open: boolean;
    className?: string;
    counter?: number | false;
};
/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(({ palette: { error } }) => ({
    Menu: {
        '& path': {
            transition: 'opacity 0.3s',
        },
    },
    hidden: { opacity: 0 },
    badge: {
        backgroundColor: error.main,
        color: 'currentColor',
    },
}));
