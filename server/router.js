const Authentication = require('./controllers/authenticate');
const Calculation = require('./controllers/calculate');
const passport = require('passport');
const passportService = require('./services/passport');

// Deny passport to create a cookie based sesstion (we use tokens instead of cookies)
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = (app) =>{
    app.get('/api/calcBusinessDays/allResults', requireAuth, Calculation.getAllResults);

    app.post('/api/calcBusinessDays/calculate', requireAuth , Calculation.processDifference);

    app.post('/api/getRate/calculate', requireAuth, Calculation.processRate)

    app.post('/signin', requireSignin, Authentication.signin);
    
    app.post('/signup', Authentication.signup);
    
}


