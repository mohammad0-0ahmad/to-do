import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthProvider';
import Container from '../Container';
import Footer from '../Footer';
import Nav from '../Nav';
import { any } from 'prop-types';

const VisitorLayout = ({ children }) => {
    const { pathname: currentPath } = useRouter();
    const { isAuthenticated } = useAuth();

    const isNavVisible = () => {
        const pagesWithNav = ['/profile', '/404'];
        for (let i = 0; i < pagesWithNav.length; i++) {
            if (currentPath.startsWith(pagesWithNav[i])) {
                return true;
            }
        }
        return false;
    };

    return (
        <>
            {isNavVisible() && <Nav />}
            {!isAuthenticated ? (
                <Container pageContainer upperPadding>
                    {children}
                </Container>
            ) : (
                children
            )}
            <Footer />
        </>
    );
};

VisitorLayout.propTypes = {
    children: any,
};

export default VisitorLayout;
