const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersLiked: [],
      usersDisliked: []
  });

  sauce.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.OneSauce =  (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (Sauce) => {
        res.status(200).json(Sauce);
      }
    ).catch(
      (error) => {
        res.status(401).json({
          error: error
        });
      }
    );
  }

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteSauce= (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.modifyLike= (req, res, next) => {
  
  switch (req.body.like){

    case 1:
      Sauce.updateOne({_id: req.params.id},
         {$push: {usersLiked: req.body.userId}, 
         $inc: {likes: +1}})
      .then(() => res.status(200).json({ message: "Like added" }))
      .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      Sauce.updateOne({_id: req.params.id},
         {$push: {usersDisliked: req.body.userId}, 
         $inc: {dislikes: +1}})
      .then(() => res.status(200).json({ message: "Dislike added" }))
      .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      Sauce.findOne({_id: req.params.id})
      .then((sauce) =>{

        if(sauce.usersLiked.includes(req.body.userId)){
          Sauce.updateOne({_id: req.params.id},
            {$pull:{usersLiked: req.body.userId}, 
            $inc: {likes: -1}})
            .then(() => res.status(200).json({message: "Like removed"}))
            .catch((error) => res.status(400).json({ error }));

          }
          else if(sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({_id: req.params.id},{$pull:{usersDisliked: req.body.userId}, $inc: {dislikes: -1}})
            .then(()=> res.status(200).json({message: "Dislike removed"}))
            .catch((error) => res.status(400).json({error}));
          }
      })
      .catch((error) => res.status(404).json({error}))
      break;
  }
};

  exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (Sauce) => {
        res.status(200).json(Sauce);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };