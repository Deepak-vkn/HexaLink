import { useSearchParams, useNavigate } from 'react-router-dom';

function Error() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorCode = searchParams.get('code') || '500'; 

  const errorMessage = () => {
    switch (errorCode) {
      case '403':
        return 'Access forbidden';
      case '404':
        return 'Page not found';
      case '500':
        return 'Internal server error';
      default:
        return 'An unexpected error occurred';
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Error {errorCode}</h1>
      <p className="text-lg mb-6">{errorMessage()}</p>
      <div className="space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default Error;
