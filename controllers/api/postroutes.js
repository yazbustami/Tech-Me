const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require ('../../utils/auth');

 router.post('/', withAuth, async (req, res) => {
    try {
        const addNewPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(addNewPost);
    } catch (err) {
        res.status(400).json(err);
    }
        });

router.get('/:id', async (req, res) => {
            try {
                const postNewData = await Post.findByPk(req.params.id, {
                    include: [
                        User
                    ],
                });
    const newPost = postNewData.get({ plain: true });

    res.render('one-post', { newPost})
            }
            catch (err) {
                res.status(500).json(err);
            }
        });


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postNewData = await Project.destroy({
            where: {
                post_id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postNewData) {
            res.status(404).json({ message: 'NOT FOUND' });
            return;
        }
        res.status(200).json(postNewData);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

        module.exports = router;
