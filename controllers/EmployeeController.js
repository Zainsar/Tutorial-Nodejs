const Employee = require("../models/Employee")

//Show The list of All Employee

const index = (req, res, next) => {
    if (req.query.page && req.query.limit) {
        Employee.paginate({}, { page: req.query.page, limit: req.query.limit })
            .then(response => {
                res.status(200).json({
                    response
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'An error occured!'
                })
            })
    }
    else {
        Employee.find()
            .then(response => {
                res.status(200).json({
                    response
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'An error occured!'
                })
            })
    }
}

// Single Employee
const show = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}


// Add Employee
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if (req.files) {
        let path = ''
        req.files.forEach(function (files, index, arr) {
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar = path
    }
    employee.save()
        .then(response => {
            res.json({
                message: 'Employee Added Successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

// Update Employee

const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, { $set: updatedData })
        .then(response => {
            res.json({
                message: 'EmployeData Updated Succesfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

// Delete Employee

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndDelete(employeeID)
        .then(response => {
            res.json({
                message: 'Employee Deleted Succesfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
}

module.exports = {
    index, show, store, update, destroy
}