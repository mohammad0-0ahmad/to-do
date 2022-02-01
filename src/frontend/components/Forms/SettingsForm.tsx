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
import { useProfile } from '../../providers/ProfileProvider';
import UserStatusPicker, {
    UserStatusPropsType,
} from '../Inputs/UserStatusPicker';
import { updateProfile } from '../../services/profiles';
import ColorModeSB from '../Inputs/ColorModeSB';
import LocalePicker from '../Inputs/LocalePicker';
import { useRouter } from 'next/router';
import { usePreferences } from '../../providers/PreferencesProvider';
import withSnackbarManager, {
    WithSnackbarManagerType,
} from '../../HOCs/withSnackbarManager';
import ConfirmationDialog from '../Dialogs/ConfirmationDialog';
import Tooltip from '../Tooltip';
import ReAuthDialog from '../Dialogs/ReAuthDialog';
import userStatus, { UserStatusType } from '../../constants/userStatus';

const SettingsForm: FC<SettingsFormPropsType> = ({ showSnackbar }) => {
    const classes = useStyles();
    const { push, pathname, asPath, query, locale } = useRouter();
    const {
        setPaletteType,
        palette: { type: paletteType },
    } = useTheme();
    const { updateLocalPreferences } = usePreferences();
    const [editMode, setEditMode] = useState(false);
    const [shouldReAuth, setShouldReAuth] = useState(0);
    const [isUpdateProfileDialogVisible, setIsUpdateProfileDialogVisible] =
        useState(false);
    const profile = useProfile();
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        status: userStatus.auto as UserStatusType,
        description: '',
        userName: '',
        email: '',
        photoURL: '',
        newPassword: '',
        newPasswordRepetition: '',
        newProfilePhoto: null,
        preferences: { paletteType, lang: locale },
    });

    useEffect(() => {
        setFormValues((current) => ({ ...current, ...profile }));
    }, [profile]);

    useEffect(() => {
        setFormValues((current) => ({
            ...current,
            preferences: { paletteType, lang: locale },
        }));
    }, [paletteType, locale]);

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
        profile.preferences.paletteType !== paletteType &&
            setPaletteType(profile.preferences.paletteType);

        profile.preferences.lang !== locale &&
            push({ pathname, query }, asPath, {
                locale: profile.preferences.lang,
            });

        updateLocalPreferences(profile.preferences);
        setShouldReAuth(0);
    };

    const hideUpdateProfileDialog = async () => {
        setIsUpdateProfileDialogVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            shouldReAuth !== 2 &&
            (formValues.newPassword !== '' ||
                formValues.email !== profile.email)
        ) {
            if (formValues.newPassword !== formValues.newPasswordRepetition) {
                showSnackbar({
                    status: 'error',
                    code: 'auth/password-repetition-does-not-match',
                });
                return;
            }
            setShouldReAuth(1);
        } else {
            setIsUpdateProfileDialogVisible(true);
        }
    };

    const handleProfileUpdate = async () => {
        hideUpdateProfileDialog();
        const newProfileData = { ...formValues };
        newProfileData.userName === profile.userName &&
            delete newProfileData.userName;
        const response = await updateProfile(newProfileData);
        showSnackbar(response);
        if (response.status === 'success') {
            updateLocalPreferences(formValues.preferences);
            setEditMode(false);
        }
        setFormValues((currentData) => {
            return response.status === 'error'
                ? {
                      ...profile,
                      newPassword: '',
                      newPasswordRepetition: '',
                      newProfilePhoto: null,
                  }
                : {
                      ...currentData,
                      newPassword: '',
                      newPasswordRepetition: '',
                      newProfilePhoto: null,
                  };
        });
        setShouldReAuth(0);
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
                        <Tooltip
                            titleTransId="SettingsForm.toolTips.label1"
                            backgroundColorPaletteVariable="warning"
                        >
                            <IconButton
                                className={classes.edit}
                                onClick={enableEditMode}
                            >
                                <Pen />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <>
                            <ConfirmationDialog
                                body={
                                    <Trans id="SettingsForm.dialogs.cancelProfileChanging" />
                                }
                                confirmButtonProps={{
                                    onClick: discardChanges,
                                }}
                            >
                                <Tooltip
                                    titleTransId="SettingsForm.toolTips.label2"
                                    backgroundColorPaletteVariable="error"
                                >
                                    <IconButton className={classes.cancel}>
                                        <Close />
                                    </IconButton>
                                </Tooltip>
                            </ConfirmationDialog>
                            <ConfirmationDialog
                                handleClose={hideUpdateProfileDialog}
                                open={isUpdateProfileDialogVisible}
                                body={
                                    <Trans id="SettingsForm.dialogs.confirmProfileChanging" />
                                }
                                confirmButtonProps={{
                                    onClick: handleProfileUpdate,
                                }}
                            />
                            <Tooltip
                                titleTransId="SettingsForm.toolTips.label3"
                                backgroundColorPaletteVariable="success"
                            >
                                <IconButton
                                    className={classes.save}
                                    type="submit"
                                >
                                    <Check />
                                </IconButton>
                            </Tooltip>
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
                        justifyContent="space-between"
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
                        <UserStatusPicker
                            className={classes.status}
                            disabled={!editMode}
                            onChange={handleStatusChange}
                            value={
                                formValues.status as UserStatusPropsType['value']
                            }
                        />
                    </Grid>
                    <Grid container justifyContent="space-between" spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                name="firstName"
                                label={<Trans id="SettingsForm.firstName" />}
                                value={formValues.firstName}
                                onChange={handleChange}
                                disabled={!editMode}
                                fullWidth
                                required
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
                                required
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
                        required
                    />
                    <TextField
                        name="email"
                        label={<Trans id="SettingsForm.email" />}
                        type="email"
                        value={formValues.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        required
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
                    <Grid container justifyContent="space-between">
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
            <ReAuthDialog
                open={shouldReAuth === 1}
                handleClose={(value) => {
                    setShouldReAuth(value !== undefined ? value : 2);
                }}
            />
            {!editMode && <div className={classes.blocker} />}
        </Paper>
    );
};

export default withSnackbarManager(SettingsForm);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type SettingsFormPropsType = WithSnackbarManagerType<{}>;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles(
    ({ palette: { primary, text, background, success, warning, error } }) => ({
        SettingsForm: {
            color: primary.main,
            backgroundColor: background.paper,
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
            color: warning.main,
            zIndex: 101,
        },
        cancel: {
            color: error.main,
        },
        save: {
            color: success.main,
        },
        blocker: {
            backdropFilter: 'saturate(0.6)',
            backgroundColor: text.secondary,
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
