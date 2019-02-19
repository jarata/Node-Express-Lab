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
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
});
// router.put('/:id', async (req, res) => {
//
// });
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

//When the client makes a DELETE request to /api/posts/:id:
//
// If the post with the specified id is not found:
//
// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The post with the specified ID does not exist." }.
// If there's an error in removing the post from the database:
//
// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The post could not be removed" }.

module.exports = router;