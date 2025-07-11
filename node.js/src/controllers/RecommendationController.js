const axios = require('axios');

const recommendMajor = async (req, res) => {
  try {
    const { grades, questions } = req.body;

    if (!grades || !questions) {
      return res.status(400).json({ status: 'failed', message: 'Missing grades or questions' });
    }

    // Build prompt
    const prompt = `
Based on the following grades and interests, recommend 3 university major(each one on a line) and explain your reasoning in one sentence(for each one).

Grades: ${JSON.stringify(grades)}
Questions: ${questions.join('\n')}
`;

    // Call Ollama API
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false
    });

    const recommendation = ollamaResponse.data.response.trim();

    res.json({ status: 'ok', recommendation });

  } catch (err) {
    console.error('Error in recommendMajor:', err);  // <-- Important for debugging
    res.status(500).json({ status: 'failed', message: err.message });
  }
};


module.exports = {
  recommendMajor
};
