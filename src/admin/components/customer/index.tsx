import { useNavigate } from "react-router-dom";
import customers from "./data";


const CustomerManagement = () => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {customers?.map((customer) => (
        <div
          key={customer.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[200px]"
        >
          <div className="w-full  overflow-hidden flex items-center justify-center"
          onClick={()=> navigate(`/admin/customer/${customer?.id}`)}
          >
            <img
              src={customer.image}
              alt={customer.name}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
              {customer.name}
            </h3>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm text-gray-500">Orders</p>
                <p className="font-medium text-[14px] text-gray-900">{customer.totalOrders}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Spent</p>
                <p className="font-medium text-[14px] text-gray-900">${customer.totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerManagement;