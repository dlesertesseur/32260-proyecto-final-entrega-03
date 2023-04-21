import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import flash from 'express-flash';
import hbs from 'express-handlebars';
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import categoryRoute from "./routes/categories.route.js";
import productRoute from "./routes/products.route.js";
import sessionsRoute from "./routes/session.route.js";
import initializePassport from "./config/passport.config.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser"
import config from './config/config.js';

const mongoStore = MongoStore.create({
  mongoUrl: config.MONGO_URL,
  dbName: config.DB_NAME,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  ttl: 150
})

const app = express();
app.use(flash());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
  store: mongoStore,
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(cookieParser());

/*Inicializa la configuracion de passport */
initializePassport();

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(passport.initialize());
//app.use(passport.session());

app.use('/api/auth', authRoute);
app.use('/api/carts', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use("/api/sessions", sessionsRoute);
app.use("/api/user", userRoute);

app.use('/', (req, res) => {res.redirect("/api/auth/login")});

const httpServer = app.listen(config.PORT, () => {
  console.log(`Server running on port: ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log("Server error -> ", error));
