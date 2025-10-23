// Imports
const path = require('path')
const multer = require('multer')

// App Imports
const serverConfig = require('../config/server.json')

// File upload configurations and route
function setupUpload(server) {
  console.info('SETUP - Upload...')

  // Set destination
  const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'public', 'images', 'uploads'),

    filename: function (request, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  const upload = multer({ storage }).single('file')

  // Upload route
  server.post(serverConfig.upload.endpoint, (request, response) => {
    upload(request, response, function (error) {
      if (!error) {
        response.json({
          success: true,
          file: request.file.filename
        })
      } else {
        response.json({
          success: false,
          file: null
        })
      }
    })
  })
}

module.exports = setupUpload
