import React, { useState } from 'react';

const AddBlogs = () => {
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [image,setImage] = useState([]);

  console.log('image uploaded',image)

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;

  //   if (name === 'image') {
  //     setFormData((prev) => ({ ...prev, image: files[0] }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data
    const formData = new FormData();
    formData.append('title',title);
    formData.append('desc',desc);
    formData.append('image',image);

    try {
      const res = await fetch('http://localhost:5000/api/blogs/post-blogs', {
        method: 'POST',
        headers: {
      
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert('Blog created successfully!');
        console.log('Result:', result);
   
      } else {
        alert(result.message || 'Failed to post blog.');
      }
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('An error occurred while posting blog.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 p-4 border rounded shadow-md bg-white space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Add New Blog</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="desc"
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          placeholder="Write something..."
          rows={5}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          name="image"
         
          onChange={(e)=>setImage(e.target.files[0])}
          className="mt-1 block w-full text-sm text-gray-500"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
        >
          Add Blog
        </button>
      </div>
    </form>
  );
};

export default AddBlogs;
