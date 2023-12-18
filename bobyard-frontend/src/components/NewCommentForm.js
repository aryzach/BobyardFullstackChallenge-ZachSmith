import React, { useState } from 'react';

const NewCommentForm = ({ onAddComment }) => {
    const [newCommentText, setNewCommentText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment(newCommentText);
        setNewCommentText(''); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Write your comment here..."
            />
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default NewCommentForm;
