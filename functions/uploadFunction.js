const multer = require('multer');
const fs = require('fs');
const path = require('path');

const setUploadMiddleware = () => {
    const uploadDirectory = path.join(__dirname, '../uploads');
  
    // create uploads directory if it does not exist
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }
  
    //upload CV file
    const storage = multer.diskStorage({
      destination: (req, file, cb) =>{
        cb(null, uploadDirectory)
      },
      filename: (req, file, cb) =>{
        cb(null, Date.now()+ '--' +file.originalname )
      }
    })
  
    const upload = multer({ storage: storage });
  
    return upload;
  }