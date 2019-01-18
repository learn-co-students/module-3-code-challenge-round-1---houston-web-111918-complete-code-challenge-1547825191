document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1874 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  
  imageObj = []
  let imageCard = document.querySelector('#image_card')
  let image = document.querySelector('#image')
  let likesButton = document.querySelector('#like_button')
  let likesSpan = document.querySelector('#likes')
  let numLikes

  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(json => imageObj = json)
    .then(render)
  }
  
  function render(){
    image.setAttribute('src', imageObj.url)
    imageCard.append(image)    
    numLikes = imageObj.like_count
    likesSpan.innerText = numLikes
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

  fetchImage()
  
})


