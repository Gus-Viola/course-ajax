//code below from https://discussions.udacity.com/t/ajax-with-xhr-lesson-help/405865/17

(function() {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText = 'Android';
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

    //We should create here our XHR object and send it to the server.
    //We need to get the API keys so we can make this request as unlash needs authentication
    //So we need first get the Access Key from https://unplash.com .
    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.onload = addImage;
    unsplashRequest.onerror = function(err) {
      requestError(err, 'img');
    };
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID e0c79104096f90c1c6145be3d701f79193539c761f7375617432149f7928c1d5');
    unsplashRequest.send();

    const articleRequest = new XMLHttpRequest();
    articleRequest.onload = addArticles;
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d7b6675ae2df48b497ff50fedd381232`);
    articleRequest.send();
    
  });//end of addEventListener

  function addImage() {
    let htmlContent = '';
    const data = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    if (data && data.results && data.results[0]) {

      htmlContent = `<figure>
           <img src="${firstImage.urls.regular}" alt="${searchedForText}">
           <figcaptions>${searchedForText} by ${firstImage.user.name}</figcaptions>
       </figure>`;

    } else { //in case of failure...

      htmlContent = `<div class = "error-no-image">No Images Available!</div>`;
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    // let unplashImg = document.querySelector('.unplash_image');
    // unplashImg.setAttribute('src', firstImage.urls.regular);

  } //end of addImage()

  function addArticles() {

    let htmlContent = '';
    const data = JSON.parse(this.responseText);

    if (data.response && data.response.docs && data.response.docs.length > 1) {

      htmlContent = '<ul>'+ data.response.docs.map(article => `<li class = "article">
              <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
              <p>${article.snippet}</p>
              </li>`).join("")+'</ul>'

    } else { //in case of failure...

      htmlContent = `<div class = "error-no-articles">No Articles Available!</div>`;
    }

    responseContainer.insertAdjacentHTML('beforeend', htmlContent);


  } //end of addArticles()




})();
