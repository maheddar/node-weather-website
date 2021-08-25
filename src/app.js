const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//DEFINE PATHS FOR EXPRESS CONFIG:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE:
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mohamed Aheddar'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mohamed Aheddar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a helpful text',
        title: 'Help',
        name: 'Mohamed Aheddar'
    });
});


app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: 'You nust provide an address'
        })
    }
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error });
            }

            res.send({
                Location: location,
                forecast: forecastData,
                address: address
                
            })
        })
    })
    
    // res.send({
    //     address: req.query.address,
    //     location: "Agadir",
    //     temperature: 29
    // });
});














app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found",
        name: "Mohamed Aheddar"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: "Mohamed Aheddar"
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
