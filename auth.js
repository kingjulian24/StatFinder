var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	secret = require('../secret');

passport.use(new LocalStrategy(
	{ passReqToCallback : true }, // allows us to pass back the entire request to the callback
	function(req, username, password, done) {
		if (username === secret.username && password === secret.password) {
			return done(null, {username: 'admin'});
		}

		return done(null, false, req.flash('loginMessage', 'Oops! Wrong username or password.'));
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	done(null, {username: username});
});

module.exports = passport;