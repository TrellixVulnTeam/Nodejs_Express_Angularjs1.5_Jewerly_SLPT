var router = require('express').Router();
var mongoose = require('mongoose');
var Jewel = mongoose.model('Jewel');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var auth = require('../auth');

router.param('jewel', function(req, res, next, slug) {
  Jewel.findOne({ slug: slug })
      .populate('owner')
      .then(function(jewel) {
          if (!jewel) { return res.sendStatus(404); }

          req.jewel = jewel;

          return next();
      }).catch(next);
});

router.param('comment', function (req, res, next, id) {
  Comment.findById(id).then(function (comment) {
    if (!comment) { return res.sendStatus(404); }

    req.comment = comment;

    return next();
  }).catch(next);
});

//Feed 
router.get('/feed', function(req, res, next) {
  console.log("-------------------------------------------------")
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
      limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
      offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user) {
      if (!user) { return res.sendStatus(401); }

      Promise.all([
          Jewel.find({ owner: { $in: user.following } })
          .limit(Number(limit))
          .skip(Number(offset))
          .populate('owner')
          .exec(),
          Jewel.count({ owner: { $in: user.following } })
      ]).then(function(results) {
          var jewels = results[0];
          var jewelsCount = results[1];

          return res.json({
              jewels: jewels.map(function(jewel) {
                  return jewel.toJSONFor(user);
              }),
              jewelsCount: jewelsCount
          });
      }).catch(next);
  });
});




// return all jewells
router.get('/', auth.optional, function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  Promise.all([
    req.query.owner ? User.findOne({ username: req.query.owner }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(function (results) {

    return Promise.all([
      Jewel.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('owner')
        .exec(),
      Jewel.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var jewels = results[0];
      var jewelsCount = results[1];
      var user = results[2];

      return res.json({
        jewels: jewels.map(function (jewel) {
          return jewel.toJSONFor(user);
        }),
        jewelsCount: jewelsCount
      });
    });
  }).catch(next);
});
//

//obtain a jewel by slug
router.get('/:jewel', auth.optional, function(req, res, next) {
  Promise.all([
      req.payload ? User.findById(req.payload.id) : null,
      req.jewel.populate('author').execPopulate()
  ]).then(function(results) {
      var user = results[0];

      return res.json({ jewel: req.jewel.toJSONFor(user) });
  }).catch(next);
});


//insert a jewel by owner
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var jewel = new Jewel(req.body.jewel);

    jewel.owner = user;

    return jewel.save().then(function () {
      console.log(jewel.owner);
      return res.json({ jewel: jewel.toJSONFor(user) });
    });
  }).catch(next);
});


// update jewel
router.put('/:jewel', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.jewel.owner._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.jewel.name !== 'undefined') {
        req.jewel.name = req.body.jewel.name;
      }

      if (typeof req.body.jewel.brand !== 'undefined') {
        req.jewel.brand = req.body.jewel.brand;
      }

      if (typeof req.body.jewel.type !== 'undefined') {
        req.jewel.body = req.body.jewel.type;
      }

      if (typeof req.body.jewel.price !== 'undefined') {
        req.jewel.body = req.body.jewel.price;
      }

      if (typeof req.body.jewel.tagList !== 'undefined') {
        req.jewel.tagList = req.body.jewel.tagList
      }

      req.jewel.save().then(function (jewel) {
        return res.json({ jewel: jewel.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete jewel 
router.delete('/:jewel', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {

    if (!user) { return res.sendStatus(401); }

    if (req.jewel.owner._id.toString() === req.payload.id.toString()) {
      return req.jewel.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an jewel
router.post('/:jewel/favorite', auth.required, function (req, res, next) {
  var jewelId = req.jewel._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.favorite(jewelId).then(function () {
      return req.jewel.updateFavoriteCount().then(function (jewel) {
        return res.json({ jewel: jewel.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// // // Unfavorite an jewel
router.delete('/:jewel/favorite', auth.required, function (req, res, next) {
  var jewelId = req.jewel._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(jewelId).then(function () {
      console.log(req.jewel)
      return req.jewel.updateFavoriteCount().then(function (jewel) {
        return res.json({ jewel: jewel.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// // return an jewel's comments
router.get('/:jewel/comments', auth.optional, function (req, res, next) {
  console.log(req.jewel);
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
    console.log(user)
    return req.jewel.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function (jewel) {
      return res.json({
        comments: req.jewel.comments.map(function (comment) {
          return comment.toJSONFor(user);
        })
      });
    });
  }).catch(next);
});

// // // create a new comment
router.post('/:jewel/comments', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var comment = new Comment(req.body.comment);
    comment.jewel = req.jewel;
    comment.author = user;
    return comment.save().then(function () {
      req.jewel.comments = req.jewel.comments.concat([comment]);
      return req.jewel.save().then(function () {
        // console.log(req.jewel)
        req.jewel.updateComentsCount().then(function(){
          res.json({ comment: comment.toJSONFor(user) });
        });
      });
    });
  }).catch(next);
});

router.delete('/:jewel/comments/:comment', auth.required, function (req, res, next) {
  if ((req.comment.author.toString() === req.payload.id.toString()) || (req.jewel.owner._id.toString()=== req.payload.id.toString())) {
    req.jewel.comments.remove(req.comment._id);
    req.jewel.save().then(Comment.find({ _id: req.comment._id }).remove().exec())
    .then(function(){
      req.jewel.updateComentsCount()
      .then(function () {
        res.sendStatus(204);
      })
    })

  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
