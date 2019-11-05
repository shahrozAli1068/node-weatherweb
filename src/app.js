const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

// Define Path for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath= path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
 
// Setup handlebars engines and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "weather app",
        name: "shahroz ali"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Shahroz Ali"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpmsg: "what help do you need?",
        title:"Help",
        name: " Shahroz ali"
    })
})

app.get("/weatherapp", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "shahroz",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "shahroz",
        errorMessage: "Page not find."
    })
})

app.listen(3000, () => {
    console.log(" Server is up on port 3000.")
})