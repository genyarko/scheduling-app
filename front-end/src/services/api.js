import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000", // Replace with your back-end URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a response interceptor for global error handling
api.interceptors.response.use(
    (response) => response, // Success: return the response
    (error) => {
        // Handle errors globally
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Create a new meeting
export const createMeeting = (meetingData) => api.post("/meetings", meetingData);

// Get all scheduled meetings
export const getMeetings = () => api.get("/meetings");

// Cancel a meeting
export const cancelMeeting = (id) => api.delete(`/meetings/${id}`);

// Fetch user availability
export const getUserAvailability = (userId) => api.get(`/users/${userId}/available-slots`);