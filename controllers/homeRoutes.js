const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utls/auth');
const { newPost } = require('./api');

router.get('/', async (req, res) => {
    try {
        const postNewData = await Post.findAll({
            include: [User]
        });

        const newPost = postNewData.map(( newPost) => newPost.get({ plain: true }));
        res.render('all', { newPost });
    } catch (err) {
        res.status(500).json(err);
    }});

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
    const userNewPost = await Post.findAll({
        include: [{
            model: User
        }],
        where: {
            user_id: req.session.user_id
        }
    });

    const newPost = userNewPost.map((newPost) => newPost.get ({ plain: true }));

    res.render('all-data', {
        layout: 'dashboard'})
    });

    router.get('/signup', async (req, res) => {
        res.render('signup');
    });
module.exports = router;