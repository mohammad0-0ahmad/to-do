import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthProvider';
import Container from '../Container';
import Footer from '../Footer';
import Nav from '../Nav';

const VisitorLayout = ({ children }) => {
    const { pathname: currentPath } = useRouter();
    const { isAuthenticated } = useAuth();

    const isNavVisible = () => {
        const pagesWithNav = ['/profile'];
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

export default VisitorLayout;
