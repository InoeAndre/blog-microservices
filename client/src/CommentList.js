import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4001/posts/${postId}/comments`)
            .then(response => {
                setComments(response.data);
            });
    }, []);
    const renderedComments = comments.map(comment => (
        <li key={comment.id}>{comment.content}</li>
    ));
    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;
