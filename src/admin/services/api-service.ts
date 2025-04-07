import axios from "axios";
import { SignUpData, LoginData, VerificationData } from "../type/types";
import { IProduct } from "../../interface/addProduct";

const { VITE_ENDPOINT } = import.meta.env;

// const { VITE_TOKEN } = import.meta.env;
const VITE_TOKEN = localStorage.getItem('token')

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

export const uploadProduct = async (uploadData: IProduct) => {
    const response = await axios.post(`${VITE_ENDPOINT}/products`, uploadData, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN
                }`
        }
    })
    return response.data;
}
export const getAdminProduct = async (page : number, itemsPerPage: number) => {
    const offset = page;
    const response = await axios.get(`${VITE_ENDPOINT}/admins/products/?offset=${offset}&limit=${itemsPerPage}`, {
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
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${VITE_ENDPOINT}/products/${id}`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateProduct = async (id: string, uploadEditedData: IProduct) => {
    const response = await axios.patch(`${VITE_ENDPOINT}/products/${id}`, uploadEditedData, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
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
    const response = await axios.get(`${VITE_ENDPOINT}/blogs`);
    return response.data.data;
}


export const getBlogsId = async (id: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/blogs/${id}`);
    return response.data.data;
}


export const getAllAppointment = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/sessions`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    });
    return response.data.data
}


export const AddAppointmentType = async (type: string, amount: string) => {
    const response = await axios.post(`${VITE_ENDPOINT}/sessions/types`, { type, amount }, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    });
    return response.data.data
}
