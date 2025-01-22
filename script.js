const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Replace with your OpenAI API key
const API_KEY = 'your-openai-api-key';
const API_URL = 'https://api.openai.com/v1/chat/completions';

// Function to add a message to the chat box
function addMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', `${role}-message`);
  messageDiv.textContent = content;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to send user input to the OpenAI API
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  userInput.value = '';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    addMessage('bot', botMessage);
  } catch (error) {
    console.error('Error:', error);
    addMessage('bot', 'Sorry, something went wrong. Please try again.');
  }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});
