import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { unsubscribeAll } from 'frontend/utilities';
import { createContext, useEffect } from 'react';

const StatusbarContext = createContext(null);

const StatusbarProvider = ({ children }) => {
    const theme = useTheme<Theme>();
    const isWeb = Capacitor.getPlatform() === 'web';
    useEffect(() => {
        const unsubscribeFunctions = isWeb ? [] : initializer();
        return unsubscribeAll(unsubscribeFunctions);
    }, []);

    useEffect(() => {
        !isWeb && updateStatusbarStyle(theme);
    }, [theme]);

    return (
        <StatusbarContext.Provider value={{}}>
            {children}
        </StatusbarContext.Provider>
    );
};

export default StatusbarProvider;

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
        const statusbarChecker = async () => {
            const { visible } = await StatusBar.getInfo();
            if (visible) {
                StatusBar.hide();
            }
        };
        document.addEventListener('click', statusbarChecker);
        unsubscribeFunctions.push(() => {
            document.removeEventListener('click', statusbarChecker);
        });
        return unsubscribeFunctions;
    } catch (error) {
        console.debug('statusbar error: ', error?.message);
        return unsubscribeFunctions;
    }
};

const iosInitializer: InitializerType = () => {};

const androidInitializer: InitializerType = () => {
    StatusBar.setOverlaysWebView({ overlay: false });
};

const updateStatusbarStyle: UpdateStatusbarStyleType = ({
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

type UpdateStatusbarStyleType = (theme: Theme) => void;

type InitializerType = () => (() => void)[] | void;
