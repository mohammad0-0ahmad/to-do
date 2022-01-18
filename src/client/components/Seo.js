import Head from 'next/head';
import { string } from 'prop-types';

//TODO: add SEO tags.
const Seo = ({ title }) => {
    const shownTitle = title ? `To-do | ${title}` : 'To-do';

    return (
        <Head>
            <title>{shownTitle}</title>
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1,maximum-scale=1"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/images/16x16.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/images/32x32.png"
            />
        </Head>
    );
};

Seo.propTypes = {
    title: string,
};

export default Seo;
