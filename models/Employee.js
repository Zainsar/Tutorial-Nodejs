const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mongoosepaginate = require("mongoose-paginate-v2")

const employeeschema = new Schema({
    name: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: Number
    },
    avatar: {
        type: String
    }
}, { timestamps: true })

employeeschema.plugin(mongoosepaginate)

const Employee = mongoose.model('Employee', employeeschema)
module.exports = Employee