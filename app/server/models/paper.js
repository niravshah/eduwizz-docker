var mongoose = require('mongoose')
var Schema = mongoose.Schema

var paperSchema = new Schema({
  sid: {type: String},
  name: {type: String, required: true},
  key: {type: String, required: true},
  subject: {type: String, required: true},
  topic: {type: String},
  description: {type: String},
  type: {type: String},
  questions: {type: String},
  time: {type: String},
  active: {type: Boolean, default: true}
})

paperSchema.methods.isMaths = function () {
  return this.subject === 'maths'
}

paperSchema.methods.isPhysics = function () {
  return this.subject === 'physics'
}

paperSchema.methods.isChemistry = function () {
  return this.subject === 'chemistry'
}

paperSchema.methods.isBiology = function () {
  return this.subject === 'biology'
}

module.exports = mongoose.model('Paper', paperSchema)

