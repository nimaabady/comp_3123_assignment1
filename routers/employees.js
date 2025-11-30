const express = require('express')
const crypto = require('crypto')
const mongoose = require('mongoose');
const employeeRouter = express.Router()



//didnt add id as its auto added by mongo
const employeeSchema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "position": String,
    "salary": Number,
    "date_of_joining": Date,
    "department": String,
    "created_at": Date,
    "updated_at": Date
});

const Employee = mongoose.model("Employee", employeeSchema);

employeeRouter.get('/employees', (req, res) => {
    Employee.find({})
        .then(employees => {
            res.status(200).send(employees)
        }).catch(err => {
            console.log("Error getting employees: ", err)
            res.status(500).json({
                "error": "Failed to get employees"
        })
    })
})

employeeRouter.post('/employees', (req, res) => {
    const {first_name, last_name, email, position,
           salary, date_of_joining, department} = req.body
    Employee.create({first_name: first_name, last_name: last_name, email: email,
        position: position, salary: salary, date_of_joining: date_of_joining, department: department
    }).then(employee => {
            console.log('Employee created: ', employee.first_name)
            res.status(201).json({
                "message": "Employee created successfully",
                "employee_id": employee._id
            })
    }).catch(err => {
        console.log("Error creating employee: ", err)
        res.status(500).json({
            "error": "Failed to add employee"
        })
    })
})

employeeRouter.get('/employees/:eid', (req, res) => {
    const employee_id = req.params.eid
    Employee.findById(employee_id)
        .then(employee => {
            res.status(200).send(employee)
        }).catch(err => {
            console.log("Error getting employee: ", err)
            res.status(500).json({
                "error": "Failed to get employee"
            })
        })
})

employeeRouter.get('/employees/search/department/:department', (req, res) => {
    const department_name = req.params.department
    Employee.find({department: department_name})
        .then(employees => {
            res.status(200).send(employees)
        }).catch(err => {
            console.log("Error getting employees by department: ", err)
            res.status(500).json({
                "error": "Failed to get employees by department"
            })
        })
})

employeeRouter.get('/employees/search/position/:position', (req, res) => {
    const position_name = req.params.position
    Employee.find({position: position_name})
        .then(employees => {
            res.status(200).send(employees)
        }).catch(err => {
            console.log("Error getting employees by position: ", err)
            res.status(500).json({
                "error": "Failed to get employees by position"
            })
        })
})

employeeRouter.put('/employees/:eid', (req, res) => {
    const employee_id = req.params.eid
    const updates = req.body
    if(updates != null) {
        Employee.findByIdAndUpdate(employee_id, {$set: updates}, { new: true, runValidators: true })
            .then(employee => {
                console.log(employee)
                res.status(200).send(employee)
            }).catch(err => {
                console.log("Error updating employee: ", err)
                res.status(500).json({
                    "error": "Failed to update employee"
                })
            })
    } else {
        res.status(500).json({
            "error": "request body empty"
        })
    }
})

employeeRouter.delete('/employees', (req, res) => {
    const employee_id = req.query.eid
    if(employee_id != null) {
        Employee.findByIdAndDelete(employee_id)
            .then(employee => {
                res.status(204).json({
                    "message": "Employee deleted succesfully"
                })
            }).catch(err => {
                console.log("Error deleting employee: ", err)
                res.status(500).json({
                    "error": "Failed to delete employee"
                })
            })
    } else {
        res.status(500).json({
            "error": "request id query empty"
        })
    }
})
module.exports = employeeRouter
