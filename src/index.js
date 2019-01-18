const qs = (arg) => {
  return document.querySelector(arg)
}

const ce = (arg) => {
  return document.createElement(arg)
}

let imageId = 1882
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  render()
})

const render = () => {
  fetch(imageURL)
    .then(res => res.json())
    .then(res => {
      renderImage(res)
      renderLike(res)
      renderCommentsList(res)
    })
}

// Get image to appear on page
const renderImage = (data) => {
  qs('#image').setAttribute('src', data.url)
}

// render and increment the image likes after button click

const renderLike = (data) => {
  let likeButton = qs('button')
  let likes = qs('#likes')

  likes.innerHTML = data.like_count

  likeButton.addEventListener('click', () => {
    likes.innerHTML = parseInt(likes.innerHTML) + 1;
    postLikes(data.id)
  })

}

const postLikes = (data) => {
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': data
    })
  })
    .then(render)
}

// -------    Handle comments    ---------

const renderCommentsList = (data) => {
  let commentForm = qs('#comment_form')
  let commentList = qs('#comments')

  data.comments.forEach((comment) => {
    commentList.append(renderComment(comment))
  })

  commentForm.addEventListener('submit', e => {
    e.preventDefault()
    // const commentInput = qs('#comment_input')
    let commentValue = e.target.querySelector('#comment_input')

    postComment(data, commentValue.value).then(res => {
      commentList.append(renderComment(res))
    })
    commentValue.value = ''
  })

}

const renderComment = (comment) => {
  let commentListItem = ce('li')
  commentListItem.innerHTML = `${comment.content} <button>(X)</button>`

  let deleteButton = commentListItem.querySelector('button')

  deleteButton.addEventListener('click', () => {
    commentListItem.parentElement.removeChild(commentListItem)
  })

  return commentListItem

}


const postComment = (data, content) => {
  fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'image_id': data.id,
      'content': content
    })
  })
    .then(render)
}
