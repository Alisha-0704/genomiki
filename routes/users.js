var express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { Readable } = require("stream");
const nodemailer = require('nodemailer');
var files_upload = require("../models/upload_fl");

var arr = [];
var links = [];

router.post("/", upload.array("file", 15), (req, res) => {
  const files = req.files; // Array of uploaded files
  const fileNames = files.map((file) => file.originalname);
  var userEmail = req.cookies.username;
  console.log(fileNames);

  async function uploadFiles() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: "./public/googlekey.json",
        scopes: ["https://www.googleapis.com/auth/drive"],
      });

      const driveService = google.drive({
        version: "v3",
        auth,
      });

      const GOOGLE_API_FOLDER_ID = "1muip-IssB58IcKznecE0pFHNQGWYzfUL";

      const uploadPromises = files.map(async (file) => {
        const fileMetaData = {
          name: file.originalname,
          parents: [GOOGLE_API_FOLDER_ID],
        };
        const media = {
          mimeType: "image/jpg/png",
          body: Readable.from(file.buffer),
        };

        const response = await driveService.files.create({
          resource: fileMetaData,
          media: media,
          field: "id",
        });

        return response.data.id;
      });

      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
      console.log('uploads result', uploadResults);
    } catch (err) {
      console.log("upload files error", err);
    }
  }

  uploadFiles().then(async (data) => {
    // var arrdata = [];
    if (data) {

      // console.log('after',arrdata);

      // Handle the uploaded file IDs as needed
      console.log('this is data ', data);

      // Store file names and IDs in arrays
      arr.unshift(...fileNames);
      console.log(arr);
      req.session.arr = req.session.arr || []; // Initialize `arr` if not already present
      req.session.arr.unshift(...fileNames);
      console.log(req.session.arr);

      // Redirect to the desired page
      req.flash('message', 'Files uploaded successfully');
      req.flash('names', arr)
      ;

      res.redirect('/home');

      for (var i = 0; i < data.length && files.length; i++) {
        console.log('this is link'+':'+'https://drive.google.com/file/d/' + data[i]);
        var link = '\n https://drive.google.com/file/d/' + data[i]+ ' ';
        links.push(link);
        // console.log('file',files[i]);
        // app.js

        const fileuploads = async (originalname, data) => {
  try {
    // Create an entry in the database for each file
    for (let i = 0; i < data.length; i++) {
      const uploadlist = await files_upload.create({
        file_name: originalname,
        file_link: 'https://drive.google.com/file/d/' + data[i],
        email: 'oppenheimerdemo@gmail.com'
      });
      console.log('Uploaded:', originalname);
    }
  } catch (error) {
    console.error('Error creating file entry:', error);
  }
};
        fileuploads(files[i].originalname, data[i])
       

        // arrdata.push(data[i]);


        // Send email notification
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'oppenheimerdemo@gmail.com',
          },
          port: 465,
          host: 'smtp.gmail.com'
        });
        var mailOptions = {
          from: 'geek07.alisha04@gmail.com',
          to: 'oppenheimerdemo@gmail.com',
          // to: email,
          subject: 'Your zip file uploaded successfully!',
          text: `Dear:- Your zip file uploaded successfully! Here is the link: ${links}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }
  });
});

module.exports = router;
