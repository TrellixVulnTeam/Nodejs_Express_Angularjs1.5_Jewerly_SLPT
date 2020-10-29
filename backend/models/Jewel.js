var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var JewelSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  brand: String,
  type: String,
  price: Number,
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  commentsCount: { type: Number, default: 0 },
  tagList: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


const Jewel = mongoose.model('jewel', JewelSchema)

JewelSchema.plugin(uniqueValidator, { message: 'is already taken' });

JewelSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

JewelSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

JewelSchema.methods.updateFavoriteCount = function () {
  var jewel = this;

  return User.count({ favorites: { $in: [jewel._id] } }).then(function (count) {

    jewel.favoritesCount = count;

    return jewel.save();
  });
};


JewelSchema.methods.updateComentsCount = function () {
  let jewel = this;

  // return Jewel.aggregate([{ "$match": { name: "Submarine" } }, { "$project": { count: { "$size": "$comments" } } }])
  //   .exec()
  return Jewel.find({ _id: jewel._id }, { comments: 1, _id: 0 }).then(function(data){
    jewel.commentsCount = data[0].comments.length;
    return jewel.save();
  })

};

JewelSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    name: this.name,
    brand: this.brand,
    type: this.type,
    price: this.price,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
    commentsCount:this.commentsCount,
    owner: this.owner.toProfileJSONFor(user)
    // owner: user ? user.toProfileJSONFor(user) : this.owner.toProfileJSONFor(user)


  };
};

mongoose.model('Jewel', JewelSchema);
