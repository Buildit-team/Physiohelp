import { useNavigate } from "react-router-dom";
import { ColumnT } from "../../../interface/addProduct";
import Table from "../../../utils/Table";
import { IBlog } from "../../../interface/blog";
import { blogs } from "./data";

// Types for the blog data

// Table column configuration
const columns: ColumnT<IBlog>[] = [
  {
    key: 'name',
    header: 'Blog Name',
    sortable: true,
    searchable: true,
    isImageWithText: true,
    imageWithTextConfig: {
      imageKey: 'image',
      textKey: 'name',
      imageConfig: {
        width: '40px',
        height: '40px',
        className: 'rounded-md',
        fallbackSrc: '/placeholder.jpg'
      }
    }
  },
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    searchable: true
  },
  {
    key: 'totalViews',
    header: 'Total Views',
    sortable: true,
    searchable: true
  }
];

const BlogManagment: React.FC = () => {
  const navigate = useNavigate()
  const handleView = (blog: IBlog) => {
    console.log('Viewing blog:', blog.name);
  };

  const handleEdit = (blog: IBlog) => {
    console.log('Editing blog:', blog.name);
  };

  const handleDelete = (blog: IBlog) => {
    console.log('Deleting blog:', blog.name);
  };
  const filterOption = [
    { label: 'All', value: 'all' },
    { label: 'High Views (>10k)', value: 'high' },
    { label: 'Low Views (<10k)', value: 'low' }
  ];
  const buttons = [
    {
      label: 'Add Blog',
      onClick: () => navigate('/admin/add-blog'),
      variant: 'primary' as const
    },

  ];
  return (
    <Table
      data={blogs}
      columns={columns}
      actions={{
        onView: handleView,
        onEdit: handleEdit,
        onDelete: handleDelete
      }}
      searchPlaceholder="Search blogs..."
      itemsPerPage={5}
      dateFilterKey="date"
      filterOptions={filterOption}
      buttons={buttons}
    />
  );
};

export default BlogManagment;