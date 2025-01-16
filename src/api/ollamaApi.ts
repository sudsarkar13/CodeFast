import axios from 'axios';

export async function callOllamaAPI(prompt: string, model: string) {
    const endpoint = 'http://127.0.0.1:11434/api/generate'; // Updated Ollama endpoint
    
    try {
        const response = await axios.post(endpoint, {
            model: model,
            prompt: prompt,
            stream: false
        });
        
        return response.data.response;
    } catch (error) {
        console.error('Error calling Ollama API:', error);
        throw error;
    }
}