import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllCustomer } from "../../services/api-service";
import { useState } from "react";
import { CustomerAnalytics } from "../../../interface/customer";

const CustomerManagement = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<CustomerAnalytics[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
 

  const { isLoading, error, refetch } = useQuery('customers', getAllCustomer, {
    onSuccess: (data) => {
      setCustomers(data);
    }
  });

  const filteredCustomers = customers.filter(customer =>
    customer.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-600">Loading customers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-lg font-medium text-red-600 mb-4">Error loading customers</div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => refetch()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-600">No customers found</div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No customers found matching "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCustomers.map((customer) => (
            <div
              key={customer.customer.customer_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className="w-full pt-6 pb-2 overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => navigate(`/admin/customer/${customer.customer.customer_id}`)}
              >
                <img
                  src="/user.svg"
                  alt={customer.customer.name}
                  className="w-16 h-16 rounded-full object-cover bg-gray-100 p-2"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 text-center mb-2 truncate" title={customer.customer.name}>
                  {customer.customer.name}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4 truncate" title={customer.customer.email || "No email available"}>
                  {customer.customer.email || "No email available"}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="text-center flex-1">
                    <p className="text-sm text-gray-500">Orders</p>
                    <p className="font-medium text-gray-900">{customer.total_orders}</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-sm text-gray-500">Spent</p>
                    <p className="font-medium text-gray-900">${customer.total_spent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div
                className="bg-blue-50 px-4 py-2 text-center text-blue-600 font-medium text-sm cursor-pointer hover:bg-blue-100"
                onClick={() => navigate(`/admin/customer/${customer.customer.customer_id}`)}
              >
                View Details
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;