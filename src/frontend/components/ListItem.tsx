import {
    ListItem as MuiListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    ExtendButtonBase,
    ListItemTypeMap,
} from '@material-ui/core';

const useStyles = makeStyles({
    ListItem: { minWidth: 250, padding: 16 },
    listItemIcon: {
        minWidth: 'auto',
        marginRight: 16,
        fontSize: 30,
        color: 'currentColor',
    },
    listItemText: {},
});

const ListItem: FC<ListItemPropsType> = ({ icon, label, ...props }) => {
    const classes = useStyles();

    return (
        <MuiListItem button className={classes.ListItem} {...props}>
            <ListItemIcon className={classes.listItemIcon}>{icon}</ListItemIcon>
            <ListItemText className={classes.listItemText}>
                {label}
            </ListItemText>
        </MuiListItem>
    );
};

export default ListItem;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type ListItemPropsType = ExtendButtonBase<
    ListItemTypeMap<{ button: true }, 'div'>
> & {
    icon: JSX.Element;
    label: string | JSX.Element;
};
