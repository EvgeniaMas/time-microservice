var express = require('express');
var app = express();
var moment = require('moment');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 3000));

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


app.get('/:time', function(req, res) {
    var unixVal = null;
    var natVal = null;
    if (moment(req.params.time, 'X', true).isValid()) {
        unixVal = parseInt(req.params.time);
        var date = new Date(unixVal * 1000);
        natVal = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    else if(moment(req.params.time, "MMMM D, YYYY", true).isValid() || moment(req.params.time, "MMMM D YYYY", true).isValid() || moment(req.params.time, "YYYY MMMM D", true).isValid() ||
    moment(req.params.time, "MMM D, YYYY", true).isValid() || moment(req.params.time, "MMM D YYYY", true).isValid() || moment(req.params.time, "YYYY MMM D", true).isValid()){
        unixVal = Date.parse(req.params.time)/1000;
        date = new Date(unixVal * 1000);
        natVal = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    res.json({ unix: unixVal, natural: natVal });
});


app.listen(app.get('port'), function() {
  console.log('Express server listening on port', app.get('port'));
});