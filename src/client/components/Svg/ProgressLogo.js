import { Grid, makeStyles } from '@material-ui/core';
import { string, number } from 'prop-types';

const useStyles = makeStyles(({ palette: { color4, type, ...palette } }) => ({
    ProgressLogo: {
        height: '100vh',
        fontSize: ({ fontSize }) => (fontSize ? fontSize : 300),
        backgroundColor: ({ backgroundColor }) =>
            backgroundColor
                ? palette[backgroundColor][type]
                : palette.color2[type],
    },
    logoPart: { fill: color4[type] },
    mask: {
        fill: ({ backgroundColor }) =>
            backgroundColor
                ? palette[backgroundColor][type]
                : palette.color2[type],
    },
}));

const ProgressLogo = ({ backgroundColor, fontSize }) => {
    const classes = useStyles({ backgroundColor, fontSize });
    const commonAnimateSettings = { dur: '2s', repeatCount: 'indefinite' };
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.ProgressLogo}
        >
            <svg viewBox="0 0 337.2 97.4" width="1em" height="1em">
                <g>
                    <rect
                        id="T"
                        x="8.5"
                        y="8.7"
                        className={classes.logoPart}
                        width="72"
                    >
                        <animate
                            attributeName="height"
                            values="0;80;0"
                            {...commonAnimateSettings}
                        />
                        <animate
                            attributeName="y"
                            values="45.35;8.7;45.35"
                            {...commonAnimateSettings}
                        />
                    </rect>
                    <rect
                        x="60"
                        y="26"
                        width="25"
                        height="65"
                        className={classes.mask}
                    />
                    <rect
                        id="O"
                        x="62.5"
                        y="33.5"
                        className={classes.logoPart}
                        width="61.4"
                    >
                        <animate
                            attributeName="height"
                            values="0;55.2;0"
                            begin="200ms"
                            {...commonAnimateSettings}
                        />
                        <animate
                            attributeName="y"
                            values="55.35;33.5;55.35"
                            begin="200ms"
                            {...commonAnimateSettings}
                        />
                    </rect>
                    <rect
                        id="dash"
                        x="134.8"
                        y="55"
                        className={classes.logoPart}
                        width="48"
                    >
                        <animate
                            attributeName="height"
                            values="0;12;0"
                            begin="400ms"
                            {...commonAnimateSettings}
                        />
                        <animate
                            attributeName="y"
                            values="61;55;61"
                            begin="400ms"
                            {...commonAnimateSettings}
                        />
                    </rect>
                    <rect
                        id="D"
                        x="194.3"
                        y="8.7"
                        className={classes.logoPart}
                        width="61.4"
                    >
                        <animate
                            attributeName="height"
                            values="0;80;0"
                            begin="600ms"
                            {...commonAnimateSettings}
                        />
                        <animate
                            attributeName="y"
                            values="48.7;8.7;48.7"
                            begin="600ms"
                            {...commonAnimateSettings}
                        />
                    </rect>
                    <rect
                        id="OO"
                        x="267.2"
                        y="33.5"
                        className={classes.logoPart}
                        width="61.4"
                    >
                        <animate
                            attributeName="height"
                            values="0;55.2;0"
                            begin="800ms"
                            {...commonAnimateSettings}
                        />
                        <animate
                            attributeName="y"
                            values="61.1;33.5;61.1"
                            begin="800ms"
                            {...commonAnimateSettings}
                        />
                    </rect>
                </g>
                <path
                    className={classes.mask}
                    d="M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3c-0.7,0.2-1.3,0.6-1.9,1.1
   c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9c0.5,0.5,1.2,0.9,1.9,1.1
   c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9
   c0.5,0.5,1.2,0.9,1.9,1.1c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9
   c0.5,0.5,1.2,0.9,1.9,1.1c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9
   c0.5,0.5,1.2,0.9,1.9,1.1c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z M0,0v97.4h337.2V0H0z M51.3,88.7H37.9V22H8.5V8.7h72V22H51.3V88.7z M123.9,70
   c0,2.1-0.3,4.2-0.9,6.2c-0.5,1.7-1.3,3.3-2.3,4.8c-0.9,1.4-2,2.5-3.3,3.5c-1.2,1-2.6,1.7-4,2.4c-1.3,0.6-2.8,1.1-4.2,1.4
   c-1.4,0.3-2.8,0.4-4.1,0.4h-24c-2,0-4.1-0.3-6-0.8c-2.2-0.7-4.3-1.8-6.1-3.2c-1.9-1.6-3.5-3.6-4.6-5.8c-1.3-2.7-2-5.7-1.9-8.7v-18
   c0-0.2,0-0.3,0-0.5V33.5h42.6c3-0.1,6,0.5,8.7,1.7c2.3,1.1,4.2,2.7,5.8,4.6c1.4,1.8,2.5,3.9,3.2,6.1c0.7,2,1,4,1.1,6.1
   C123.9,52,123.9,70,123.9,70z M182.8,67h-48V55h48V67z M255.7,70c0,2.1-0.3,4.2-0.9,6.2c-0.5,1.7-1.3,3.3-2.3,4.8
   c-0.9,1.3-2,2.5-3.3,3.5c-1.2,1-2.6,1.7-4,2.4c-1.3,0.6-2.8,1.1-4.2,1.4c-1.3,0.3-2.7,0.4-4,0.4h-24c-2.1,0-4.2-0.3-6.2-0.9
   c-1.7-0.5-3.3-1.3-4.8-2.3c-1.3-0.9-2.5-2.1-3.5-3.3c-0.9-1.2-1.7-2.6-2.4-4c-0.6-1.3-1.1-2.8-1.3-4.2c-0.3-1.3-0.4-2.5-0.4-3.8
   v-18c-0.1-3,0.5-6,1.9-8.7c1.1-2.1,2.6-4,4.4-5.6c1.8-1.5,4-2.7,6.3-3.4c2-0.6,4-1,6.1-1h24v13.2h-23.9c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.5,0.5-0.9,1.2-1.1,1.8c-0.2,0.7-0.3,1.4-0.3,2.1v17.9c-0.1,1.5,0.4,3,1.3,4.1c1.1,1,2.5,1.5,4,1.4h24
   c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c1-1.1,1.4-2.5,1.3-4V8.9h13.3L255.7,70L255.7,70z M326.6,78.7
   c-1.1,2.2-2.7,4.2-4.6,5.8c-1.8,1.5-3.9,2.5-6.1,3.2c-2,0.6-4,0.9-6,1h-24c-1.3,0-2.6-0.2-3.9-0.4c-1.5-0.3-2.9-0.7-4.2-1.4
   c-1.4-0.6-2.8-1.4-4-2.4c-1.3-1-2.4-2.2-3.3-3.5c-1-1.5-1.8-3.1-2.3-4.8c-0.6-2-0.9-4.1-0.9-6.2V52c0-2.1,0.4-4.1,1-6.1
   c0.7-2.2,1.8-4.3,3.2-6.1c1.5-1.9,3.5-3.4,5.7-4.5c2.7-1.3,5.7-1.9,8.7-1.8h42.6v18c0,0.2,0,0.3,0,0.5v18
   C328.6,73,328,76,326.6,78.7z M312,46.9c-0.7-0.2-1.4-0.3-2.2-0.3H286c-1.5-0.1-2.9,0.4-4,1.3c-0.5,0.6-0.9,1.2-1.1,1.9
   s-0.3,1.5-0.3,2.2l-0.1,17.9c-0.1,1.5,0.4,2.9,1.3,4c0.6,0.5,1.2,0.9,1.9,1.1s1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3
   s1.3-0.6,1.9-1.1c0.5-0.5,0.8-1.2,1.1-1.9c0.2-0.7,0.3-1.4,0.3-2.1v-18c0-0.2,0-0.3,0-0.5c0-1.3-0.5-2.6-1.4-3.5
   C313.4,47.5,312.7,47.1,312,46.9z M109.1,48c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3c-0.7,0.2-1.3,0.6-1.9,1.1
   c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9c0.5,0.5,1.2,0.9,1.9,1.1
   c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4V52.2c0.1-0.8,0-1.5-0.3-2.2
   C110,49.2,109.6,48.6,109.1,48z M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9
   c0.5,0.5,1.2,0.9,1.9,1.1c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z M110.2,50c-0.2-0.7-0.6-1.4-1.1-1.9c-1.1-1-2.5-1.4-4-1.3h-24c-0.7,0-1.5,0-2.2,0.3
   c-0.7,0.2-1.3,0.6-1.9,1.1c-0.9,1-1.4,2.2-1.4,3.5c0,0.2,0,0.3,0,0.5v18c0,0.7,0.1,1.5,0.3,2.1c0.2,0.7,0.6,1.3,1.1,1.9
   c0.5,0.5,1.2,0.9,1.9,1.1c0.7,0.2,1.4,0.3,2.2,0.3h24c0.7,0,1.5,0,2.2-0.3c0.7-0.2,1.3-0.6,1.9-1.1c0.9-1.1,1.4-2.5,1.2-4v-18
   C110.5,51.4,110.4,50.7,110.2,50z"
                />
            </svg>
        </Grid>
    );
};

ProgressLogo.propTypes = { backgroundColor: string, fontSize: number };

export default ProgressLogo;
