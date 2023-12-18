import React, { useState } from 'react';

const Comment = ({ comment, onUpdate, onDelete, onLike }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedText(comment.text); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(comment.id, editedText);
        setEditMode(false);
    };

    const handleDelete = () => {
        onDelete(comment.id);
    };

    const handleLike = () => {
        onLike(comment.id);
    };

    return (
        <li>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (
                <>
                    {comment.author}
                    <br />
                    {comment.text}
                    <button onClick={handleEdit}>Edit</button>
                    <br />
                    Likes: {comment.likes}
                    <br />
                    Date: {new Date(comment.date).toLocaleString()}
                </>
            )}
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleLike}>Like</button>
        </li>
    );
};

export default Comment;
