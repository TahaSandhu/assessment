import axios from 'axios';

// Backend Auth API
const api = axios.create({
  baseURL: 'http://localhost:5050/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signupApi = async (data: any) => {
  return api.post('/signup', data);
};

export const verifyOtpApi = async (data: any) => {
  return api.post('/verify-otp', data);
};

export const loginApi = async (data: any) => {
  return api.post('/login', data);
};

const dummyApi = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodosApi = async (limit = 10) => {
  return dummyApi.get(`/todos?limit=${limit}`);
};

export const addTodoApi = async (todo: string, userId: number = 5) => {
  return dummyApi.post('/todos/add', {
    todo,
    completed: false,
    userId,
  });
};

export const updateTodoApi = async (id: string | number, completed: boolean) => {
  return dummyApi.put(`/todos/${id}`, { completed });
};

export const deleteTodoApi = async (id: string | number) => {
  return dummyApi.delete(`/todos/${id}`);
};

export default api;
