import { useState } from 'react';
import { Grid, makeStyles, IconButton } from '@material-ui/core';
import AvatarGroup from '../AvatarGroup';
import TextField from '../Inputs/TextField';
import Button from '../Inputs/Button';
import Trans from '../Trans';
import UserAvatar from '../UserAvatar';
import Plus from '../Svg/Plus';
import { createTask } from '../../services/tasks';

const useStyles = makeStyles(
    ({ palette: { transparent, color3, color4, color5, red, type } }) => ({
        TaskGenerator: {
            backgroundColor: color5[type],
            color: color4[type],
            maxWidth: 600,
            padding: 16,
            boxShadow: 'inset 0px 0px 5px rgba(0, 0, 0, 0.25)',
            borderRadius: 4,
            '& .MuiFormLabel-root': {
                fontSize: 18,
            },
        },
        bottomMargin: {
            marginBottom: 16,
        },
        avatarGroup: {
            width: 'fit-content',
        },
        participantsLabel: {
            color: transparent[type],
        },
        addParticipantButton: {
            color: color4[type],
        },
        cancelButton: {
            backgroundColor: red[type],
            color: color3[type],
            width: '100%',
        },
        createButton: {
            backgroundColor: color4[type],
            color: color3[type],
            width: '100%',
        },
    })
);

const TaskGenerator = () => {
    const classes = useStyles();
    const [formValues, setFormValues] = useState({
        privacy:'public',
        title: '',
        participants: [],
        date: '',
        startTime: '',
        endTime: '',
        description: '',
    });

    const handleChange = ({ target: { name, value } }) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = createTask(formValues);
        console.log(res);
    };

    const handleCancel = (e) => {
        setFormValues({
            privacy:'public',
            title: '',
            participants: [],
            date: '',
            startTime: '',
            endTime: '',
            description: '',
        });
    };

    return (
        <Grid container className={classes.TaskGenerator}>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    justify="space-between"
                    className={classes.bottomMargin}
                >
                    <Grid item xs={7}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                onChange={handleChange}
                                value={formValues.title}
                                variant="standard"
                                label={<Trans id="TaskGenerator.label1" />}
                                className={classes.bottomMargin}
                                fullWidth
                                required
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className={classes.participantsLabel}>
                                <Trans id="TaskGenerator.label2" />
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <AvatarGroup max={4}>
                                            {formValues.participants.map((particpant) => (
                                                <UserAvatar
                                                    radius={20}
                                                    key={particpant.id}
                                                    {...particpant}
                                                />
                                            ))}
                                        </AvatarGroup>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            className={
                                                classes.addParticipantButton
                                            }
                                        >
                                            <Plus />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </label>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <UserAvatar radius={50} owner />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomMargin}>
                    <Grid item xs={6}>
                        <TextField
                            value={formValues.date}
                            name="date"
                            onChange={handleChange}
                            variant="standard"
                            type="date"
                            label={<Trans id="TaskGenerator.label3" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    className={classes.bottomMargin}
                >
                    <Grid item xs={5}>
                        <TextField
                            value={formValues.startTime}
                            name="startTime"
                            onChange={handleChange}
                            variant="standard"
                            type="time"
                            label={<Trans id="TaskGenerator.label4" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            value={formValues.endTime}
                            name="endTime"
                            onChange={handleChange}
                            variant="standard"
                            type="time"
                            label={<Trans id="TaskGenerator.label5" />}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            required
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
                <Grid container className={classes.bottomMargin}>
                    <TextField
                        value={formValues.description}
                        name="description"
                        onChange={handleChange}
                        rows={6}
                        multiline
                        fullWidth
                        label={<Trans id="TaskGenerator.label6" />}
                        autoComplete="off"
                    />
                </Grid>
                <Grid container justify="space-between">
                    <Grid item xs={5}>
                        <Button className={classes.cancelButton} onClick={handleCancel}>
                            <Trans id="TaskGenerator.button1" />
                        </Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button type="submit" className={classes.createButton}>
                            <Trans id="TaskGenerator.button2" />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default TaskGenerator;
