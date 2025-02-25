"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BlogList() {
  const [blogs, setBlogs] = useState<
    {
      id: string;
      title: string;
      content: string;
      author: string;
      created_at: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://staging-blogcore-o2z2.encr.app/blogs"
        );
        console.log(response);
        setBlogs(response?.data?.blogs);
      } catch(err) {
        console.log(err);
        setError("failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-lg text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-10 drop-shadow-lg">
        {`Andrew's`} Blog
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
              {blog.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}