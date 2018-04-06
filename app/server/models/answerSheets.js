var mongoose = require('mongoose')
var Schema = mongoose.Schema

var answerSheetSchema = new Schema({
  sid: {type: String, required: true},
  questionPaperId: {type: String, required: true},
  studentSid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  assessorSid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  keys: {type: [String]},
  correctedKeys: {type: [String]},
  status: {type: String, enum: ['NEW', 'CORRECTED'], default: 'NEW', required: true}

})

module.exports = mongoose.model('Answers', answerSheetSchema)
