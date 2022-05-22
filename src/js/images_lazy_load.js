// Get all imgs with data-src attribute
let imagesToLoad = document.querySelectorAll("img[data-src]");

// optional parameters being set for the IntersectionalObserver
const imgOptions = {
  threshold: 1.0,
  rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute("data-src"));
  image.onload = () => { image.removeAttribute("data-src"); };
};

/* 
The imagesToLoad variable contains references to all the images, while the loadImages function moves the path from data-src to src. 
When each image is actually loaded, we remove its data-src attribute as it's not needed anymore. Then we loop through each image and load it:
*/

// first check to see if Intersection Observer is supported
if('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if(item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
      }
    });
  });

  // loop through each img oncheck status and load if necessary
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  // just load ALL the images if not supported
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}

