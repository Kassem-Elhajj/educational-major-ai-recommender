const axios = require('axios');
const Result = require('../models/Result');
const User = require('../models/User');

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
    const { grades, selectedRoute, answers, selectedMethod } = req.body;

    if (!grades || !selectedRoute || !answers || !selectedMethod) {
      return res.json({
        status: 'failed',
        message: 'Please fill all the survey.',
      });
    }

    // Check all subjects have a grade
    for (const subject of requiredSubjects) {
      if (grades[subject] === undefined || grades[subject] === null) {
        return res.json({
          status: 'failed',
          message: `Please fill all grades. Missing: ${subject}`,
        });
      }
    }

    if (!selectedRoute || selectedRoute.trim() === '') {
      return res.status(400).json({
        status: 'failed',
        message: 'Please select your school route.',
      });
    }

    if (answers.length !== interestQuestions.length) {
      return res.json({
        status: 'failed',
        message: 'Please answer all interest questions.',
      });
    }

    for (let i = 0; i < interestQuestions.length; i++) {
      const answer = answers[i];
      if (!answer || answer.trim() === '') {
        return res.json({
          status: 'failed',
          message: `Please answer question #${i + 1}: "${interestQuestions[i]}"`,
        });
      }
    }

    let recommendationText = '';
    let methodUsed = '';

    if (selectedMethod === 'AI') {
      // === AI MODE ===
      const qaPairs = interestQuestions
        .map((q, i) => `${q}: ${answers[i]}`)
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

      const ollamaResponse = await axios.post(
        'http://localhost:11434/api/generate',
        {
          model: 'mistral',
          prompt: prompt,
          stream: false,
        }
      );

      recommendationText = ollamaResponse.data.response.trim();
      methodUsed = 'AI';

    } else if (selectedMethod === 'Rule-based') {
      // === RULE-BASED MODE ===

      const majors = [];
      const explanations = [];

      // Example rule #1
      if (grades['Math'] >= 80 && answers[0] === 'Yes') {
        majors.push('Mathematics');
        explanations.push(
          'Your high Math grade and interest in logical problems suggest Mathematics as a strong option.'
        );
      }

      // Example rule #2
      if (grades['Biology'] >= 80 && answers[9] === 'Yes') {
        majors.push('Biology');
        explanations.push(
          'Your interest in healthcare and strong Biology performance suggest Biology as a good fit.'
        );
      }

      // Example rule #3
      if (answers[1] === 'Yes' || answers[8] === 'Yes') {
        majors.push('Computer Science');
        explanations.push(
          'Your interest in programming and technology makes Computer Science an appealing choice.'
        );
      }

      // Example rule #4
      if (grades['Economic'] >= 70 && answers[4] === 'Yes') {
        majors.push('Economics');
        explanations.push(
          'Your good grade in Economics and interest in business suggest Economics as a recommended major.'
        );
      }

      // Example rule #5
      if (answers[5] === 'Yes') {
        majors.push('Literature');
        explanations.push(
          'Your interest in writing and analyzing literature points toward Literature as a suitable major.'
        );
      }

      // Fill up to 5 recommendations if less found
      while (majors.length < 5) {
        majors.push('General Studies');
        explanations.push('A versatile option for exploring multiple fields.');
      }

      recommendationText = majors
        .map((major, i) => `${major}: ${explanations[i]}`)
        .join('\n');

      methodUsed = 'Rule-based';
    } else {
      return res.json({
        status: 'failed',
        message: `Unknown method selected: ${selectedMethod}`,
      });
    }

    const user = req.user;
    const userId = user.userId;

    await Result.create({
      userId: userId,
      resulttxt: recommendationText,
      type: methodUsed,
    });

    return res.json({
      status: 'ok',
      recommendation: recommendationText,
    });

  } catch (err) {
    console.error('Error in recommendMajor:', err);
    return res.status(500).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  recommendMajor,
};
