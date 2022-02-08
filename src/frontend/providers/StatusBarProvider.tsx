import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { unsubscribeAll } from 'frontend/utilities';
import { createContext, useEffect } from 'react';

const StatusBarContext = createContext(null);

const StatusBarProvider = ({ children }) => {
    const theme = useTheme<Theme>();
    const isWeb = Capacitor.getPlatform() === 'web';

    useEffect(() => {
        const unsubscribeFunctions = isWeb ? [] : initializer();
        return unsubscribeAll(unsubscribeFunctions);
    }, []);

    useEffect(() => {
        !isWeb && updateStatusBarStyle(theme);
    }, [theme]);

    return (
        <StatusBarContext.Provider value={{}}>
            {children}
        </StatusBarContext.Provider>
    );
};

export default StatusBarProvider;

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

const initializer: InitializerType = () => {
    const unsubscribeFunctions = [];
    try {
        switch (Capacitor.getPlatform()) {
            case 'android':
                androidInitializer();
                break;
            case 'ios':
                iosInitializer();
                break;
        }
        StatusBar.hide();
        const statusBarChecker = async () => {
            const { visible } = await StatusBar.getInfo();
            if (visible) {
                StatusBar.hide();
            }
        };
        document.addEventListener('click', statusBarChecker);
        unsubscribeFunctions.push(() => {
            document.removeEventListener('click', statusBarChecker);
        });
    } catch (error) {
        console.debug('statusbar error: ', error?.message);
    }
    return unsubscribeFunctions;
};

const iosInitializer: InitializerType = () => {};

const androidInitializer: InitializerType = () => {
    StatusBar.setOverlaysWebView({ overlay: false });
};

const updateStatusBarStyle: UpdateStatusBarStyleType = ({
    palette: { primary, type },
}) => {
    StatusBar.setBackgroundColor({ color: primary.main });
    StatusBar.setStyle({
        style: type === 'dark' ? Style.Light : Style.Dark,
    });
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UpdateStatusBarStyleType = (theme: Theme) => void;

type InitializerType = () => (() => void)[] | void;
