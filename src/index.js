document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1874 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  
  imageObj = []
  let imageCard = document.querySelector('#image_card')
  let header = document.querySelector('#name')
  let image = document.querySelector('#image')

  let likesButton = document.querySelector('#like_button')
  let likesSpan = document.querySelector('#likes')
  let numLikes

  let form = document.querySelector('#comment_form')
  let comments = document.querySelector('#comments')
  
  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(json => imageObj = json)
    .then(render)
  }
  
  function render(){
    imageCard.innerHTML = ''

    header.innerText = 'Mod 3 Code Challenge'
    image.setAttribute('src', imageObj.url)
    numLikes = imageObj.like_count
    likesSpan.innerText = `Likes: ${numLikes} `

    imageCard.append(image, header, likesSpan, likesButton, form, comments) 
    renderComments()
  }

  likesButton.addEventListener('click', e => {
    e.preventDefault()
    fetchLikes()
  })

  function fetchLikes(){
    ++numLikes

    fetch(likeURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(
        {
          image_id: imageId,
          like_count: numLikes
        })
    })
    .then(fetchImage)
  }

  function renderComments(){
    comments.innerHTML = ''
    imageObj.comments.forEach( comment => {
      let content = comment.content
      let li = document.createElement('li')
      li.innerText = content
      comments.append(li)
    })
  }

  form.addEventListener('submit', e => {
    e.preventDefault()
    let comment = e.target.comment.value
    fetchComments(comment)
  })

  function fetchComments(comment){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(
        {
          image_id: imageId,
          content: comment

        })
    })
    .then(fetchImage)
  }
  
  fetchImage()

})


