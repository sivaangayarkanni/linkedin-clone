const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    maxlength: 300,
    default: ''
  },
  location: {
    type: String,
    maxlength: 100,
    default: ''
  },
  company: {
    type: String,
    maxlength: 100,
    default: ''
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  settings: {
    emailNotifications: { type: Boolean, default: true },
    profileVisibility: { type: String, enum: ['public', 'connections', 'private'], default: 'public' },
    showOnlineStatus: { type: Boolean, default: true },
    allowConnectionRequests: { type: Boolean, default: true }
  },
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);