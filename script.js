const curateButton = document.getElementById('curate'),
      gallery = document.getElementById('gallery');
      
var   firstInput = document.getElementById('firstInput'),
      secondInput = document.getElementById('secondInput'),
      thirdInput = document.getElementById('thirdInput');

const tags = ["firstInput", "secondInput", "thirdInput"],
      numberOfImages = 5;


function curateGallery(requestedTags) {
  
  // retrieve 20 images based on our tags
  
  console.log('https://api.flickr.com/services/feeds/photos_public.gne?tags=' + requestedTags.join() + '&format=json');
  getFlickrImages('https://api.flickr.com/services/feeds/photos_public.gne?tags=' + requestedTags.join() + '&format=json', function(data){  
  
  const images = data.items;  
  
  // empty the gallery
  gallery.innerHTML= '';
    
  for(let i=0; i < numberOfImages;i ++) {
    if (images.length > 0) {
    let randomIndex = Math.floor(Math.random() * images.length);
    let image = images[randomIndex];
    // put these images in our gallery
    let img = `<img src='${image.media.m}'>`;
    
    gallery.innerHTML += img;
    console.log(image);
    images.splice(randomIndex, 1);
    }
  }  
});

  
} 

curateButton.addEventListener('click', function() {
 curateGallery
 ([firstInput.value, secondInput.value, thirdInput.value]);
});









/**
 Ignore for now: This code pulls Flickr images from the public feed
*/

function getFlickrImages(url, callback) {
    var callbackName = 'jsonFlickrFeed';
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
