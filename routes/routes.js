let express = require(`express`)
let router = express.Router()
let axios = require(`axios`)
let cheerio = require(`cheerio`)
let exphbs = require(`express-handlebars`)

let db = require(`../models`)

router.get(`/index`, (req, res) => {
  res.redirect(`/`)
})

router.get(`/`, (req, res) => {
  db.Article.find({})
    .then(articles => {

      articles[0] ? res.render(`index`, {
        articles
      }) : res.redirect(`/scrape`)

    })
    .catch(err => {
      res.json(err)
    })

})

router.get(`/saved`, (req, res) => {
  db.Article.find({
    saved: true
  }).then(articles => {

    articles[0] ? res.render(`saved`, {
      articles
    }) : res.redirect(`/`)

  }).catch(err => {
    res.json(err)
  })
})

router.get(`/scrape`, (req, res) => {
  // get document from nytimes
  axios.get(`https://www.nytimes.com/`).then(results => {

    let $ = cheerio.load(results.data)

    // find relevant information
    $(`article.story`).each(function(i, elt) {
      // parse pieces of articles
      let headline = $(elt).children(`h2.story-heading`).text().trim()
      let byline = $(elt).children(`p.byline`).text().trim()
      let summary = $(elt).children().text().trim()
      let link = $(elt).children(`h2.story-heading`).children(`a`).attr(`href`)
      summary = summary.replace(headline, ``).replace(byline, ``).trim()
      // assemble into an object
      let story = {
        headline: headline,
        byline: byline,
        summary: summary,
        link: link
      }
      // if all required information is present, push into database
      if (headline !== `` && link !== ``) {
        db.Article.updateOne({
            headline: story.headline
          }, story, {
            upsert: true
          })
          .then(dbArticle => {
            // console.log(dbArticle)
          })
          .catch(err => res.json(err))
      }
    })
    res.redirect('/')
  })
})

router.put(`/article/save/:id`, (req, res) => {
  db.Article.updateOne({
      _id: req.params.id
    }, {
      saved: true
    })
    .then(data =>
      res.json(data)
    )
    .catch(err =>
      res.json(err))
})

router.put(`/article/unsave/:id`, (req, res) => {
  db.Article.updateOne({
      _id: req.params.id
    }, {
      saved: false
    })
    .then(data =>
      res.json(data)
    )
    .catch(err =>
      res.json(err))
})


module.exports = router
