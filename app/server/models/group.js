var mongoose = require('mongoose')
var Schema = mongoose.Schema

var groupSchema = new Schema({
  sid: {type: String},
  name: {type: String, required: true},
  description: {type: String},
  contactEmail: {type: String},
  contactPhone: {type: String},
  status: {type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE'}
})

module.exports = mongoose.model('Group', groupSchema)

