import CollegeId from "../../models/admin/CollegeId.js";
import User from "../../models/User.js";
import Student from "../../models/admin/Students/Student.js";
import asyncErrorHandler from "../../middlewares/asyncErrorHandler.js";
import ErrorHandler from "../../utils/ErrorHandler.js";

/* ------------------------------------------------------------------------------- */

export const createNewStudent = asyncErrorHandler(async (req, res, next) => {
  const { regd } = req.body;

  const isStudentRegistered = await CollegeId.findOne({ regd });

  if (!isStudentRegistered) {
    return next(new ErrorHandler(404, "Student not registered"));
  }

  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    message: "Student successfully created.",
    student,
  });
});

/* ------------------------------------------------------------------------------- */

export const getOneStudent = asyncErrorHandler(async (req, res, next) => {
  const regd = req.params.regd;

  const student = await Student.findOne({ regd });

  if (!student) {
    return next(new ErrorHandler(404, "Student not found."));
  }

  let user = await User.findOne({ regd });

  if (!user) {
    user = [];
  }

  res.status(200).json({
    success: true,
    student,
    user,
  });
});

/* ------------------------------------------------------------------------------- */

// get all students

export const getAllStudents = asyncErrorHandler(async (req, res, next) => {
  const students = await Student.find();

  console.log(students);

  res.status(200).json({
    success: true,
    students,
  });
});

/* ------------------------------------------------------------------------------- */

export const deleteOneStudent = asyncErrorHandler(async (req, res, next) => {
  const regd = req.params.regd;

  const student = await Student.findOne({ regd });

  if (!student) {
    return next(new ErrorHandler(404, "Student not found."));
  }

  await student.remove();

  res.status(200).json({
    success: true,
    message: "Student successfully deleted.",
  });
});

/* ------------------------------------------------------------------------------- */

export const updateStudent = asyncErrorHandler(async (req, res, next) => {
  const student = await Student.find({ regd: req.params.regd });

  if (!student) {
    return next(new ErrorHandler(404, "Student not found."));
  }

  const newData = await student.update(req.body);

  res.status(204).json({
    success: true,
    message: "Student updated successfully",
    newData,
  });
});
