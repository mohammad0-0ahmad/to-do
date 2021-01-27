import { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Paper,
    IconButton,
    useTheme,
} from '@material-ui/core';
import TextField from '../Inputs/TextField';
import Check from '../Svg/Check';
import Close from '../Svg/Close';
import Pen from '../Svg/Pen';
import Trans from '../Trans';
import Divider from '../Divider';
import UserAvatar from '../UserAvatar';
import { useProfile } from '../../context/ProfileProvider';
import UserStatus from '../Inputs/UserStatus';
import { updateProfile } from '../../services/profiles';
import ColorModeSB from '../Inputs/ColorModeSB';
import LocalePicker from '../Inputs/LocalePicker';
import Router from 'next/router';
import { usePreferences } from '../../context/PreferencesProvider';

const useStyles = makeStyles(
    ({ palette: { color1, color4, color5, green, yellow, red, type } }) => ({
        SettingsForm: {
            color: color4[type],
            backgroundColor: color5[type],
            maxWidth: 600,
            position: 'relative',
        },

        controlBar: {
            padding: 4,
        },
        gridContainer: {
            padding: 16,
            paddingTop: 0,
            '&>*': {
                marginTop: 16,
            },
        },
        avatarInput: {
            display: 'none',
        },
        status: {
            marginTop: 16,
        },
        edit: {
            color: yellow[type],
            zIndex: 101,
        },
        cancel: {
            color: red[type],
        },
        save: {
            color: green[type],
        },
        blocker: {
            backdropFilter: 'saturate(0.6)',
            backgroundColor: color1[type],
            opacity: 0.02,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 100,
        },
    })
);
//TODO: Validation, preferred language and colorMode ,delete account, show feedback after changing setting.
const SettingsForm = () => {
    const classes = useStyles();
    const {
        palette: { type: paletteType },
    } = useTheme();
    const { updateLocalPreferences } = usePreferences();
    const [editMode, setEditMode] = useState(false);
    const profile = useProfile();
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        status: '',
        description: '',
        userName: '',
        email: '',
        photoURL: '',
        newPassword: '',
        newPasswordRepetition: '',
        newProfilePhoto: null,
        preferences: { paletteType, lang: Router.locale },
    });

    useEffect(() => {
        setFormValues((current) => ({ ...current, ...profile }));
    }, [profile]);

    useEffect(() => {
        setFormValues((current) => ({
            ...current,
            preferences: { paletteType, lang: Router.locale },
        }));
    }, []);

    const enableEditMode = () => {
        setEditMode(true);
    };

    const discardChanges = () => {
        setEditMode(false);
        setFormValues({
            ...profile,
            newPassword: '',
            newPasswordRepetition: '',
            newProfilePhoto: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(formValues);
        updateLocalPreferences(formValues.preferences);
        setEditMode(false);
        setFormValues((currentData) => ({
            ...currentData,
            newPassword: '',
            newPasswordRepetition: '',
            newProfilePhoto: null,
        }));
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleStatusChange = (value) => {
        setFormValues({ ...formValues, status: value });
    };
    const handleAvatarChange = ({ target: { files } }) => {
        if (files.length) {
            const newProfilePhoto = files[0];
            const src = URL.createObjectURL(newProfilePhoto);
            setFormValues({ ...formValues, photoURL: src, newProfilePhoto });
        }
    };

    return (
        <Paper elevation={4} className={classes.SettingsForm}>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="row-reverse"
                    className={classes.controlBar}
                >
                    {!editMode ? (
                        <IconButton
                            className={classes.edit}
                            onClick={enableEditMode}
                        >
                            <Pen />
                        </IconButton>
                    ) : (
                        <>
                            <IconButton
                                className={classes.cancel}
                                onClick={discardChanges}
                            >
                                <Close />
                            </IconButton>
                            <IconButton className={classes.save} type="submit">
                                <Check />
                            </IconButton>
                        </>
                    )}
                </Grid>
                <Divider />
                <Grid
                    container
                    direction="column"
                    className={classes.gridContainer}
                >
                    <Grid
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                    >
                        <label>
                            <input
                                type="file"
                                className={classes.avatarInput}
                                onChange={handleAvatarChange}
                                disabled={!editMode}
                            />
                            <UserAvatar
                                radius={100}
                                status={formValues.status}
                                photoURL={formValues.photoURL}
                                firstName={formValues.firstName}
                                lastName={formValues.lastName}
                                changeable={editMode}
                            />
                        </label>
                        <UserStatus
                            className={classes.status}
                            disabled={!editMode}
                            onChange={handleStatusChange}
                            value={formValues.status}
                        />
                    </Grid>
                    <Grid container justify="space-between" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name="firstName"
                                label={<Trans id="SettingsForm.firstName" />}
                                value={formValues.firstName}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                name="lastName"
                                label={<Trans id="SettingsForm.lastName" />}
                                value={formValues.lastName}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        name="description"
                        label={<Trans id="SettingsForm.description" />}
                        rows={3}
                        value={formValues.description}
                        onChange={handleChange}
                        disabled={!editMode}
                        multiline
                    />
                    <TextField
                        name="userName"
                        label={<Trans id="SettingsForm.userName" />}
                        value={formValues.userName}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                    <TextField
                        name="email"
                        label={<Trans id="SettingsForm.email" />}
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                    <TextField
                        name="newPassword"
                        label={<Trans id="SettingsForm.newPassword" />}
                        type="password"
                        value={formValues.newPassword}
                        autoComplete="off"
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                    <TextField
                        name="newPasswordRepetition"
                        label={
                            <Trans id="SettingsForm.newPasswordRepetition" />
                        }
                        type="password"
                        value={formValues.newPasswordRepetition}
                        autoComplete="off"
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                    <Grid container justify="space-between">
                        <LocalePicker
                            xs={6}
                            value={formValues.preferences.lang}
                        />
                        <ColorModeSB
                            value={formValues.preferences.paletteType}
                        />
                    </Grid>
                </Grid>
            </form>
            {!editMode && <div className={classes.blocker} />}
        </Paper>
    );
};

export default SettingsForm;
