const fs = require('fs');
const path = require('path');
const process = require('process');

function getFilenamesFromPath(workingFolder, extension) {
    console.log(process.cwd());
    const files = [];
    const folderPath = path.join(__dirname, workingFolder);
    fs.readdirSync(folderPath)
        .forEach(file => {
            if( file.match(new RegExp(`.*\.(${extension})`, 'ig'))) {
                files.push(path.parse(file).name)
            }
        })
    return files;
}

module.exports = {
    getFilenamesFromPath
}