const express = require('express');
const router = express.Router();
const files_upload = require('../models/upload_fl');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const { Readable } = require('stream');
const nodemailer = require('nodemailer');

router.get('/', upload.single('file'), async (req, res) => {
   var id = req.query.query || '';
   var fileLink = req.query.file_link || '';
   var file_name = req.query.file_name || '';
   var key = fileLink.slice(32);
   console.log('id and file link', id, fileLink, file_name);




   async function deleteFile() {
      try {
         const auth = new google.auth.GoogleAuth({
            keyFile: './public/googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
         })


         const driveService = google.drive({
            version: 'v3',
            auth
         })
         const GOOGLE_API_FOLDER_ID = '1YnKG2C1TH0DRlx5T24s4MHoGjBnaB6rJ';
         const fileMetaData = {
            // 'name': file.originalname,
            'parents': [GOOGLE_API_FOLDER_ID]
         }
         const media = {
            mimeType: 'image/jpg/png/zip/gz',
            // body: Readable.from(file.buffer)
         }

         const response = await driveService.files.delete({
            resource: fileMetaData,
            media: media,
            field: key,
            fileId: key
         })


         return response.data.id;



      } catch (err) {
         console.log('delete file error', err)
      }
   }

   deleteFile();

   await files_upload.destroy({ where: { id: id } });

   // Send email notification
   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'oppenheimerdemo@gmail.com',
         password: 'demo@123'
      },
      port: 465,
      host: 'smtp.gmail.com',
      secure: false
   });t
   var mailOptions = {
      from: 'oppenheimerdemo@gmail.com',
      to: 'geek07.alisha04@gmail.com',
      // to: email,
      subject: 'Your zip file Deleted!',
      text: `Dear:- Your zip file is deleted! Here is the name : ${file_name}`,
   };
   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent: ' + info.response);
      }
   });


   res.redirect('/table_list')
});

module.exports = router;
