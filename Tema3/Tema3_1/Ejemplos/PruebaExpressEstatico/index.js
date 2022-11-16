const express = require('express');

let app = express();
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.redirect('/public/index.html');
});

app.listen(8080);