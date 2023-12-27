import axios from "axios";

const BASE_URL = 'http://localhost:3000';


export const getAllUsers = async () => {
    return axios.get(`${BASE_URL}/users`).then(res=>res.data)
}

export const addUser = async (user) => {
    return await axios.post(`${BASE_URL}/users`,user);
}

export const deleteUser = async (id) => {
    return await axios.delete(`${BASE_URL}/users/${id}`);
}