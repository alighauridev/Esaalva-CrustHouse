const Employee = require('../models/EmployeeModel');

const employeeController = {};

// Create a new employee
employeeController.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Get all employees
employeeController.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Get an employee by ID
employeeController.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).send();
        }
        res.status(200).send(employee);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = employeeController;