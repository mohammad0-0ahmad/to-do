import { useRouter } from 'next/router';
import Container from '../Container';
import Footer from '../Footer';
import Nav from '../Nav';

const VisitorLayout: FC<PropsWithChildren<any>> = ({ children }) => {
    const { pathname: currentPath } = useRouter();

    const isNavVisible = (() => {
        const pagesWithNav = ['/profile', '/404'];
        for (let i = 0; i < pagesWithNav.length; i++) {
            if (currentPath.startsWith(pagesWithNav[i])) {
                return true;
            }
        }
        return false;
    })();

    return (
        <>
            {isNavVisible && <Nav />}
            <Container pageContainer upperPadding={isNavVisible}>
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default VisitorLayout;
