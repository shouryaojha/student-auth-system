const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

// REGISTER
exports.register = async (req, res) => {
    const { name, email, password, course } = req.body;

    try {
        const userExists = await Student.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            course
        });

        res.status(201).json({
            _id: student._id,
            name: student.name,
            email: student.email,
            course: student.course,
            token: generateToken(student._id)
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });

        if (student && await bcrypt.compare(password, student.password)) {
            res.json({
                _id: student._id,
                name: student.name,
                email: student.email,
                course: student.course,
                token: generateToken(student._id)
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const student = await Student.findById(req.user.id);

        const isMatch = await bcrypt.compare(oldPassword, student.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(newPassword, salt);

        await student.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
    const { course } = req.body;

    try {
        const student = await Student.findById(req.user.id);

        student.course = course;
        await student.save();

        res.json({ message: "Course updated successfully", course });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};