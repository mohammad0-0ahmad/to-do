const TaskCheck = (props) => {
    return (
        <svg
            width="1.2em"
            height="1em"
            viewBox="0 0 50 50"
            fill="currentColor"
            {...props}
            transform="scale(1.4)"
        >
            <g>
                <path d="M31.25 12.5H6.25V16.6667H31.25V12.5Z" />
                <path d="M31.25 20.8333H6.25V25H31.25V20.8333Z" />
                <path d="M6.25 29.1667H22.9167V33.3334H6.25V29.1667Z" />
                <path d="M24.9817 31.3021L27.9284 28.3554L32.3473 32.7752L41.1863 23.9365L44.1325 26.8827L32.3473 38.6679L24.9817 31.3021Z" />
            </g>
        </svg>
    );
};

export default TaskCheck;
