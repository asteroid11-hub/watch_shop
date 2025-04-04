const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

class AIService {
  static async getDescription(prompt) {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'deepseek-chat',
    });

    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  }
}
module.exports = AIService;
