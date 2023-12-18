import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import NewCommentForm from './NewCommentForm'; 


const Comments = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/comments/')
            .then(response => response.json())
            .then(data => {
                setComments(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    }, []);

    const updateComment = (id, newText) => {
        fetch(`http://localhost:8000/comments/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...comments.find(comment => comment.id === id), text: newText }),
        })
        .then(response => response.json())
        .then(data => {
            setComments(comments.map(comment => (comment.id === id ? data : comment)));
        })
        .catch(error => console.error('Error updating comment:', error));
    };

    const addNewComment = (text) => {
        const newComment = {
            text: text,
            author: 'Admin', // Replace with dynamic author if applicable
            date: new Date().toISOString(), // Format date as needed
            likes: 0 // Default likes count
        };

        fetch('http://localhost:8000/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
        .then(response => response.json())
        .then(data => {
            setComments([...comments, data]); // Add the new comment to the list
        })
        .catch(error => console.error('Error adding new comment:', error));
    };

    const deleteComment = (id) => {
        fetch(`http://localhost:8000/comments/${id}/`, {
            method: 'DELETE',
        })
        .then(() => {
            setComments(comments.filter(comment => comment.id !== id));
        })
        .catch(error => console.error('Error deleting comment:', error));
    };

    const likeComment = (id) => {
        const comment = comments.find(c => c.id === id);
        const updatedComment = { ...comment, likes: comment.likes + 1 };

        fetch(`http://localhost:8000/comments/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment),
        })
        .then(response => response.json())
        .then(data => {
            setComments(comments.map(c => c.id === id ? data : c));
        })
        .catch(error => console.error('Error updating comment:', error));
    };



    if (isLoading) {
        return <p>Loading comments...</p>;
    }

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} onUpdate={updateComment} onDelete={deleteComment} onLike={likeComment} />
                ))}
            </ul>
            <NewCommentForm onAddComment={addNewComment} />
        </div>
    );
}

export default Comments;
