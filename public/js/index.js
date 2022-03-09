const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");

const testimonials = [
  {
    name: "Miyah Myles",
    position: "",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
    text:
      "YES YES YES, finally an usefull APP!",
  },
  {
    name: "June Cha",
    position: "",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text:
      "Best app to find a gym in your city for sure.",
  },
  {
    name: "Iida Niskanen",
    position: "",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text:
      "So usefull to compare prices and check reference of the best gyms",
  },
  {
    name: "Renee Sims",
    position: "",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text:
      "Couldn't find a proper gym until i used this app, THANK YOU!",
  },
  {
    name: "Jonathan Nunfiez",
    position: "",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text:
      "Managed to find a gym and make a lot of friends with this app!",
  },
  {
    name: "Sasha Ho",
    position: "",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb",
    text:
      "Used this app to buy a sell gym equipement, so fast and easy!",
  },
  {
    name: "Veeti Seppanen",
    position: "Gym Instructor",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text:
      "With this app i can find the best gyms for my clients.",
  },
];

let index = 1;

const updateTestimonial = () => {
  const { name, position, photo, text } = testimonials[index];
  testimonial.innerHTML = text;
  userImage.src = photo;
  username.innerHTML = name;
  role.innerHTML = position;
  index++;
  if (index > testimonials.length - 1) index = 0;
};

setInterval(updateTestimonial, 10000);

// when the page product is loaded, we receive from the controller, the averageRating
// here we convert the number in stars
function numberToStars(rating) {
    if(!rating) {
      return;
    }
    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    // If there is a half a star, append it
    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    return output.join('');
  }
  // average rating of the product displayed on product page comments

const allStarsRatings = document.getElementsByClassName("averageStars")


for (spanRating of allStarsRatings) {
    const rate = spanRating.dataset.rating
    spanRating.innerHTML = numberToStars(rate);
}

const averageRating = document.getElementById("avRatingToIndexJs")?.innerHTML

const averageStarsNode = document.getElementById("averageStars");

if(averageStarsNode){
  averageStarsNode.innerHTML = numberToStars(averageRating);
}

const commentRating = document.getElementsByClassName("commentRating")

for (comRating of commentRating) {
    const rate = comRating.dataset.rating
    comRating.innerHTML = numberToStars(rate);
}
  