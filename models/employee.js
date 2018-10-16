const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    points: { type: Number, required: true },
    title: { type: String, required: true, default: "Employee" },
    hardSchedule: { type: Array, default: [false, false, false, false, false, false, false] },
    currentSchedule: Array,
    nextSchedule: Array
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
