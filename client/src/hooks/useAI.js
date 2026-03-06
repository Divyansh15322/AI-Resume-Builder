import { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async (resumeId, targetRole) => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/analyze', { resumeId, targetRole });
      setAnalysis(data.analysis);
      toast.success('Analysis complete!');
      return data.analysis;
    } catch (err) {
      toast.error('AI analysis failed. Check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const getSuggestion = async (section, content, role) => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/suggest', { section, content, role });
      return data.suggestion;
    } catch (err) {
      toast.error('Failed to get AI suggestion');
    } finally {
      setLoading(false);
    }
  };

  const improveBullet = async (bullet, role) => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/improve-bullet', { bullet, role });
      return data.improved;
    } catch (err) {
      toast.error('Failed to improve bullet point');
    } finally {
      setLoading(false);
    }
  };

  const getAtsScore = async (resumeText, jobDescription) => {
    setLoading(true);
    try {
      const { data } = await api.post('/ai/ats-score', { resumeText, jobDescription });
      return data.result;
    } catch (err) {
      toast.error('Failed to get ATS score');
    } finally {
      setLoading(false);
    }
  };

  return { loading, analysis, analyzeResume, getSuggestion, improveBullet, getAtsScore };
};
