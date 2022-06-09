const fs = require('fs');
const Card = require('../models/card');

const { Forbidden, NotFound, BadRequest } = require('../errors');

const getCard = (req, res, next) => {
  Card.find({})
    .then((card) => {
      res.send(card);
    })
    .catch(next);
}

const createCard = (req, res) => {
  const test = req.files.map((f) => {
    const path = f.path.replace(/\\/g, '/');
    const name = req.body.name[req.files.indexOf(f)];
    const tag = req.body.tag[req.files.indexOf(f)];
    return { nameEn: name, tag: tag, link: 'http://localhost:3001/' + 'pictures/' + f.filename, filePath: path }
  })
  debugger

  Card.create(test)
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFound('Нет фильма с таким id'))
    .then((card) => {
      card.remove()
      .then((delcard) => {
        fs.unlink(delcard.filePath, function(err){
          if (err) {
            console.log(err);
          } else {
            console.log("Файл удалён")
            res.send(card)
          }
      });
      })
      .catch(next);
    })
    .catch((err) => {
      throw err;
    })
    .catch(next);
}
 

module.exports = {
    createCard, getCard, deleteCard
};