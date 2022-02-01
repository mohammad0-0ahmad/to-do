import { makeStyles, Tooltip as Org, TooltipProps } from '@material-ui/core';
import { Palette } from '@material-ui/core/styles/createPalette';
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

type PossibleColors = keyof Pick<
    Palette,
    'primary' | 'secondary' | 'success' | 'warning' | 'error'
>;

type TooltipPropsType = Omit<TooltipProps, 'title'> & {
    backgroundColorPaletteVariable?: PossibleColors;
    colorPaletteVariable?: PossibleColors;
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
    ({ palette: { primary, text, type, ...palette } }) => ({
        Tooltip: {
            '&>*': {
                //@ts-ignore
                color: ({ colorPaletteVariable }) =>
                    colorPaletteVariable
                        ? palette[colorPaletteVariable].main
                        : text.secondary,
                //@ts-ignore
                backgroundColor: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable].main
                        : primary.main,
                fontSize: 14,
            },
            '& span': {
                //@ts-ignore
                color: ({ backgroundColorPaletteVariable }) =>
                    backgroundColorPaletteVariable
                        ? palette[backgroundColorPaletteVariable].main
                        : primary.main,
            },
        },
    })
);
