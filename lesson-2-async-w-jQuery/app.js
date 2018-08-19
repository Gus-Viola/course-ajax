/* eslint-env jquery */

// (function () {
//     const form = document.querySelector('#search-form');
//     const searchField = document.querySelector('#search-keyword');
//     let searchedForText;
//     const responseContainer = document.querySelector('#response-container');
//
//     form.addEventListener('submit', function (e) {
//         e.preventDefault();
//         responseContainer.innerHTML = '';
//         searchedForText = searchField.value;
//     });
// })();



//code below from https://discussions.udacity.com/t/ajax-with-xhr-lesson-help/405865/17
//and I changed it a bit, based on class material and my own preferences

(function() {
  const form = document.querySelector('#search-form');
  const searchField = document.querySelector('#search-keyword');
  let searchedForText = 'Android';
  const responseContainer = document.querySelector('#response-container');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;

    // const unsplashRequest = new XMLHttpRequest();
    // unsplashRequest.onload = addImage;
    // unsplashRequest.onerror = function(err) {
    //   requestError(err, 'img');
    // };
    // unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    // unsplashRequest.setRequestHeader('Authorization', 'Client-ID e0c79104096f90c1c6145be3d701f79193539c761f7375617432149f7928c1d5');
    // unsplashRequest.send();

    $.ajax({
    url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, //added this comma, udacity mistake
    headers: {
      Authorization: 'Client-ID e0c79104096f90c1c6145be3d701f79193539c761f7375617432149f7928c1d5'
    }
}).done(addImage);



    // const articleRequest = new XMLHttpRequest();
    // articleRequest.onload = addArticles;
    // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d7b6675ae2df48b497ff50fedd381232`);
    // articleRequest.send();

    $.ajax({ //this is my code
      url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=d7b6675ae2df48b497ff50fedd381232`
    }).done(addArticles);


  });//end of addEventListener

  function addImage(images) {
    let htmlContent = '';
    // const data = JSON.parse(this.responseText);
    const firstImage = images.results[0];

    if (images && images.results && images.results[0]) {

      htmlContent = `<figure>
           <img src="${firstImage.urls.regular}" alt="${searchedForText}">
           <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
       </figure>`;

    } else { //in case of failure...

      htmlContent = `<div class = "error-no-image">No Images Available!</div>`;
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    // let unplashImg = document.querySelector('.unplash_image');
    // unplashImg.setAttribute('src', firstImage.urls.regular);

  } //end of addImage()

  function addArticles(articles) {

    let htmlContent = '';
    // const data = JSON.parse(this.responseText);
    const data = articles;

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
