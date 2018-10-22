const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise


const employeeSchema = new Schema({

    username: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: false },
    
    firstName: { type: String, required: false },
    lastName: { type: String, required: false},
    // email: { type: String, required: true },
    // password: { type: String, required: true }
    // phone: { type: Number, required: true },
    // address: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
    // title: { type: String, required: true, default: "Employee" },
    // hardSchedule: { type: Array, default: [false, false, false, false, false, false, false] },
    // currentSchedule: Array,
	// nextSchedule: Array
	
	schedules: [{
		type: Schema.Types.ObjectId,
		ref: 'Schedule'
	}]
})

// Define schema methods
employeeSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
employeeSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/empolyee.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/empolyee.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
