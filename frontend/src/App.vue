<template>
  <div id="app" :class="{ 'pink-theme': true }">
    <h1>Trama Chat (Pink Edition!)</h1>
    <div class="chat-container">
      <textarea v-model="userInput" placeholder="Ask Drama something..." :disabled="isLoading"></textarea>
      <div class="buttons">
        <button @click="submitChat" :disabled="isLoading || !userInput.trim()">
          {{ isLoading ? 'Sending...' : 'Send to Drama' }}
        </button>
        <button @click="resetChat" :disabled="isLoading" class="reset-button">Reset</button>
      </div>
      <div v-if="chatResponse" class="response-area">
        <h2>Drama says:</h2>
        <pre>{{ chatResponse }}</pre>
      </div>
      <div v-if="errorResponse" class="error-area">
        <h2>Error:</h2>
        <pre>{{ errorResponse }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userInput: '',
      chatResponse: '',
      errorResponse: '',
      isLoading: false,
      ollamaModel: 'phi3:mini' // You can change this if you use a different default model
    };
  },
  methods: {
    async submitChat() {
      if (!this.userInput.trim()) return;
      this.isLoading = true;
      this.chatResponse = '';
      this.errorResponse = '';

      try {
        const response = await fetch('http://localhost:11434/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.ollamaModel,
            messages: [{ role: 'user', content: this.userInput }],
            stream: false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
          throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || errorData.message || 'Failed to fetch'}`);
        }

        const data = await response.json();
        if (data.message && data.message.content) {
          this.chatResponse = data.message.content;
        } else {
          this.chatResponse = JSON.stringify(data, null, 2); // Fallback for unexpected structure
        }
      } catch (error) {
        console.error('Error submitting chat:', error);
        this.errorResponse = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    resetChat() {
      this.userInput = '';
      this.chatResponse = '';
      this.errorResponse = '';
      this.isLoading = false;
    },
  },
};
</script>

<style>
.pink-theme {
  background-color: #fff0f5; /* LavenderBlush for background */
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ff69b4; /* HotPink for text */
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  color: #db7093; /* PaleVioletRed */
}

.chat-container {
  background-color: #ffffff;
  border: 2px solid #ffb6c1; /* LightPink border */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(255, 105, 180, 0.2);
}

textarea {
  width: 95%;
  min-height: 80px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ffc0cb; /* Pink border */
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
}

textarea:focus {
  outline: none;
  border-color: #ff69b4; /* HotPink focus */
  box-shadow: 0 0 5px rgba(255, 105, 180, 0.5);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff69b4; /* HotPink */
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #ff1493; /* DeepPink */
}

button:disabled {
  background-color: #ffc0cb; /* Pink (lighter for disabled) */
  cursor: not-allowed;
}

.reset-button {
  background-color: #db7093; /* PaleVioletRed */
}

.reset-button:hover:not(:disabled) {
  background-color: #c71585; /* MediumVioletRed */
}

.response-area, .error-area {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff5f7; /* Lighter pink for response background */
  text-align: left;
  border: 1px solid #ffdde1;
}

.response-area h2, .error-area h2 {
  color: #c71585; /* MediumVioletRed */
  margin-top: 0;
  font-size: 1.2em;
}

.error-area {
  border-color: #ff0000;
  background-color: #ffe0e0;
}

.error-area pre {
 color: #d00000;
}

pre {
  white-space: pre-wrap;       /* CSS3 */
  white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
  white-space: -pre-wrap;      /* Opera 4-6 */
  white-space: -o-pre-wrap;    /* Opera 7 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  color: #333;
}
</style>
