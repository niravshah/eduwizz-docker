var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  sid: {type: String},
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstLogin: {type: Boolean, default: true},
  active: {type: Boolean, default: true},
  locked: {type: Boolean, default: false},
  group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
  permissions: {
    maths: {type: Boolean, default: false},
    chemistry: {type: Boolean, default: false},
    biology: {type: Boolean, default: false},
    physics: {type: Boolean, default: false},
    admin: {type: Boolean, default: false}
  }
})

userSchema.methods.hasMathsPerm = function () {
  return this.permissions.maths
}

userSchema.methods.canView = function (paper) {
  if (this.permissions.admin) {
    return true
  } else if (paper.isMaths()) {
    return this.permissions.maths
  } else if (paper.isPhysics()) {
    return this.permissions.physics
  } else if (paper.isChemistry()) {
    return this.permissions.chemistry
  } else if (paper.isBiology()) {
    return this.permissions.biology
  }
}

module.exports = mongoose.model('User', userSchema)

