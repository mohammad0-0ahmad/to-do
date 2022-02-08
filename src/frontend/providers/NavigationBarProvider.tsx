import { Capacitor } from '@capacitor/core';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { Theme } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { unsubscribeAll } from 'frontend/utilities';
import { createContext, useEffect } from 'react';

const NavigationBarContext = createContext(null);

const NavigationBarProvider = ({ children }) => {
    const theme = useTheme<Theme>();
    const isWeb = Capacitor.getPlatform() === 'web';

    useEffect(() => {
        const unsubscribeFunctions = isWeb ? [] : initializer();
        return unsubscribeAll(unsubscribeFunctions);
    }, []);

    useEffect(() => {
        !isWeb && updateNavigationBarStyle(theme);
    }, [theme]);

    return (
        <NavigationBarContext.Provider value={{}}>
            {children}
        </NavigationBarContext.Provider>
    );
};

export default NavigationBarProvider;

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

const initializer: InitializerType = () => {
    const unsubscribeFunctions = [];
    try {
        NavigationBar.setTransparency({ isTransparent: false });
        NavigationBar.hide();
        const navigationBarChecker = () => {
            NavigationBar.hide();
        };
        document.addEventListener('click', navigationBarChecker);

        unsubscribeFunctions.push(() => {
            document.removeEventListener('click', navigationBarChecker);
        });
    } catch (error) {
        console.debug('statusbar error: ', error?.message);
    }
    return unsubscribeFunctions;
};

const updateNavigationBarStyle: UpdateNavigationBarStyleType = ({
    palette: { primary, type },
}) => {
    NavigationBar.setColor({
        color: primary.main,
        darkButtons: type === 'dark',
    });
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type UpdateNavigationBarStyleType = (theme: Theme) => void;

type InitializerType = () => (() => void)[] | void;
