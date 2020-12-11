import Translate from 'next-translate/Trans';
import { string } from 'prop-types';

const Trans = ({ id }) => {
    return <Translate i18nKey={`common:${id}`} />;
};

Trans.propTypes = {
    id:string
};

export default Trans;
