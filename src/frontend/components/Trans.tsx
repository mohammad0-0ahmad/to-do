import { cloneElement } from 'react';
import { useTranslation } from 'next-export-i18n';

//TODO: improve component
const Trans: FC<TransPropsType> = ({ id, values, components = [] }) => {
    const { t: tr } = useTranslation('common');
    let translatedResult: string = tr(id, values);
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
        //@ts-ignore
        translatedResult = result;
    }
    return <> {translatedResult} </>;
};

export default Trans;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type TransPropsType = {
    id: string;
    values?: Record<string, any>;
    components?: any[];
};
