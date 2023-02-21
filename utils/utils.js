const path = require('path')

module.exports = {
  checkFileType: (file, cb) => {
    /**
     * @desc Allowed ext
     */
    const filetypes = /jpeg|jpg|png|gif/;
    /**
     * @desc Check ext
     */
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    /**
     * @desc Check mime
     */
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb(new Error('Error: Images Only!'));
    }
  }
}