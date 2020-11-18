import Head from "next/head";

const Seo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" type="image/png" href="./logo-dark.png" />
    </Head>
  );
};

export default Seo;
