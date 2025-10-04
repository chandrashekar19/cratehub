// App Imports
const { PORT, NODE_ENV } = require('../config/env')

// Start server
function setupStartServer(server) {
  console.info('SETUP - Starting server..')

  server.listen(PORT, (error) => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on http://localhost:${PORT} [${NODE_ENV}]`)
    }
  })
}

module.exports = setupStartServer
