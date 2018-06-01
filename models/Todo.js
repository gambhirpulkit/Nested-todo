
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todo');
var schema = mongoose.Schema;

var sub_task_schema = new schema({
    name:{
        type: String
    },
    active:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        default: 'medium',
        required: true
    },
    created_at:
        {
            type: Date,
            default: Date.now()
        },
    updated_at:
        {
            type:Date
        }
});

var task_schema = new schema({
    name:{
        type: String
    },
    active:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        default: 'medium',
        required: true
    },
    created_at:
        {
            type: Date,
            default: Date.now()
        },
    updated_at:
        {
            type:Date
        },
    sub_task: [sub_task_schema]

});


var Task = mongoose.model('task', task_schema);
var SubTask = mongoose.model('sub_task', sub_task_schema);

module.exports = {
    Task, SubTask
};