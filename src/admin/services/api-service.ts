import axios from "axios";
import { SignUpData, LoginData, VerificationData } from "../type/types";
import { ProductFormData } from "../../interface/addProduct";

const { VITE_ENDPOINT } = import.meta.env;

const { VITE_TOKEN } = import.meta.env;
// const token = localStorage.getItem('token')

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
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    });
    return response.data;
}

export const uploadProduct = async (uploadData: ProductFormData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/products`, uploadData, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN
                }`
        }
    })
    return response.data;
}
export const getAdminProduct = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/admins/products`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    });
    return response.data;
}
export const getProductById = async (productId: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/products/${productId}`);
    return response?.data?.data?.product;
};
export const uploadProductImage = async (formData: FormData, id: string) => {
    const response = await axios.post(`${VITE_ENDPOINT}/products/${id}/uploads`, formData, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
            "Content-Type": "multipart/form-data", // Ensure correct header
        },
    });
    return response.data;
};


export const uploadBlog = async (blogData: FormData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/blogs`, blogData, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getBlogs = async () => {
    const response =  await axios.get(`${VITE_ENDPOINT}/blogs`);
    return response.data.data;
}

export const getBlogsId = async (id: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/blogs/${id}`);
    return response.data.data;
}