function loadImage(url) {
    return new Promise(function(resolve, reject) {
      var image = new Image();
      image.onload = function() {
        resolve(url);
      };
      image.onerror = function() {
        reject(url);
      };
      image.src = url;
    });
  }
  
  var images = document.querySelectorAll('.gallery img');
  
  var imagePromises = Array.prototype.map.call(images, function(img) {
    return loadImage(img.getAttribute('data-src'));
  });
  
  Promise.all(imagePromises).then(function() {
    Array.prototype.forEach.call(images, function(img) {
      img.src = img.getAttribute('data-src');
    });
  });
  