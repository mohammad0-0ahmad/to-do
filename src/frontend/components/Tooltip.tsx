import { makeStyles, Tooltip as Org } from '@material-ui/core';
import { string, any } from 'prop-types';
import Trans from './Trans';

const useClasses = makeStyles(
    ({ palette: { color2, color4, type, ...palette } }) => ({
        Tooltip: {
            '&>*': {
                color: ({ colorPaletteVariable }) =>
                    colorPaletteVariable
                        ? palette[colorPaletteVariable][type]
                        : color2[type],
                backgroundColor: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable][type]
                        : color4[type],
                fontSize: 14,
            },
            '& span': {
                color: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable][type]
                        : color4[type],
            },
        },
    })
);

const Tooltip = ({
    backgroundColorPaletteVariable,
    colorPaletteVariable,
    title,
    titleTransId,
    ...props
}) => {
    const classes = useClasses({
        backgroundColorPaletteVariable,
        colorPaletteVariable,
    });
    return (
        <Org
            placement="bottom"
            arrow
            interactive
            enterDelay={1500}
            classes={{ popper: classes.Tooltip }}
            title={titleTransId ? <Trans id={titleTransId} /> : title}
            {...props}
        />
    );
};

Tooltip.propTypes = {
    backgroundColorPaletteVariable: string,
    colorPaletteVariable: string,
    title: any,
    titleTransId: string,
};

export default Tooltip;
