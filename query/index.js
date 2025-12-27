const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    }
    if (type === "CommentCreated") {
        const { id, content, postId } = data;
        posts[postId].comments.push({ id, content });
    }
    console.log(posts);
    res.send({ status: "OK" });
});

app.listen(4002, () => {
    console.log("Server started on port 4002");
});