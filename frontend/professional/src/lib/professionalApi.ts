import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/professional',
});

export const fetchPatients = async () => {
  const response = await apiClient.get('/patients');
  return response.data;
};

export const createNote = async (note: any) => {
  const response = await apiClient.post('/notes', note);
  return response.data;
};

export const sendMessage = async (message: any) => {
  const response = await apiClient.post('/messages', message);
  return response.data;
};