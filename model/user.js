const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    plan: {
        type: String,
        default: 'free',
    },
    favourite: {
        type: Array,
        default: [],
    },
    recentSearches: {
        type: Array,
        default: [],
    },
    refresh_token: {
        type: String,
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;