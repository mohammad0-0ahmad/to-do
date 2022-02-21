import Head from 'next/head';

//TODO: add SEO tags.
const Seo: FC<SeoPropsType> = ({ title }) => {
    const shownTitle = title ? `To-do | ${title}` : 'To-do';

    return (
        <Head>
            <title>{shownTitle}</title>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1"
            />
            <link rel="shortcut icon" href="favicon.ico" />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/icons/icon-16x16.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/icons/icon-32x32.png"
            />
        </Head>
    );
};

export default Seo;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type SeoPropsType = { title: string };
