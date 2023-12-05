const cors = require("cors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const Memorystore = require('memorystore')(session);
const app = express();
global.__basedir = __dirname;

app.use(cors({

    origin: {CORS_URL}, //write CORS URL
    credentials: {true|false}
})); 

app.use(
    session({
        httpOnly: {true|false},
        secure: {true|false},
        secret: {COOKIE_SECRET}, //write secret string
        resave: {true|false},
        saveUninitialized: {true|false},
        store: new Memorystore({checkPeriod: {MEMORY_CHKPERIOD}}),
        name: {COOKIE_NAME},
        cookie: {
            httpOnly: {true|false},
            secure: {true|false},
            maxAge: {COOKIE_AGE} // write cookie vaild time
        }
    })
);

const initRoutes = require("./src/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'angular/dist/elf_demo'))); //FL
//app.use(express.static(path.join(__dirname, 'react/build'))); // substantiation only

initRoutes(app);
let port = {PORT}; //write server port
app.listen(port, () => {
	
});