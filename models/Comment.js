let mongoose = require(`mongoose`)

let Schema = mongoose.Schema

let CommentSchema = new Schema ({
  content: {
    type: String,
    required: true
  }
})

let Comment = mongoose.model(`Comment`, CommentSchema)

module.exports = Comment
