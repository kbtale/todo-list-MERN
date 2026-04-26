import axios from "./axios";

export const getTasksRequest = () => axios.get("/tasks");
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);
export const createTaskRequest = (task) => axios.post("/tasks", task);
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);

// Oracle Endpoints
export const getOracleSuggestionRequest = () => axios.get("/tasks/oracle");
export const manifestTaskRequest = (id) => axios.post(`/tasks/${id}/manifest`);
export const deferTaskRequest = (id) => axios.post(`/tasks/${id}/defer`);
export const getStatsRequest = () => axios.get("/tasks/oracle/stats");
export const updateEnergyRequest = (energyLevel) => axios.post("/users/energy", { energyLevel });
