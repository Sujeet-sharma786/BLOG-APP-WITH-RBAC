import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;

  if (!book) {
    return (
      <div className="text-center mt-10 text-red-600">
        No book data found. <span onClick={() => navigate('/')} className="underline cursor-pointer text-blue-600">Go back</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-[#001F3F] mb-6">📖 Book Preview</h1>

      {book.pages.map((page, index) => (
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

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {page.title || 'Untitled Page'}
          </h2>

          <p className="text-base text-gray-700 whitespace-pre-wrap" style={{ flexGrow: 1 }}>
            {page.content || 'No content.'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
