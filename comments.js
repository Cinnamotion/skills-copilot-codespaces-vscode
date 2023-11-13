// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route for comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create route for comments
app.post('/posts/:id/comments', (req, res) => {
    // Create random id
    const commentId = randomBytes(4).toString('hex');

    // Get content from body
    const { content } = req.body;

    // Get comments for post
    const comments = commentsByPostId[req.params.id] || [];

    // Add new comment to comments
    comments.push({ id: commentId, content });

    // Update comments
    commentsByPostId[req.params.id] = comments;

    // Send back
    res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
    console.log('Listening on 4001');
});