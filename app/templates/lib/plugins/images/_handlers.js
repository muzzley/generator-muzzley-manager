var handlers = {};

handlers.images = function () {
  return {
    directory: {
      path: './public/images',
      listing: true,
      index: false
    }
  };
};


module.exports = handlers;
