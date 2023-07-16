//your JS code here. If required.
// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate an array of image URLs
function generateImageUrls() {
  const baseUrl = 'https://example.com/images/'; // Replace with your actual image URLs
  const imageUrls = [];
  for (let i = 1; i <= 5; i++) {
    imageUrls.push(`${baseUrl}${i}.jpg`);
  }
  // Choose a random index and duplicate an image URL
  const duplicateIndex = Math.floor(Math.random() * 5);
  imageUrls.push(imageUrls[duplicateIndex]);
  return imageUrls;
}

// Render the images
function renderImages(imageUrls) {
  const imageContainer = document.getElementById('imageContainer');
  imageContainer.innerHTML = '';
  shuffleArray(imageUrls).forEach((url, index) => {
    const img = document.createElement('img');
    img.src = url;
    img.className = `img${index + 1}`;
    img.addEventListener('click', handleImageClick);
    imageContainer.appendChild(img);
  });
}

// Handle image click event
function handleImageClick(event) {
  const selectedImages = document.querySelectorAll('.selected');
  if (selectedImages.length === 2) {
    return;
  }

  event.target.classList.add('selected');

  if (selectedImages.length === 1) {
    document.getElementById('verify').style.display = 'inline';
  }

  if (selectedImages.length === 2) {
    const img1Class = selectedImages[0].className;
    const img2Class = selectedImages[1].className;

    if (img1Class === img2Class) {
      document.getElementById('para').textContent = 'You are a human. Congratulations!';
    } else {
      document.getElementById('para').textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  }
}

// Reset the state
function resetState() {
  const selectedImages = document.querySelectorAll('.selected');
  selectedImages.forEach((image) => {
    image.classList.remove('selected');
  });

  document.getElementById('verify').style.display = 'none';
  document.getElementById('para').textContent = '';
}

// Initialize the app
function initializeApp() {
  const resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', resetState);
  renderImages(generateImageUrls());
}

// Run the app
initializeApp();
