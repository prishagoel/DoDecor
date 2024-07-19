const API_KEY = process.env.OPENAI_API_KEY; 
const url = 'https://api.openai.com/v1/images/generations';

let initialPrompt = '';

document.getElementById('submit-btn').addEventListener('click', () => {
  initialPrompt = document.getElementById('instruction').value;
  generateImages(initialPrompt);
});

function generateImages(prompt) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 2,
      size: '256x256',
      response_format: 'b64_json'
    })
  };

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      const image1Data = data.data[0].b64_json;
      const image2Data = data.data[1].b64_json;
      document.getElementById('output-img1').src = `data:image/png;base64,${image1Data}`;
      document.getElementById('output-img2').src = `data:image/png;base64,${image2Data}`;
      document.getElementById('feedback-container').style.display = 'flex'; // Show feedback container
    })
    .catch(error => console.error(error));
}

document.getElementById('feedback-btn').addEventListener('click', () => {
  const feedbackPrompt = document.getElementById('feedback').value;
  const combinedPrompt = `${initialPrompt}. ${feedbackPrompt}`;
  generateImages(combinedPrompt);
});
