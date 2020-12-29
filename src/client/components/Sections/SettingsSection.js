import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import SettingsForm from '../Forms/SettingsForm';
import TextField from '../Inputs/TextField';
import SectionBase from '../SectionBase';

const useStyles = makeStyles(({ palette: { color1, color4, type } }) => ({
    avatar: {
        border: `4px solid ${color4[type]}`,
        backgroundColor: color4[type],
        borderRadius: '50%',
        width: 250,
        height: 250,
    },
    name: {
        color: color4[type],
        paddingTop: 16,
        paddingBottom: 16,
    },
    description: {
        color: color1[type],
        paddingBottom: 16,
    },
}));

const SettingsSection = () => {
    const classes = useStyles();

    return (
        <SectionBase>
            <SettingsForm />
        </SectionBase>
    );
};

export default SettingsSection;
