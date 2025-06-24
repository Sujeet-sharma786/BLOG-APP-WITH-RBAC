import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const WriteBook = () => {
  const [pages, setPages] = useState([{ title: '', content: '' }]);
  const [activePublish,setActivePublish] = useState(false);
 
  const navigate = useNavigate();


  const handleContentChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index].content = value;
    setPages(updatedPages);
  };

  const handleTitleChange = (index, value) => {
    const updatedPages = [...pages];
    updatedPages[index].title = value;
    setPages(updatedPages);
  };

  const addNewPage = () => {
    setPages([...pages, { title: '', content: '' }]);
  };

  const handlePublish = async () => {
    setActivePublish(true);
    setTimeout(()=>{

    },3000)
    
    try{
      const response = await  fetch('http://localhost:5000/api/authors/book-store',{
        method:"POST",
        body:JSON.stringify({pages}),
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem('auth')}`
        }
      });
      if(response.ok){
          alert('Book Published!');
          navigate('/book-store')
          setActivePublish(false);
         
      }else{
        setActivePublish(false);
      } 
    }catch(err){
      console.log('Error occured: ',err);
      // etActivePublish(false);
    }
   
    
    
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-[#001F3F] mb-6">📚 author's corner 📚</h1>

      {pages.map((page, index) => (
        <div
          key={index}
          className="bg-white shadow-lg border border-gray-300 mb-8"
          style={{
            width: '794px',
            height: '1123px',
            padding: '40px',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="absolute top-2 right-4 text-sm text-gray-400">
            Page {index + 1}
          </div>

          <input
            type="text"
            value={page.title}
            onChange={(e) => handleTitleChange(index, e.target.value)}
            placeholder="Page Title"
            className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-300 focus:outline-none"
          />

          <textarea
            id="content-input"
            value={page.content}
            onChange={(e) => handleContentChange(index, e.target.value)}
            placeholder="Start writing here..."
            className="w-full resize-none border-none outline-none text-gray-800 text-base"
            style={{ flexGrow: 1 }}
          />
        </div>
      ))}

      <div className="flex space-x-4 mt-4">
        <button
          onClick={addNewPage}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          ➕ Add Page
        </button>
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          🚀 Publish
        </button>
        {
          activePublish &&
          <div className="flex justify-center items-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
        }
        
      </div>
    </div>
  );
};

export default WriteBook;
