const Like = require("./Like");
const Comment = require("./Comment");
const Share = require("./Share");

// Optional: add associations if needed in future
// e.g., Like.belongsTo(Post, { foreignKey: 'postId' });

module.exports = { Like, Comment, Share };
