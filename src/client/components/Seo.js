import Head from 'next/head';
import { string } from 'prop-types';

//TODO: add SEO tags.
const Seo = ({ title }) => {
    const shownTitle = title ? `To-do | ${title}` : 'To-do';

    return (
        <Head>
            <title>{shownTitle}</title>
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

Seo.propTypes = {
    title: string,
};

export default Seo;
