const mongoose = require('mongoose');
const schema = mongoose.Schema;

let ticketSchema = new schema({
    id: Number,
    request_by: String,
    request_for: String,
    service_offering: String,
    item: String,
    contact_type: String,
    status: String,
    assigned: String,
    category: String,
    symptom: String,
    impact: String,
    urgency: String,
    priority: String,
});

let Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;