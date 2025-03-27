import { useNavigate } from "react-router-dom";
import { ColumnT } from "../../../interface/addProduct";
import Table from "../../../utils/Table";
import { IBlog } from "../../../interface/blog";
import { useQuery } from 'react-query';
import { getBlogs } from '../../services/api-service';
import toast from 'react-hot-toast';
import { useState } from "react";



const columns: ColumnT<IBlog>[] = [
  {
    key: 'blog_topic',
    header: 'Blog Name',
    sortable: true,
    searchable: true,
    isImageWithText: true,
    imageWithTextConfig: {
      imageKey: 'cover_image',
      textKey: 'blog_topic',
      imageConfig: {
        width: '40px',
        height: '40px',
        className: 'rounded-md',
        fallbackSrc: '/placeholder.jpg'
      }
    }
  },
  {
    key: 'created_at',
    header: 'Date',
    sortable: true,
    searchable: true
  },
];

const BlogManagment: React.FC = () => {
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState<IBlog[]>([]);  

  useQuery('blogs', getBlogs, {
    onSuccess: (fetchedData) => {
      console.log("Fetched products:", fetchedData);
      setBlogs(fetchedData);
    },
    onError: (error: any) => {
      toast.error('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    }
  });

  const handleView = (blog: IBlog) => {
    console.log('Viewing blog:', blog.blog_topic);
  };

  const handleEdit = (blog: IBlog) => {
    console.log('Editing blog:', blog.blog_topic);
  };

  const handleDelete = (blog: IBlog) => {
    console.log('Deleting blog:', blog.blog_topic);
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
      dateFilterKey="created_at"
      filterOptions={filterOption}
      buttons={buttons}
    />
  );
};

export default BlogManagment;