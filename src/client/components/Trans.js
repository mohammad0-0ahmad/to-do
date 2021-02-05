import useTranslation from 'next-translate/useTranslation';
import { string, object, array } from 'prop-types';
import { cloneElement } from 'react';

const Trans = ({ id, values, components }) => {
    //TODO: Solve component as wrapper problem.
    const { t: tr } = useTranslation('common');
    let translatedResult = tr(id, { ...values });
    if (components.length) {
        const result = [];
        for (let i = 0; i < components.length; i++) {
            const splittedByOpeningTag = translatedResult.split(`<${i}>`);
            for (let j = 0; j < splittedByOpeningTag.length; j++) {
                if (splittedByOpeningTag[j].includes(`</${i}>`)) {
                    const splittedByClosingTag = splittedByOpeningTag[j].split(
                        `</${i}>`
                    );
                    splittedByClosingTag[0] !== undefined &&
                        result.push(
                            cloneElement(
                                components[i],
                                components[i].props,
                                splittedByClosingTag[0]
                            )
                        );
                    splittedByClosingTag[1] !== undefined &&
                        result.push(splittedByClosingTag[1]);
                } else {
                    splittedByOpeningTag[j] !== undefined &&
                        result.push(splittedByOpeningTag[j]);
                }
            }
        }
        translatedResult = result;
    }
    return <> {translatedResult} </>;
};

Trans.propTypes = {
    id: string,
    values: object,
    components: array,
};

Trans.defaultProps = {
    components: [],
};

export default Trans;
