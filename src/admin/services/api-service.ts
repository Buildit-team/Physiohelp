import axios from "axios";
import { SignUpData, LoginData, VerificationData } from "../type/types";
import { CartItems, CustomerInfo, IProduct } from "../../interface/addProduct";
import { AppointmentData } from "../../components/appointment/AppointmentPreview";

const { VITE_ENDPOINT } = import.meta.env;

// const { VITE_TOKEN } = import.meta.env;
const VITE_TOKEN = localStorage.getItem('token')

/// ADMIN
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
export const getAdminProduct = async (page: number, itemsPerPage: number) => {
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
    })
    return response.data.data
}
export const getAllPaidAppointment = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/sessions/paid`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
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

export const getAllCustomer = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/customers`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

export const getCustomerById = async (id: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/customers/${id}`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

export const getCustomerSummaryById = async (id: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/customers/${id}/summary`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

export const getCustomerTransactionById = async (id: string, type: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/customers/${id}/transactions?type=${type}`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

export const getAllOrder = async (page: number, limit: number) => {
    const offset = page;
    const response = await axios.get(`${VITE_ENDPOINT}/orders/?offset=${offset}&limit=${limit}`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}
export const getAllDoctors = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/admins/all`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

export const assignDoctor = async (adminId: string, sessionId: string) => {
    const response = await axios.patch(`${VITE_ENDPOINT}/sessions/assign?adminId=${adminId}&sessionId=${sessionId}`, {}, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}
export const getAdminDashboard = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/admins/dashboard`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}
export const getAdminBalance = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/admins/balance`, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`
        }
    })
    return response.data.data
}

////USER

export const getUserProduct = async (page: number, limit: number) => {
    const offset = page;
    const response = await axios.get(`${VITE_ENDPOINT}/products/?offset=${offset}&limit=${limit}`);
    return response.data;
}

export const getUserProductDetails = async (productId: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/products/${productId}`);
    return response?.data?.data?.product;
};

export const createCart = async (items: CartItems[], totalPrice: number) => {
    const response = await axios.post(`${VITE_ENDPOINT}/carts`, { items, totalPrice },);
    return response.data;
}

export const createOrder = async (customer_info: CustomerInfo, id: string) => {
    const response = await axios.post(`${VITE_ENDPOINT}/orders/carts/${id}`, { customer_info })
    return response.data;
}


export const completeOrder = async (id: string) => {
    const response = await axios.post(`${VITE_ENDPOINT}/payments/orders/${id}`)
    return response.data;
}

export const getAllSessionType = async () => {
    const response = await axios.get(`${VITE_ENDPOINT}/sessions/types`)
    return response.data.data
}

export const bookAppointment = async (data: AppointmentData) => {
    const response = await axios.post(`${VITE_ENDPOINT}/sessions`, data)
    return response.data
}

export const completeAppointmentBooking = async (id: string) => {
    const response = await axios.post(`${VITE_ENDPOINT}/sessions/${id}/payments`)
    return response.data;
}

export const getSeesionData = async (id: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/sessions/${id}`)
    return response.data.data
}

export const getCustomerActivity = async (email: string) => {
    const response = await axios.get(`${VITE_ENDPOINT}/customers/activiy/history?email=${email}`,)
    return response.data.data
}
