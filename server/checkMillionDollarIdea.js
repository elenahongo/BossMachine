const checkMillionDollarIdea = (req, res, next) => {
    req.body.weeklyRevenue = Number(req.body.weeklyRevenue);
    revenue = req.body.weeklyRevenue 
    weeks = req.body.numWeeks
    let ideaWorth = weeks * revenue
    if ( ideaWorth > 1000000 || ideaWorth === 1000000) {
        next()
    } else {
        res.status(400).send('your idea isnt good enough')
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
