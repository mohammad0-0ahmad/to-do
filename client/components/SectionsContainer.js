import Container from './Container';
import { Grid } from '@material-ui/core';
import { oneOfType,element,arrayOf} from 'prop-types';

const SectionsContainer = ({children}) => {
    return (
        <Container pageContainer upperPadding>
            <Grid container spacing={4} >
                {children}
            </Grid>
        </Container>
    );
};

SectionsContainer.propTypes = {
    children:oneOfType([element,arrayOf(element)])
};

export default SectionsContainer;