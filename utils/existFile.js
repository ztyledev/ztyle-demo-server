const fs = require('fs')

const existFile = (path) => {
    
    const existStatus = fs.existsSync(path)
    return existStatus

}

module.exports = existFile
