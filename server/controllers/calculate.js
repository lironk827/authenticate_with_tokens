const User = require('../models/user');
const moment = require('moment');
const keys = require('../config/keys');
const Easypost = require('@easypost/api/');

function getDaysDifferece(startDateString, endDateString) {
    let startDate = moment(startDateString);
    let endDate = moment(endDateString);
    return Math.abs(startDate.diff(endDate, 'days'))
}

module.exports.processDifference = (req, res, next) => {
    let {startDateString, endDateString} = req.body;
    let difference = getDaysDifferece(startDateString, endDateString);
    let result = {startDateString, endDateString, difference}
    User.findOneAndUpdate({_id: req.user.id}, {$push: {results: result}}, ()=> {
        res.send({startDateString, endDateString, difference})
    });
}

module.exports.getAllResults = (req, res, next) => {
    User.find({_id: req.user.id}, (err, user)=> {
        res.send(user[0].results);
    });
}

module.exports.processRate = (req, res, next) => {
    const { toAddress, fromAddress, parcel } = req.body;
    const api = new Easypost(keys.easyPostKey);
    const shipment = new api.Shipment({
        to_address: toAddress,
        from_address: fromAddress,
        parcel        
    })
    
    shipment.save()
    .then( response => { 
        let rate = response.rates.filter( rate => {
            return rate.service === 'ParcelSelect'
        });
        res.send(rate[0].rate)
    })
}