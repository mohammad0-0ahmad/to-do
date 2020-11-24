import { useTheme } from "@material-ui/core";
import Head from "next/head";

const Seo = ({ title }) => {
  const {
    palette: { type },
  } = useTheme();
  const shownTitle = title ? `To-do | ${title}` : "To-do";

  return (
    <Head>
      <title>{shownTitle}</title>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={type === "dark" ? "./icon/dark-16.png" : "./icon/light-16.png"}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={type === "dark" ? "./icon/dark-32.png" : "./icon/light-32.png"}
      />
    </Head>
  );
};

export default Seo;
