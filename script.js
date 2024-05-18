document.getElementById('imageUploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    fetch('https://universe.roboflow.com/ltttnt/fire-vqbia/model/1', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.prediction.results[0].output_url;
        displayProcessedImage(imageUrl);
      })
      .catch(error => {
        console.error('Error processing image:', error);
      });
  });
  
  function displayProcessedImage(imageUrl) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = `<img src="${imageUrl}" alt="Processed Image" />`;
  }
  