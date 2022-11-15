const router = require('express').Router();
const { User } = require('../../models');

 router.post('/signup', async (req, res) => {
    try {
        const userInfo = await User.create(req.body);

        req.session.save(() => {
        req.session.user_id = userInfo.user_id;
        req.session.loggedIn = true;
        res.status(200).json(userInfo);
    });

    } catch (err) {
        res.status(400).json(err);
    }
        });

router.post('/login', async (req, res) => {
            try {
                const userInfo = await User.findOne({ where: { username: req.body.username }});
                
                if (!userInfo)
                {
                    res
                    .status(400)
                    .json({ message: 'NOT FOUND'});

                    return;
                }
                
const correctPassword = await userInfo.checkPassword(req.body.password);

if (!correctPassword) {
    res
         .status(400)
         .json({ message: 'NOT FOUND'});
         return;

}
               req.session.save(() => {
                req.session.user_id = userInfo.user_id;
                req.session.loggedIn = true;
                res.json({ user: userInfo, message: 'Logged In'});
               });

            } catch (err) {
                res.status(400).json(err);
            }
               });

router.post('/logout', (req, res) => {
    
                if (req.session.loggedIn) {
                    req.session.destroy(() => {
                        res.status(204).end();
                    });

                } else {
                    res.status(404).end();
                }});

        module.exports = router;