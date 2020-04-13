const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    birthday: {
        type: Date,
        default: new Date(),
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) 
                throw new Error('Email is invalid')
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) 
                throw new Error('Password cannot contain "password"')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'th5-5nd_1S-n16H+C0weR!!')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

// Returns user if credentials match
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user)
        throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
        throw new Error('Unable to login')

    return user
}

// Hash the password middleware
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }


    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User