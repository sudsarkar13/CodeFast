import requests

class GroqAPI:
    def __init__(self):
        self.base_url = "https://api.groq.io/v1"

    def get_llm(self, llm_name):
        response = requests.get(f"{self.base_url}/llms/{llm_name}")
        if response.status_code == 200:
            return response.json()
        else:
            return None

    def use_llm(self, llm, code_snippet):
        response = requests.post(f"{self.base_url}/generate", json={"llm": llm, "code_snippet": code_snippet})
        if response.status_code == 200:
            return response.json()
        else:
            return None