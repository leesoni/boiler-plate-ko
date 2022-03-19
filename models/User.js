const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    /* 관리자와 일반유저를 구분해서 관리하기 위해서 role 사용 */
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    /* tokenExp: token의 유효기간 */
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }