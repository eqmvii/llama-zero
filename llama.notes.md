### Startup Woes

Gemini says:

ollama pull phi3:mini

within the container for testing

it is happening 

### test it 

ollama run phi3:mini

# ollama run phi3:mini
>>> Hello! Please generate a short haiku about butterflies.
Gossamer wings dance,  

Colors flutter in the breeze—    

Butterflies take flight.  


This traditional Japanese form captures the essence and movement of butterflies through nature's lens. The haiku reflects on their delicate beauty as they move gracefully, an 
emblem of transformation echoing life’s fleeting moments.

>>> Send a message (/? for help)

### 

test:

ollama nvidia-smi

### GEMINI DID IT!

Issue is we had to get the llama serve happening on 0.0.0.0 to map properly

http://localhost:11434/

Ollama is running

$ curl http://localhost:11434/api/chat -d '{
  "model": "phi3:mini",
  "messages": [
    {
      "role": "user",
      "content": "Hello! Tell me a very short, fun fact."
    }
  ],
  "stream": false
}'
{"model":"phi3:mini","created_at":"2025-05-30T18:28:47.487536358Z","message":{"role":"assistant","content":"Did you know that octopuses have three hearts and blue blood? This helps them to efficiently pump oxygen-rich water throughout their bodies while they hunt underwater. Plus, one of those tiny heart chambries is dedicated just for breathing! Quite the multi-taskers in the oceanic world!"},"done_reason":"stop","done":true,"total_duration":4789531258,"load_duration":3787256868,"prompt_eval_count":20,"prompt_eval_duration":373960676,"eval_count":67,"eval_duration":626781761}

####