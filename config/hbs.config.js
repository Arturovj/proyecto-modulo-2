const hbs = require('hbs')
require('mongoose')

hbs.registerPartials('./views/partials')


hbs.registerHelper('dateFormat', require('handlebars-dateformat'));



hbs.registerHelper('isMyAccount', function (context, options) {
    const currentUserId = context.hash.currentUserId;
    const gymUserId = context.hash.gymUserId;
  
    if (gymUserId && gymUserId.equals(currentUserId)) {
      return context.fn(this);
    } else {
      return context.inverse(this);
    }
  });



// hbs.registerHelper('restaurantHasCategory', function (options) {
//   const { restaurant, category } = options.hash;

//   if (restaurant && restaurant.categories.includes(category)) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// })


// hbs.registerHelper('userLikedRestaurant', function (options) {
//   const { restaurant, likes } = options.hash;
//   if (restaurant && likes && likes.some(like => like.restaurant == restaurant.id)) {
//     return options.fn(this);
//   } else {
//     return options.inverse(this);
//   }
// })
