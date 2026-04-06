import axios from "axios";

const retryRequest = async (
  fn: () => Promise<any>,
  retries = 3,
  delay = 1000,
) => {
  try {
    return await fn();
  } catch (err: any) {
    if (err.response?.status === 429 && retries > 0) {
      await new Promise((res) => setTimeout(res, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw err;
  }
};

const api = axios.create({
  baseURL: "http://localhost:5050/api/auth",
  headers: { "Content-Type": "application/json" },
});

export const signupApi = (data: any) => api.post("/signup", data);
export const verifyOtpApi = (data: any) => api.post("/verify-otp", data);
export const loginApi = (data: any) => api.post("/login", data);

const dummyApi = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

export const fetchTodosApi = (limit = 10) =>
  retryRequest(() => dummyApi.get(`/todos?limit=${limit}`));

export const addTodoApi = (todo: string, userId: number = 5) =>
  retryRequest(() =>
    dummyApi.post("/todos/add", { todo, completed: false, userId }),
  );

export const updateTodoApi = (id: string | number, completed: boolean) =>
  retryRequest(() => dummyApi.put(`/todos/${id}`, { completed }));

export const deleteTodoApi = (id: string | number) =>
  retryRequest(() => dummyApi.delete(`/todos/${id}`));

export default api;
