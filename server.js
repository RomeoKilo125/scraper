let express = require('express')
let bodyParser = require('body-parser')
let logger = require('morgan')
let mongoose = require('mongoose')
let cheerio = require('cheerio')
let request = require('request')
let axios = require('axios')

let app = express()

const PORT = process.env.PORT || 3000

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  axios.get('https://www.nytimes.com/').then(results => {

    let $ = cheerio.load(results.data)

    $('article.story').each((i,elt) => {

      let headline = $(elt).children('h2 a').text()
      // let summary = $(elt p.summary).text()
      // let link = $(elt).children().attr()

      console.log(headline);

    })

    res.send('scrape complete')

  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
