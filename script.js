async function uploadAndProcessImage(file) {
    const imageBase64 = await loadImageBase64(file);
  
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/fire-vqbia/1",
      params: {
        api_key: "4KIuSPChxh5KWl6uBXnk",
      },
      data: imageBase64,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        const imageUrl = response.data.prediction.results[0].output_url;
        displayProcessedImage(imageUrl);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
  
  async function loadImageBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 string
      reader.onerror = (error) => reject(error);
    });
  }
  
  document.getElementById("imageUploadForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    const fileInput = document.getElementById("imageInput");
    if (fileInput.files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }
  
    const file = fileInput.files[0];
    uploadAndProcessImage(file);
  });
  