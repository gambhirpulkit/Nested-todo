var express = require('express');
var router = express.Router();

var model = require('../models/Todo');
var todo_m = model.Task;
var sub_todo_m = model.SubTask;

/* POST task. */
router.route('/task')
    .post(function(req, res, next){
        var task_name = req.body.name
        todo_m.find({task_name: task_name, active: false}, function (err, data) {
           if (err){
               res.status(400).send(err);
           }
           else{
               if (data.length){
                   res.status(400).send({message:"Uncompleted task with the same name already exists"});
               }
               else{
                   var new_task = todo_m({
                       task_name:task_name
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

    });

/* GET list of tasks. */
router.route('/get_tasks')
    .get(function(req, res, next){
        var task_name = req.body.name
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
        var id = req.body.id
        var sub_task_name = req.body.name
        todo_m.findOneAndUpdate({_id: id}, {
            '$push': {
                'sub_task': {
                    task_name: sub_task_name,
                }
            }
        },
        function (err, data) {
            if (err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send({message: "Sub task updated"});
            }
        });

    });

/* Perform Update and delete on task. */
router.route('/sub_task')
    .post(function(req, res, next){
        var id = req.body.id
        var sub_task_name = req.body.name
        todo_m.findOneAndUpdate({_id: id}, {
                '$push': {
                    'sub_task': {
                        task_name: sub_task_name,
                    }
                }
            },
            function (err, data) {
                if (err){
                    res.status(400).send(err);
                }
                else{
                    res.status(200).send({message: "Sub task updated"});
                }
            });

    });


module.exports = router;
