import React from 'react';
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const TodoCards = ({ title, body, expanded, onExpandClick, updateTask, delid }) => {
    return (
        <div className='p-3 todo-cards' onClick={onExpandClick} style={{ cursor: "pointer" }}>
            <h5>{title}</h5>
            {expanded && <p className='todo-cards-p'>{body}</p>}
            <div className='card-icons d-flex justify-content-around mt-2'>
                <div
                    className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1'
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent expanding when updating
                        updateTask();
                    }}
                >
                    <GrDocumentUpdate className='card-icons' /> Update
                </div>
                <div
                    className='d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger'
                    onClick={(e) => {
                        e.stopPropagation();
                        delid();
                    }}
                >
                    <AiFillDelete className='card-icons del' /> Delete
                </div>
            </div>
        </div>
    );
};

export default TodoCards;
