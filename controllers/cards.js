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
  const newcard = req.files.map((f) => {
    const path = f.path.replace(/\\/g, '/');
    const name = Array.isArray(req.body.name) ? req.body.name[req.files.indexOf(f)] : req.body.name;
    const tag = Array.isArray(req.body.tag) ? req.body.tag[req.files.indexOf(f)] : req.body.tag;
    return { nameEn: name, tag: tag, link: 'http://localhost:3001/' + 'pictures/' + f.filename, filePath: path }
  })

  Card.create(newcard)
    .then((card) => res.send(card))
    .catch((err) => {
      throw err;
  })
}

const deleteCard = (req, res, next) => {
  const cardId = req.params.cardId.split(',').map((card) => {
    return card;
  })

  Card.find({ _id: {$in : cardId}})
    .orFail(new NotFound('Нет фильма с таким id'))
    .then((card) => {
      card.forEach((c) => {
        c.remove()
          .then((card) => {
            fs.unlink(card.filePath, function(err){
              if (err) {
                console.log(err);
              } else {
                console.log("Файл удалён");
              }
            })
          })
        })
        res.send(card);
    })
    .catch((err) => {
      throw err;
    })
}
 

module.exports = {
    createCard, getCard, deleteCard
};