document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000';
    const imageId = 1;
    const cardTitle = document.getElementById('card-title');
    const cardImage = document.getElementById('card-image');
    const likeCount = document.getElementById('like-count');
    const likeButton = document.getElementById('like-button');
    const commentsList = document.getElementById('comments-list');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment');
  
    let isImageHidden = false;
  
    fetch(`${baseUrl}/images/${imageId}`)
      .then(response => response.json())
      .then(data => {
        cardTitle.textContent = data.title;
        cardImage.src = data.image;
        likeCount.textContent = `${data.likes} likes`;
        const comments = data.comments.map(comment => `<li data-comment-id="${comment.id}">${comment.content}</li>`);
        commentsList.innerHTML = comments.join('');
      });
  
    likeButton.addEventListener('click', () => {
      likeCount.textContent = `${parseInt(likeCount.textContent) + 1} likes`;
    });
  
    commentsList.addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        event.target.remove();
        // Sending a DELETE request to remove the comment from the server
        const commentId = parseInt(event.target.dataset.commentId);
        fetch(`${baseUrl}/comments/${commentId}`, { method: 'DELETE' });
      }
    });
  
    cardTitle.addEventListener('click', () => {
      isImageHidden = !isImageHidden;
      cardImage.style.display = isImageHidden ? 'none' : 'block';
    });
  
    commentForm.addEventListener('submit', event => {
      event.preventDefault();
      const newComment = commentInput.value.trim();
      if (newComment) {
        const commentItem = document.createElement('li');
        commentItem.textContent = newComment;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
        // Sending a POST request to save the comment on the server
        fetch(`${baseUrl}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageId, content: newComment }),
        });
      }
    });
  
    cardImage.addEventListener('click', () => {
      fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
          cardImage.src = data.message;
          // Sending a PATCH request to update the image on the server
          fetch(`${baseUrl}/images/${imageId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: data.message }),
          });
        });
    });
  });