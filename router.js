const express = require('express');
const Posts = require('./data/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    }
});
router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "The post information could not be retrieved.",
        });
    }
});
router.post('/', async (req, res) => {
    try {
        const post = await Posts.insert(req.body);
        if (!post.title || !post.contents) {
            res.status(201).json(post);
        } else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while saving the post to the database"
        })
    }
});
router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body)
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be modified."
        })
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id)
        if (count > 0) {
            res.status(200).json({
                message: 'Post has been deleted'
            })
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
});

module.exports = router;