const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy
var GoogleStrategy = require('passport-google-oauth2')
const morgan = require('morgan')
const route = require('./routes/index')
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 5000

const db = require('./utils/mongoose')
const Users = require('./models/User');

var MiddlewareCheckLogin = require('./middlewares/checkLogin')
var MiddlewareCheckOut = require('./middlewares/checkLogout');
const router = require('./routes/home');

app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


app.use(morgan('combined'))

// Use Cors
app.use(cors())

// Connect DB
db.connect()

// Custome Middleware to parser req.body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(passport.initialize())

app.use(passport.session()); // req.session.user = profile

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (user.provider === 'google') {
        console.log(typeof user.id)
        Users.findOne({ authGoogleId: user.id })
            .then((user) => {
                return done(null, user)
            })
            .catch(err => done(err))
    } else {
        Users.findOne({ authFacebookId: user.id })
            .then((user) => {
                //console.log(user)
                return done(null, user)
            })
            .catch(err => done(err))
    }
});

// Đăng nhập bằng google
passport.use(new GoogleStrategy({
        clientID: '255813218760-vs1m4qc7hjmkqdc7etfi91mthlua3ooe.apps.googleusercontent.com',
        clientSecret: 'JsXx2jLcv44DKNhcEbBKNSFc',
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {
        //console.log(profile)
        //console.log(profile)
        const user = await Users.findOne({ authGoogleId: profile.id })
        if (user) return done(null, profile)

        // Tạo User
        const newUser = new Users({
            authGoogleId: profile.id,
            username: profile.displayName
        })
        newUser.save()
        return done(null, profile)
    }
));
app.get('/auth/google', MiddlewareCheckOut,
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        //successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }),
    function(req, res) {
        res.redirect('/private')
    });

// Đăng nhập bằng facebook
passport.use(new FacebookStrategy({
        clientID: '6195697313804323',
        clientSecret: '1e30d72ebfdcd23996657486dd37a828',
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async function(accessToken, refreshToken, profile, cb) {
        //console.log(profile)
        const user = await Users.findOne({ authFacebookId: profile.id })
        if (user) return cb(null, profile)

        // Tạo User
        const newUser = new Users({
            authFacebookId: profile.id,
            username: profile.displayName
        })
        newUser.save()
        return cb(null, profile)
    }
));
app.get('/auth/facebook', MiddlewareCheckOut,
    passport.authenticate('facebook'));


app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/private')
    });

// Đăng nhập bằng local
passport.use(new LocalStrategy(
    function(username, password, done) {
        Users.findOne({
                username: username,
                password: password
            })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                } else {
                    done(null, user)
                }
            })
            .catch(err => {
                done(err)
            })
    }
));

app.get('/login', MiddlewareCheckOut, (req, res, next) => {
    res.render('login')
})

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
        if (err) { return res.json('Loi Sever!'); }
        if (!user) {
            return res.render('login', {
                error: true
            })
        }
        try {
            var token = jwt.sign({ id: user._id }, 'mk')
            req.session.token = token
            res.redirect('/private')
        } catch (error) {
            return res.json('Loi Token')
        }
    })(req, res, next);
});

// Đăng xuất
app.get('/logout', (req, res, next) => {
    req.session.destroy()
    res.redirect('/login')
})

// Đăng kí
app.get('/dangky', (req, res, next) => {
    res.render('register')
})
app.post('/dangky', (req, res, next) => {
        var username = req.body.username
        var password = req.body.password
        var confirmPassword = req.body.confirmPassword
            // Logic kiem tra 2 password có giống nhau không.
        var compare = password.localeCompare(confirmPassword)
        if (compare === 0) {
            const user = new Users({
                username: username,
                password: password
            })
            user.save()
            res.redirect('/login')
        } else {
            res.render('register', {
                error: true
            })
        }
    })
    // Trang cá nhân
app.get('/private', MiddlewareCheckLogin, (req, res, next) => {
    //console.log(req.user)
    if (req.session.token) {
        //console.log(req.session)
        try {
            var data = jwt.verify(req.session.token, 'mk')
            Users.findById(data.id)
                .then(user => {
                    req.data = user
                    next()
                })
        } catch (error) {
            return res.json('Loi')
        }
    } else if (req.user) {
        next()
    }
}, (req, res, next) => {
    //console.log(req.data)
    res.render('private', {
        user: (req.data || req.user).toObject()
    })
})

app.get('/explore',MiddlewareCheckLogin,(req, res, next) => {
    //console.log(req.user)
    if (req.session.token) {
        //console.log(req.session)
        try {
            var data = jwt.verify(req.session.token, 'mk')
            Users.findById(data.id)
                .then(user => {
                    req.data = user
                    next()
                })
        } catch (error) {
            return res.json('Loi')
        }
    } else if (req.user) {
        next()
    }
},(req,res,next) => {
    res.render('explore')
})

app.get('/zingchart',MiddlewareCheckLogin,(req, res, next) => {
    //console.log(req.user)
    if (req.session.token) {
        //console.log(req.session)
        try {
            var data = jwt.verify(req.session.token, 'mk')
            Users.findById(data.id)
                .then(user => {
                    req.data = user
                    next()
                })
        } catch (error) {
            return res.json('Loi')
        }
    } else if (req.user) {
        next()
    }
},(req,res,next) => {
    res.render('zingchart')
})

// Custom path
route(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})