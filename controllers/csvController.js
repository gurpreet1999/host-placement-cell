
const fs = require("fs");
const path = require("path");
const STUDENT = require("../models/studentModel");

module.exports.downloadCSVReport = async function (req, res) {
  try {
    const allStudents = await STUDENT.find({});
    let report =
      "student Id, Student name,Student college, Student email, Student status, DSA Final Score, WebD Final Score, React Final Score, Interview date, Interview company, Interview result";
    let studentData1 = "";
    let studentData2 = "";

    for (let student of allStudents) {
      studentData1 =
        student._id +
        "," +
        student.name +
        "," +
        student.college +
        "," +
        student.email +
        "," +
        student.placementStatus +
        "," +
        student.dsaScore +
        "," +
        student.webScore +
        "," +
        student.reactScore;
      if (student.interviews.length > 0) {
      
        for (let interview of student.interviews) {
         
          studentData2 +=
            "," +
            interview.date.toString() +
            "," +
            interview.company +
            "," +
            interview.result;
          
        }
       
      }
      report=report +  "\n" + studentData1 + studentData2;
    }

    
    const csvFile = fs.writeFile(
      "uploads/studentsReport.csv",
      report,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirct("back");
        }
        req.flash("success", "successfully downloaded CSV report!");
        return res.download("uploads/studentsReport.csv");
      }
    );
  } catch (err) {
    console.log(err);
  }
};