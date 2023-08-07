const mongoose = require('mongoose');
const schema = mongoose.Schema;

let KnowleadgeBaseSchema = new schema({
    _id: Number,
    title: String,
    knowledge: String
    
})

let KnowleadgeBase = mongoose.model('KnowledgeBase', KnowleadgeBaseSchema);

module.exports = KnowleadgeBase;