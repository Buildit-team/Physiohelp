import { useMemo, useCallback } from "react";
import Table from "../../../utils/Table";
import { ColumnT, Product } from "../../../interface/addProduct";

const OrderManagement = () => {
  const columns: ColumnT<Product>[] = useMemo(() => [
    {
      key: 'id',
      header: 'Order ID',
      sortable: false,
    },
    {
      key: 'name',
      header: 'Products',
      sortable: false,
      isImageWithText: true,
      imageWithTextConfig: {
        imageKey: 'productImage',
        textKey: 'name',
        imageConfig: {
          width: '48px',
          height: '48px',
          className: 'rounded-md',
          fallbackSrc: '/placeholder-product.png'
        }
      }
    },
    {
      key: 'added',
      header: 'Added',
      sortable: true,
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (value) => (
        <div className="flex flex-col">
          <span className="font-medium">{value.name}</span>
        </div>
      )
    },
    {
      key: 'price',
      header: 'Total',
      sortable: true,
      render: (value) => `$${value.toFixed(2)}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${value === 'Low Stock'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
            }`}
        >
          {value}
        </span>
      ),
    },
  ], []);

  const filterOptions = useMemo(() => [
    { label: 'All Order', value: 'all' },
    { label: 'Processing', value: 'published' },
    { label: 'Delivered', value: 'low stock' },
    { label: 'Cancelled', value: 'low stock' }
  ], []);

  const handleEdit = useCallback((product: Product) => {
    console.log('Edit product:', product);
  }, []);

  const handleDelete = useCallback((product: Product) => {
    console.log('Delete product:', product);
  }, []);

  const handleView = useCallback((product: Product) => {
    console.log('View product:', product);
  }, []);

  return (
    <Table
      data={products}
      columns={columns}
      searchPlaceholder="Search Products..."
      actions={{
        onEdit: handleEdit,
        onDelete: handleDelete,
        onView: handleView,
      }}
      filterOptions={filterOptions}
      filterKey="status"
    />
  );
};

export default OrderManagement;