const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'images/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
});

module.exports = multer({ storage: storage }).single('image')

/* const sharp = require('sharp');
const fs = require('fs');

module.exports = (req, res, next) => {
    if (req.file) {
        const webpFormatName = `${req.file.filename.split('.')[0]}.webp`;
        const newWebpPath = `${req.file.destination}/${webpFormatName}`;

        sharp(`${req.file.destination}/${req.file.filename}`)
            .resize(600, 600)
            .webp(90)
            .toFile(newWebpPath, (err) => {
                if (err) {
                    console.error('Erreur lors du traitement de l\'image avec Sharp:', err);
                    return res.status(500).json({ error: 'Erreur lors du traitement de l\'image avec Sharp' });
                }

                fs.unlink(`${req.file.destination}/${req.file.filename}`, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Erreur lors de la suppression du fichier original:', unlinkErr);
                        return res.status(500).json({ error: 'Erreur lors de la suppression du fichier original' });
                    }

                    console.log('Image traitée avec sharp');
                    next();
                });
            });
    } else {
        next();
    }
}; */