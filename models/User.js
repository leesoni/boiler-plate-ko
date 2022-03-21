const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10


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

userSchema.pre('save', function(next) {
    var user = this;

    // 비밀번호를 바꿀때만 암호화 해야하므로 조건 추가
    if(user.isModified('password')) {
        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            // PlaintextPassword = user.password / hash:암호화된 비밀번호
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {

    // plainPassword: 1234567
    // 실제 비밀번호(plainPassword)와 암호화된 비밀번호 같은지 확인 필요
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err),
            cd(null, isMatch)
    })

}

const User = mongoose.model('User', userSchema)

module.exports = { User }