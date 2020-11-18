import Translate from "next-translate/Trans";


const Trans = ({ id }) => {
  return <Translate i18nKey={`common:${id}`} />;
};

export default Trans;
