document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 1875;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
});

let s = function(selector) {
  return document.querySelector(selector);
};
let c = function(tagName) {
  return document.createElement(tagName);
};

let imageTitle = s("#name");
let imageImage = document.querySelectorAll("#image");
let imageLikes = s("#likes");
let imageComments = document.querySelectorAll("#comment_input");
let imageLikesButton = s("#like_button");
// let counter = s("#likes");
let images = {};

const fetchImages = () => {
  fetch("https://randopic.herokuapp.com/images/1875")
    .then(res => res.json())
    .then(res => (images = res))

    .then(render);
};

function render() {
  imageTitle.innerText = images.name;
  imageImage[0].src = images.url;
  imageLikes.innerText = images.like_count;
  imageComments[0].value = images.comments[0].content;
}

function renderLikes() {
  imageLikesButton.addEventListener("click", e => {
    e.preventDefault();
    images.like_count += 1;

    render();
    fetch("https://randopic.herokuapp.com/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ image_id: 1875 })
    }).then(render);
  });
}

renderLikes();
fetchImages();
