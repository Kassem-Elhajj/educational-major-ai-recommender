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

const requiredSubjects = [
  'Math', 'Physics', 'Chemistry', 'Biology', 'English', 'Arabic',
  'Economic', 'History', 'Geography', 'Civics',
  'Social Science', 'Informatics', 'Philosophy'
];

const recommendMajor = async (req, res) => {
  try {
    console.log('Received request to recommendMajor:');
    const { grades, selectedRoute, answers } = req.body;

    if (!grades || !selectedRoute || !answers) {
      return res.json({ status: 'failed', message: 'Please fill all the survey.' });
    }

    // Check all subjects have a grade
    for (const subject of requiredSubjects) {
      if (
        grades[subject] === undefined ||
        grades[subject] === null
      ) {
        return res.json({ status: 'failed', message: `Please fill all grades. Missing: ${subject}` });
      }
    }

    // Check selected route
    if (!selectedRoute || selectedRoute.trim() === '') {
      return res
        .status(400)
        .json({ status: 'failed', message: 'Please select your school route.' });
    }

    // Check all answers are present
    if (answers.length !== interestQuestions.length) {
      return res.json({ status: 'failed', message: 'Please answer all interest questions.' });
    }

    for (let i = 0; i < interestQuestions.length; i++) {
      const answer = answers[i];
      if (!answer || answer.trim() === '') {
        return res.json({ status: 'failed', message: `Please answer question #${i + 1}: "${interestQuestions[i]}"` });
      }
    }

    // Everything validated
    const qaPairs = interestQuestions
      .map((q, i) => {
        const ans = answers[i];
        return `${q}: ${ans}`;
      })
      .join('\n');

    const prompt = `
Based on the following grades, selected school route,
and interest answers, recommend 5 university majors (each one on a line)
and explain your reasoning in one sentence for each.
After each major name put this character ":".

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
    res.json({ status: 'ok', recommendation });

  } catch (err) {
    console.error('Error in recommendMajor:', err);
    res
      .status(500)
      .json({ status: 'failed', message: err.message });
  }
};

module.exports = {
  recommendMajor
};
