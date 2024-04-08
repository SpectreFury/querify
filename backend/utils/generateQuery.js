const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMENI_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateQuery = async (userPrompt) => {
  const PROMPT =
    "You are going to be asked about SQL queries and you are supposed to only give the raw SQL query back and nothing else. Do not add ''' quotes around the query. Do not add new lines. \n";

  const result = await model.generateContent(`${PROMPT} ${userPrompt}`);
  const response = await result.response;
  const query = response.text();

  return query;
};

module.exports = { generateQuery };
