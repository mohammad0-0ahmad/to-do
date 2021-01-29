import useTranslation from 'next-translate/useTranslation';
import { string, object } from 'prop-types';

const Trans = ({ id, values }) => {
    //TODO: Solve component as wrapper problem.
    const { t: tr } = useTranslation('common');
    return <> {tr(id, { ...values })} </>;
};

Trans.propTypes = {
    id: string,
    values: object,
};

export default Trans;
