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
    const mainPage = Array.isArray(req.body.mainPage) ? req.body.mainPage[req.files.indexOf(f)] : req.body.mainPage;
    const index = Array.isArray(req.body.index) ? req.body.index[req.files.indexOf(f)] : req.body.index;
    return { nameEn: name, tag, link: /* 'https://api.stafeeva.site/' */'http://localhost:3001/' + 'pictures/' + f.filename, 
      filePath: path, mainPage, index }
  })
  debugger

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

const editCard = (req, res, next) => {


  const cards = req.body;
  req.body.forEach((card) => {
    Card.findByIdAndUpdate(
      card._id,
      { $set:
          {
          'mainPage' : card.mainPage,
          'index' : card.index
          },
      },
      {
        new: true,
        runValidators: true,
      },
    )
      .then((u) => {
        if (!u) {
          throw new NotFound('Card не найдена');
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequest('Введены некорректные данные');
        }
        throw err;
      })
      .catch(next);

  })
  res.send(JSON.stringify({cards}));


};

 

module.exports = {
    createCard, getCard, deleteCard, editCard
};