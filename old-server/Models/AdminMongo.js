const mongoose = require('mongoose');
const schema = mongoose.Schema();

let adminSchema = new schema({

    username: String,
    password: String,
    email: String,
    phone: String,

})

let Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

