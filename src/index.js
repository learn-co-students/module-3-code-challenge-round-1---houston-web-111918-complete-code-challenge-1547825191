document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1880 //use it as the /:id parameter in your initial GET request

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

    // NOTE: MAY HAVE TO INVOKE RENDER OR INCLUDE ALL CODE IN DOMCL
   //VARIABLES
    // render()
  // })


//UTILS
function s(arg){
    return document.querySelector(arg)
}

function c(arg){
  return document.createElement(arg)
}

//VARIABLE
    // let imageTitle = s('#name')
    // let imageCard = s('#image-card')
    // let image = s('#image')
    
    

  function render(){
    fetch(imageURL)
      .then(res => res.json())
      .then(res => {
      data = res
      renderCard(data)
      // console.log(data)
    })
  }

  render();
  
  function renderCard(){
    let form = s('#comment_input')
    let submit = s('#go')
    let comments = s('#comments')
    // console.log(comments)

    let imageTitle = s('#name')
    let imageCard = s('#image_card')
    let image = s('#image')
    let likesCount = data.like_count
    let like = s('#like_button')
    let likeShow = s('#likes')
    likeShow.innerText = likesCount


    image.src = data.url
    imageTitle.innerHTML = data.name
    imageCard.append(image)

    
    // let commentsShow = s('#comments')
    imageCard.append(comments)
    
    // console.log(data.comments)
    let com = data.comments
    comments.innerHTML = ''
      com.forEach(comment => {
      let q = c('li')
      q.innerText= comment.content
      let deleteButton = c('button')
      deleteButton.innerHTML = "X"
      q.append(deleteButton)
      comments.append(q)
      // console.log(comment.id)
        deleteButton.addEventListener('click', () => {

          fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
            method: 'delete'
          })
           .then(render)
        })
        // render() //DONT DO THIS IT CRASHES WEBPAGE
      
    })
    imageCard.append(comments)
    
    
    
    
    like.addEventListener('click', () => {
      likesCount += 1
      likeShow.innerText = likesCount
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          likes_count: likesCount,
          image_id: data.comments[0].image_id
        })
      })
      // console.log(likes)
    })// like EventListener end

    // let form = s('#comment_input')
    // let submit = s('#go')
    // let comments = s('#comments')

    submit.addEventListener('click', (e) => {
      e.preventDefault()
      let comment = c('li')
      comment.innerHTML = form.value
      data.comments[0].content = comment.innerHTML

      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: data.comments[0].content,
          image_id: imageId
        })
      })
      
      // .then(render) //already rendering
      
      // imageCard.append(comments)
      render()
    })

    // let deleteButton = c('button')
    // deleteButton.innerHTML = "DELETE"
    // comment.append(deleteButton)
    // render()
    // console.log(form.submit.value)
  }
  
 })// DOMContentLoad