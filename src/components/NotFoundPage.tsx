import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg">La página que estás buscando no pudo ser encontrada.</p>
      <Link to={'/'} className='text-blue-600 font-black'>Ir al inicio</Link>
    </div>
  );
};

export default NotFoundPage;
