import { bool } from 'prop-types';

const Arrow = ({ up, ...props }) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 40 40"
            fill="currentColor"
            {...props}
            transform={up && 'rotate(180)'}
            style={{ transition: 'transform 300ms' }}
        >
            <path d="M20 22.9756L29.9219 13.0459C30.6562 12.3115 31.8438 12.3115 32.5703 13.0459C33.2969 13.7803 33.2969 14.9678 32.5703 15.7021L21.3281 26.9521C20.6172 27.6631 19.4766 27.6787 18.7422 27.0068L7.42188 15.71C7.05469 15.3428 6.875 14.8584 6.875 14.3818C6.875 13.9053 7.05469 13.4209 7.42188 13.0537C8.15625 12.3193 9.34375 12.3193 10.0703 13.0537L20 22.9756Z" />
        </svg>
    );
};

Arrow.propTypes = {
    up: bool,
};

export default Arrow;
