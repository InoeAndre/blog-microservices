import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentCreate from "./CommentCreate";

const PostList = () => {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const response = await axios.get("http://localhost:4002/posts").catch(error => {
            console.log(error);
        });
        setPosts(response.data);
    };
    useEffect(() => {
        fetchPosts();
    }, []);
    const renderedPost = Object.entries(posts).map(([id, post]) => (
        <div
            key={id}
            className="card"
            style={{
                width: "30%",
                marginBottom: "20px"
            }}
        >
            <div
                className="card-body"
            >
                <h3>{post.title}</h3>
                <CommentList comments={post.comments} />
                <CommentCreate postId={id} />
            </div>
        </div>
    ));
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPost}
        </div>
    );
};

export default PostList;