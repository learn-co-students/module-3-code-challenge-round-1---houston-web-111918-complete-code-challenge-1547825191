document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1879

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


let imageData = []

let imageid = document.querySelector("#image")
let nameid = document.querySelector("#name")
let likesid = document.querySelector("#likes")
let likeButton = document.querySelector("#like_button")
let container = document.querySelector("#container")



function render(){
  likesid.innerHTML = ""
  showImageData(imageData)
}

  function fetchImageData(){
fetch("https://randopic.herokuapp.com/images/1879")
  .then (res => res.json())
  .then (json => {
    imageData = json
    console.log(imageData)
  })
  .then(render)
}

function showImageData(imageData){
    // imageid.src.innerText = imageData.url
    imageid.src = imageData.url
    // imageid.innerText = imageData.url
    nameid.innerText = imageData.name
    likesid.innerText = imageData.like_count

  }

  likeButton.addEventListener("click", () => {updateLikes(imageData)})
  
  function updateLikes(imageData){
    imageData.like_count ++
    fetch("https://randopic.herokuapp.com/likes", {
    method: 'POST',
    headers:
    {
      "content-Type" : "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      image_id: 1879
      // like_count: imageData.like_count
    })
  })
      .then(fetchImageData)
  }


fetchImageData()

})









