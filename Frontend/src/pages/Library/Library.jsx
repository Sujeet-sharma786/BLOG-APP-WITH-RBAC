import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://publish-story.onrender.com/api/authors/list-books', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth')}`
          }
        });

        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading books...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">📚 Your Books</h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => navigate(`/book/${book._id}`,{state:{book}})}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-5"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-1">
                {book.pages?.[0]?.title || 'Untitled Book'}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                {book.pages?.[0]?.content?.slice(0, 80) || 'No content'}...
              </p>
              <p className="text-xs text-gray-400">
                Created on: {new Date(book.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;
