/* const data = {};
data.employees = require('../model/employees.json'); */
// The Above still Works, there is just a better way with React in Mind

const data = {
    // Get The Employees from the model(data) folder
    employees: require('../model/employees.json'),
    // Setting the Data Equal to the 
    setEmployees: function (data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    res.json({
        "firstname" : req.body.firstname,
        "lastname": req.body.lastname
    });
};

const updateEmployee = (req, res) => {
    res.json({
        "firstname" : req.body.firstname,
        "lastname": req.body.lastname
    });
};

const deleteEmployee = (req, res) => {
    res.json({ "id": req.body.id});
};

const getEmployee = (req, res) => {
    res.json({ "id": req.params.id});
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}