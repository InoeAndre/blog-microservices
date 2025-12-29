const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const events = [];

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    }
    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }
    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const comments = posts[postId].comments;
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
    }
}

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {

    res.send(events);
});

app.listen(4002, async () => {
    console.log("Server started on port 4002");

    const events = await axios.get("http://localhost:4005/events");
    events.data.forEach(event => {
        console.log("Processing event:", event.type);
        handleEvent(event.type, event.data);
    });
});
