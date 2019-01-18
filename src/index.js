function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let image = qs('#image')
let name = qs('#name')
let likes = qs('#likes')
let likeButton = qs('#like_button')
let comments = qs('#comments')
let commentForm = qs('#comment_form')

let imageId = 1876
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

let data

function fetchTheData(){
  fetch(imageURL)
  .then(res => res.json())
  .then(res => {
    data = res
    render()
  })
}

function deleteComment(comment){
  fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
    method: 'DELETE'
  })
  .then(fetchTheData)
  .then(render)
}

function render(){
  comments.innerHTML = ''
  image.src = data.url
  name.innerText = data.name
  likes.innerText = data.like_count
  data.comments.forEach((comment) => {
    let li = ce('li')
    li.innerText = comment.content
    let button = ce('button')
    button.innerText = 'Delete'
    button.addEventListener('click', () => {
      deleteComment(comment)
    })
    comments.append(li, button)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchTheData()
})


likeButton.addEventListener('click', () => {
  data.like_count++
  let likeData = {
    image_id: imageId
  }
  fetch(likeURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(likeData)
  })
  render()
})

commentForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let commentData = {
    image_id: imageId,
    content: e.target.comment_input.value
  }
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
  .then(fetchTheData)
  .then(render)
  e.target.comment_input.value = ''
})
