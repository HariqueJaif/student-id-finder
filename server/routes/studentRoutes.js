const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Add a new student
router.post("/", async (req, res) => {
  try {
    const { studentId, name, department } = req.body;

    if (!studentId || !name || !department) {
      return res.status(400).json({
        message: "Student ID, name, and department are required",
      });
    }

    const existingStudent = await Student.findOne({ studentId });

    if (existingStudent) {
      return res.status(409).json({
        message: "A student with this ID already exists",
      });
    }

    const student = await Student.create({
      studentId,
      name,
      department,
    });

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
});

module.exports = router;