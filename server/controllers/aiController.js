const { GoogleGenerativeAI } = require("@google/generative-ai");
const Resume = require("../models/Resume");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to call Gemini
const callGemini = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);

  return result.response.text();
};

// Full resume analysis
const analyzeResume = async (req, res) => {
  try {
    const { resumeId, targetRole } = req.body;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const resumeText = JSON.stringify(resume, null, 2);

    const prompt = `
Analyze this resume for a "${targetRole || "general"}" position.

Resume:
${resumeText}

Give strengths, weaknesses and improvement suggestions.
`;

    const aiResponse = await callGemini(prompt);

    res.json({
      success: true,
      analysis: aiResponse,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Suggest improvements
const getSuggestion = async (req, res) => {
  try {
    const { section, content, role } = req.body;

    const prompt = `
Improve this ${section} section for a ${role || "professional"}:

${content}
`;

    const suggestion = await callGemini(prompt);

    res.json({
      success: true,
      suggestion,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ATS Score
const getAtsScore = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    const prompt = `
Compare this resume with the job description and give an ATS score (0-100).

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await callGemini(prompt);

    res.json({
      success: true,
      result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Improve bullet
const improveBullet = async (req, res) => {
  try {
    const { bullet, role } = req.body;

    const prompt = `
Rewrite this resume bullet point for a ${role || "professional"} role with strong action verbs.

Bullet:
${bullet}
`;

    const improved = await callGemini(prompt);

    res.json({
      success: true,
      improved,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getSuggestion,
  getAtsScore,
  improveBullet,
};