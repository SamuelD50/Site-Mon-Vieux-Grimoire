const sharp = require('sharp');
const fs = require('fs');

/* This middlewares uses the Sharp library to process picture downloads */

module.exports = (req, res, next) => {
  if (req.file) {
    const newWebpFilename = `${req.file.filename.split('.')[0]}.webp`;
    const newWebpPath = `${req.file.destination}/${newWebpFilename}`;

    sharp(`${req.file.destination}/${req.file.filename}`)
      .resize(206, 260)
      .webp({ quality: 90, force: true })
      .toFile(newWebpPath, (error) => {
        if (error) {
          console.error('Erreur lors du traitement de l\'image:', error);
          return res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
        }

        fs.unlink(`${req.file.destination}/${req.file.filename}`, (unlinkError) => {
          if (unlinkError) {
            console.error('Erreur lors de la suppression de l\'image originale', unlinkError);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image originale' })
          }

          next();
        });
      })
  } else {
    next();
  }
};