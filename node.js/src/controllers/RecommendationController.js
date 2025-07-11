const axios = require('axios');

const interestQuestions = [
  'Do you enjoy solving logical and numerical problems?',
  'Are you interested in programming or technology?',
  'Do you enjoy reading about scientific discoveries?',
  'How much do you enjoy working with people or teams?',
  'Are you interested in business, finance, or economics?',
  'Do you enjoy writing and analyzing literature?',
  'Would you prefer practical experiments over theoretical study?',
  'Do you find interest in history and culture?',
  'Are you comfortable with computer-based tasks?',
  'Would you consider a career in healthcare or biology?',
];


const recommendMajor = async (req, res) => {
  try {
    console.log('Received request to recommendMajor:');
    const { grades, selectedRoute, answers } = req.body;

    if (!grades || !selectedRoute || !answers) {
      return res.status(400).json({ status: 'failed', message: 'Missing grades, selectedRoute, or answers' });
    }

    // Map questions to answers safely
    const qaPairs = interestQuestions.map((q, i) => {
      const ans = answers[i] || 'No answer';
      return `${q}: ${ans}`;
    }).join('\n');

    const prompt = `
Based on the following grades, selected school route, and interest answers, recommend 3 university majors (each one on a line) and explain your reasoning in one sentence for each.

Grades: ${JSON.stringify(grades, null, 2)}
Selected Route: ${selectedRoute}
Interest Q&A:
${qaPairs}
`;

    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
      stream: false
    });

    const recommendation = ollamaResponse.data.response.trim();
    console.log('Ollama response:', recommendation);
    res.json({ status: 'ok', recommendation });

  } catch (err) {
    console.error('Error in recommendMajor:', err);
    res.status(500).json({ status: 'failed', message: err.message });
  }
};



module.exports = {
  recommendMajor
};
