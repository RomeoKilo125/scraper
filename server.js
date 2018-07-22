let express = require(`express`)
let bodyParser = require(`body-parser`)
let logger = require(`morgan`)
let mongoose = require(`mongoose`)
let cheerio = require(`cheerio`)
let request = require(`request`)
let axios = require(`axios`)

let app = express()

let db = require(`./models`)

const PORT = process.env.PORT || 3000

app.use(logger(`dev`))

app.use(bodyParser.urlencoded({
  extended: true
}))

// app.use(express.static(`public`))

mongoose.connect(`mongodb://localhost/mongoHeadlines`)

app.get(`/`, (req, res) => {
  axios.get(`https://www.nytimes.com/`).then(results => {

    let $ = cheerio.load(results.data)

    let resultArray = []

    $(`article.story`).each((i, elt) => {

      let headline = $(elt).children(`h2.story-heading`).text().trim()
      let byline = $(elt).children(`p.byline`).text().trim()
      let summary = $(elt).children().text().trim()
      let link = $(elt).children(`h2.story-heading`).children(`a`).attr(`href`)

      summary = summary.replace(headline, ``).replace(byline, ``).trim()

      let story = {
        headline: headline,
        byline: byline,
        summary: summary,
        link: link
      }

      if (headline !== `` && link !== ``) {
        db.Article.create(story)
        .then( dbArticle => console.log(dbArticle))
        .catch(err => res.json(err))
      }
    })

    // console.log(resultArray)
    res.json(resultArray)

  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
