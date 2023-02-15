const path = require("path");
const fs = require("fs");

const deleteImage = (imgName) => {
    let pathname = path.join(__dirname, "../", "public/uploads/", imgName);
    fs.unlink(pathname, (err) => {
        if (err)  new Error(err.message);
        console.log("file deleted");
    });
}

module.exports = { deleteImage };