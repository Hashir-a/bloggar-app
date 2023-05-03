const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    //category
    //comments
    //likes
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model('post', PostSchema);
