import { makeStyles, Tooltip as Org, TooltipProps } from '@material-ui/core';
import Trans from './Trans';

const Tooltip: FC<TooltipPropsType> = ({
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

export default Tooltip;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type TooltipPropsType = Omit<TooltipProps, 'title'> & {
    backgroundColorPaletteVariable?: string;
    colorPaletteVariable?: string;
} & (
        | {
              titleTransId: string;
              title?: undefined;
          }
        | {
              titleTransId?: undefined;
              title: TooltipProps['title'];
          }
    );

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const useClasses = makeStyles(
    ({ palette: { color2, color4, type, ...palette } }) => ({
        Tooltip: {
            '&>*': {
                //@ts-ignore
                color: ({ colorPaletteVariable }) =>
                    colorPaletteVariable
                        ? palette[colorPaletteVariable][type]
                        : color2[type],
                //@ts-ignore
                backgroundColor: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable][type]
                        : color4[type],
                fontSize: 14,
            },
            '& span': {
                //@ts-ignore
                color: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable][type]
                        : color4[type],
            },
        },
    })
);
