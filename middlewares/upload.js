const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/pictures');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "--" + file.originalname);
    }
});  

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')
    || (file.mimetype).includes('svg')
    ){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

let upload = multer({ storage: storage, fileFilter: fileFilter,});

module.exports = upload.array('link');

