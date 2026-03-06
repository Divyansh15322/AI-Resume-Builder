const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'Untitled Resume' },
    template: { type: String, default: 'modern' },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
      summary: String,
    },

    experience: [
      {
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        current: { type: Boolean, default: false },
        description: String,
        bullets: [String],
      },
    ],

    education: [
      {
        institution: String,
        degree: String,
        field: String,
        location: String,
        startDate: String,
        endDate: String,
        gpa: String,
        honors: String,
      },
    ],

    skills: {
      technical: [String],
      soft: [String],
      languages: [String],
      tools: [String],
    },

    projects: [
      {
        name: String,
        description: String,
        techStack: [String],
        liveUrl: String,
        githubUrl: String,
        bullets: [String],
      },
    ],

    certifications: [
      {
        name: String,
        issuer: String,
        date: String,
        credentialId: String,
        url: String,
      },
    ],

    aiAnalysis: {
      atsScore: Number,
      overallScore: Number,
      strengths: [String],
      weaknesses: [String],
      suggestions: [String],
      keywords: {
        present: [String],
        missing: [String],
      },
      lastAnalyzed: Date,
    },

    isPublic: { type: Boolean, default: false },
    targetRole: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
