const galleryContainer = document.querySelector(".gallery-container");

// Create an array of image sources
const imageSources = [
    "https://picsum.photos/id/1/300/200",
    "https://picsum.photos/id/2/300/200",
    "https://picsum.photos/id/3/300/200",
    "https://picsum.photos/id/4/300/200",
    "https://picsum.photos/id/5/300/200",
    "https://picsum.photos/id/6/300/200",
    "https://picsum.photos/id/7/300/200",
    "https://picsum.photos/id/8/300/200",
    "https://picsum.photos/id/9/300/200",
    "https://picsum.photos/id/10/300/200",
    "https://picsum.photos/id/11/300/200",
    "https://picsum.photos/id/12/300/200",
    "https://picsum.photos/id/13/300/200",
    "https://picsum.photos/id/14/300/200",
    "https://picsum.photos/id/15/300/200",
    "https://picsum.photos/id/16/300/200",
    "https://picsum.photos/id/17/300/200",
    "https://picsum.photos/id/18/300/200",
    "https://picsum.photos/id/19/300/200",
    "https://picsum.photos/id/20/300/200",
    "https://picsum.photos/id/22/300/200"
];

// Function to load each image
function loadImage(src) {
    return new Promise( function (resolve, reject) {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// Load all images using Promise.all()
Promise.all(imageSources.map(loadImage)).then( function (images) {
    // Append each image to the gallery container
    images.forEach( function (image) {
        const galleryItem = document.createElement("div");
        galleryItem.classList.add("gallery-item");
        galleryItem.appendChild(image);
        galleryContainer.appendChild(galleryItem);
    });
});
