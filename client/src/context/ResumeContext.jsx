import { createContext, useContext, useReducer, useCallback } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const ResumeContext = createContext(null);

const initialState = {
  resumes: [],
  currentResume: null,
  loading: false,
  saving: false,
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.payload };
    case 'SET_SAVING': return { ...state, saving: action.payload };
    case 'SET_RESUMES': return { ...state, resumes: action.payload };
    case 'SET_CURRENT': return { ...state, currentResume: action.payload };
    case 'UPDATE_CURRENT': return { ...state, currentResume: { ...state.currentResume, ...action.payload } };
    case 'ADD_RESUME': return { ...state, resumes: [action.payload, ...state.resumes] };
    case 'REMOVE_RESUME': return { ...state, resumes: state.resumes.filter(r => r._id !== action.payload) };
    default: return state;
  }
};

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const fetchResumes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data } = await api.get('/resumes');
      dispatch({ type: 'SET_RESUMES', payload: data.resumes });
    } catch (err) {
      toast.error('Failed to load resumes');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchResume = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { data } = await api.get(`/resumes/${id}`);
      dispatch({ type: 'SET_CURRENT', payload: data.resume });
      return data.resume;
    } catch (err) {
      toast.error('Failed to load resume');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createResume = useCallback(async (resumeData = {}) => {
    try {
      const { data } = await api.post('/resumes', { title: 'Untitled Resume', ...resumeData });
      dispatch({ type: 'ADD_RESUME', payload: data.resume });
      return data.resume;
    } catch (err) {
      toast.error('Failed to create resume');
    }
  }, []);

  const saveResume = useCallback(async (id, resumeData) => {
    dispatch({ type: 'SET_SAVING', payload: true });
    try {
      const { data } = await api.put(`/resumes/${id}`, resumeData);
      dispatch({ type: 'SET_CURRENT', payload: data.resume });
      toast.success('Resume saved!');
      return data.resume;
    } catch (err) {
      toast.error('Failed to save resume');
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, []);

  const deleteResume = useCallback(async (id) => {
    try {
      await api.delete(`/resumes/${id}`);
      dispatch({ type: 'REMOVE_RESUME', payload: id });
      toast.success('Resume deleted');
    } catch (err) {
      toast.error('Failed to delete resume');
    }
  }, []);

  const updateCurrent = useCallback((data) => {
    dispatch({ type: 'UPDATE_CURRENT', payload: data });
  }, []);

  return (
    <ResumeContext.Provider value={{ ...state, fetchResumes, fetchResume, createResume, saveResume, deleteResume, updateCurrent }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
