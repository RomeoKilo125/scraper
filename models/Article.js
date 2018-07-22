let mongoose = require(`mongoose`)

let Schema = mongoose.Schema

let ArticleSchema = new Schema ({
  headline: {
    type: String,
    required: true
  },
  byline: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: `Comment`
    }
  ]
})

let Article = mongoose.model(`Article`, ArticleSchema)

module.exports = Article
