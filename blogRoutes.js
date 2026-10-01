const express = require("express");

const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// CREATE BLOG
// POST /api/blogs
// ==========================================

router.post("/", authMiddleware, async (req, res) => {

    try {

        const {
            title,
            content,
            category,
            image
        } = req.body;

        if (!title || !content) {

            return res.status(400).json({
                message: "Title and content are required"
            });

        }

        const blog = await Blog.create({

            title,
            content,
            category: category || "Technology",
            image: image || "",
            author: req.userId

        });

        const createdBlog =
            await Blog.findById(blog._id)
                .populate(
                    "author",
                    "name email"
                );

        res.status(201).json({

            message: "Blog created successfully",

            blog: createdBlog

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET ALL BLOGS
// GET /api/blogs
// ==========================================

router.get("/", async (req, res) => {

    try {

        const blogs =
            await Blog.find()
                .populate(
                    "author",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });

        res.json({

            blogs

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// GET SINGLE BLOG
// GET /api/blogs/:id
// ==========================================

router.get("/:id", async (req, res) => {

    try {

        const blog =
            await Blog.findById(req.params.id)
                .populate(
                    "author",
                    "name email"
                );

        if (!blog) {

            return res.status(404).json({
                message: "Blog not found"
            });

        }

        res.json({
            blog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ==========================================
// DELETE BLOG
// DELETE /api/blogs/:id
// ==========================================

router.delete(
    "/:id",
    authMiddleware,
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
                    req.params.id
                );

            if (!blog) {

                return res.status(404).json({
                    message: "Blog not found"
                });

            }

            if (
                blog.author.toString() !==
                req.userId.toString()
            ) {

                return res.status(403).json({
                    message: "You can only delete your own blog"
                });

            }

            await Blog.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message:
                    "Blog deleted successfully"

            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }
);


module.exports = router;