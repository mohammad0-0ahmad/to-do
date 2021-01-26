import useTranslation from 'next-translate/useTranslation';
import { string } from 'prop-types';

const Trans = ({ id, ...props }) => {
    const { t: tr } = useTranslation('common');
    return <> {tr(id, { ...props })} </>;
};

Trans.propTypes = {
    id: string,
};

export default Trans;
