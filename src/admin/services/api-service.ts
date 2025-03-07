import axios from "axios";
import { SignUpData, LoginData, VerificationData } from "../type/types";

const { VITE_ENDPOINT } = import.meta.env;

const token = localStorage.getItem('token')

export const CreateAccount = async (userData: SignUpData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/admins/auth`, userData);
    return response.data;
};

export const LoginUser = async (userData: LoginData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/admins/auth/login`, userData);
    return response.data;
};

export const verifyEmail = async (verificationData: VerificationData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/admins/auth/secrets?email=${verificationData.email}`, verificationData);
    return response.data;
};

export const getAdmin = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/admins`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}