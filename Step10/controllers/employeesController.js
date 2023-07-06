const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

// hier gibt es die MEthoden zum Handlen der REST API.  

const createNewEmployee = (req, res) => {
    const newEmployee = {
        // Creates new Employee, id is given by latest id or 1
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    // Throw Error if one of the names is not given
    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' });
    }
    // Giving the Response
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    // Find the Given Employee, if not response with Error
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    // If the Name is givem, update it
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    // Filtering for the Array without the given ID 
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // combine the 2 Arrays to one
    const unsortedArray = [...filteredArray, employee];
    // Sort array by ID
    data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    // response with the Data
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    // Find the Given Employee, if not response with Error
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    // Filter an Array without ID 
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    // Set the New Array to Data & response with Json of Data
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    // get Single Employee, Error if not there
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);
}
    
module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}