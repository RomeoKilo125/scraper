let express = require(`express`)
let bodyParser = require(`body-parser`)
let logger = require(`morgan`)
let mongoose = require(`mongoose`)
let request = require(`request`)
let exphbs = require(`express-handlebars`)

let app = express()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/mongoHeadlines`
app.use(logger(`dev`))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.engine(`handlebars`, exphbs({defaultLayout: `main`}))
app.set(`view engine`, `handlebars`)

app.use(express.static(`public`))

mongoose.connect(MONGODB_URI)

let routes = require(`./routes/routes.js`)

app.use(routes)


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
