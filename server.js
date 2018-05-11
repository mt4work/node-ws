const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear()
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var logStr = `${now} ${req.method} ${req.url}`;
    console.log(logStr);
    fs.appendFile('server.log', logStr + '\n');
    next();
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Hello World!!',
//        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    //    currentYear: new Date().getFullYear()
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
});

