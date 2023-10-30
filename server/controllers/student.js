const Student = require('../models/Student');

/* READ */
const getStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ username: req.params.username });
        if (!student) {
            throw 'Student not found';
        }
        res.json({ status: 'ok', data: student });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json({ status: 'ok', data: students });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

module.exports = {
    getStudent,
    getStudents,
}