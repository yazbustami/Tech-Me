const path = require('path');
const express = require('express');
const session = require('express-session');
const ehb = require('express-handlebars');
const sequelize = require('./config/config');
const routes = require('./controllers');
const SequelizeStore = require('connect-session-equelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Secret Stuff',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
const hb = ehb.create({});
app.engine('handlebars', hb.engine);
app.set('view engine', 'handlebars');
app.use(express.jsom());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('listening at localhost'));
});
