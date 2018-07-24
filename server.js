let express = require(`express`)
let bodyParser = require(`body-parser`)
let logger = require(`morgan`)
let mongoose = require(`mongoose`)
let request = require(`request`)
let exphbs = require(`express-handlebars`)

let app = express()

const PORT = process.env.PORT || 3000

app.use(logger(`dev`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(`handlebars`, exphbs({defaultLayout: `main`}))
app.set(`view engine`, `handlebars`)

app.use(express.static(`public`))

mongoose.connect(`mongodb://localhost/mongoHeadlines`)

let routes = require(`./routes/routes.js`)

app.use(routes)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
