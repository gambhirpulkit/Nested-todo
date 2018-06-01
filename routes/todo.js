var express = require('express');
var router = express.Router();

var model = require('../models/Todo');
var todo_m = model.Task;
var sub_todo_m = model.SubTask;

/* POST, UPDATE and DELETE a  task. */
router.route('/task')
    .post(function(req, res, next){
        var task_name = req.body.name;
        var priority = req.body.priority;
        todo_m.find({name: task_name, active: false}, function (err, data) {
           if (err){
               res.status(400).send(err);
           }
           else{
               if (data.length){
                   res.status(400).send({message:"Uncompleted task with the same name already exists"});
               }
               else{
                   var new_task = todo_m({
                       name: task_name,
                       priority: priority
                   });

                   new_task.save(function(err) {
                       if(err)
                       {
                           res.status(400).send(err);
                       }
                       else
                       {
                           res.status(400).send({message:"Task created"});
                       }

                   })
               }
           }
        });
    })
    .put(function (req, res, next) {
        var input = req.body;
        var id = input.id;
        var UpdateModel = {
            name: input.name,
            priority: input.priority,
            updated_at: Date.now()
        };
        var query = {_id: id};
        todo_m.findOneAndUpdate(query, UpdateModel, function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).send({message: "Task updated"});
            }
        })
    })
    .delete(function (req, res, next) {
        var id = req.body.id;
        todo_m.remove({_id: id}, function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            }
            else {
                res.status(200).send({message: "Task deleted"});
            }
        });
    });

/* GET list of tasks. */
router.route('/get_tasks')
    .get(function(req, res, next){
        todo_m.find()
            .exec(function (err, data) {
            if (err){
                res.status(400).send(err);
            }
            else{
                console.log(data)
                if (!data.length){
                    res.status(404).send({message:"Task doesn't exist"});
                }
                else{
                    res.status(200).send({data:data});
                }
            }
        });

    });

/* POST sub task. */
router.route('/sub_task')
    .post(function(req, res, next){
        var input = req.body;
        var id = input.id;
        var sub_task_name = input.name;
        var priority = input.priority;
        console.log()
        todo_m.findOneAndUpdate({_id: id}, {
            '$push': {
                'sub_task': {
                    name: sub_task_name,
                    priorities: priority
                }
            }
        },
        function (err, data) {
            if (err){
                res.status(400).send(err);
            }
            else{
                console.log(data);
                res.status(200).send({message: "Sub task added"});
            }
        })

    })
    .put(function (req, res, next) {
        var input = req.body;
        var id = input.id;
        var UpdateModel = {
            name: input.name,
            priority: input.priority,
            updated_at: Date.now()
        };
        var query = {_id: id};
        sub_todo_m.findOneAndUpdate(query, UpdateModel, function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                console.log(result);
                console.log(query);
                res.status(200).send({message: "Sub task updated"});
            }
        })
    });

/* Perform Update and delete on task. */
// router.route('/sub_task')
//     .post(function(req, res, next){
//         var id = req.body.id
//         var sub_task_name = req.body.name
//         todo_m.findOneAndUpdate({_id: id}, {
//                 '$push': {
//                     'sub_task': {
//                         task_name: sub_task_name,
//                     }
//                 }
//             },
//             function (err, data) {
//                 if (err){
//                     res.status(400).send(err);
//                 }
//                 else{
//                     res.status(200).send({message: "Sub task updated"});
//                 }
//             });
//
//     });


module.exports = router;
