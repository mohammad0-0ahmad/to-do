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
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
            />
        </Head>
    );
};

export default Seo;

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */
export type SeoPropsType = { title: string };
