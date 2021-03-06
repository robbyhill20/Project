console.log('new')
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
console.log('new')
const routes = require('./controllers');
console.log('new')
const helpers = require('./utils/helpers');
console.log('new')
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
console.log("hi")
app.use(routes);
console.log("bye")
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening' + PORT));
});
