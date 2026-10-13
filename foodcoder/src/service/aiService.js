import axios from "axios";

const API_URL = "http://localhost:8080/api/ai/chat";

export const askFoodCodeAI = async (message) => {
  const response = await axios.post(API_URL, { message });
  return response.data.answer;
};
