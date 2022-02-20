import React from 'react';

const TaskMinus = (props) => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M21.063 15L14.78 15 13 15 13 17 14.78 17 21.063 17 22 17 22 15zM4 7H15V9H4zM4 11H15V13H4zM4 15H11V17H4z"/>
        </svg>
    );
};

export default TaskMinus;
