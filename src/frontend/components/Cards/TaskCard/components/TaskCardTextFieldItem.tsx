import { Grid, Typography } from '@material-ui/core';
import TextField, {
    TextFieldPropsType,
} from 'frontend/components/Inputs/TextField';
import Trans from 'frontend/components/Trans';
import { WithTaskCardItemBasePropsType } from '../TaskCard';

const TaskCardTextFieldItem: FC<TaskCardTextFieldItemPropsType> = ({
    label,
    value,
    isEditMode = false,
    gridProps,
    ...props
}) => {
    if (isEditMode) {
        return (
            <Grid item {...gridProps}>
                <TextField
                    variant="standard"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    autoComplete="off"
                    label={<Trans id={label as string} />}
                    value={value}
                    {...props}
                />
            </Grid>
        );
    } else if (value) {
        return (
            <Grid item {...gridProps}>
                <Typography component="label" className="TaskCard-labels">
                    <Trans id={label} />
                </Typography>
                <Grid item xs={12} className="TaskCard-details">
                    <Typography component="div">{value}</Typography>
                </Grid>
            </Grid>
        );
    } else {
        return null;
    }
};

export default TaskCardTextFieldItem;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type TaskCardTextFieldItemPropsType = WithTaskCardItemBasePropsType<
    TextFieldPropsType & {
        label?: string;
    }
>;
