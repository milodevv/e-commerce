    import { useEffect, useState } from 'react';

    const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://vibra.icu/api/v1/products');
            if (!response.ok) throw new Error('Error al obtener productos');
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : [data]);
        } catch (err) {
            setError('No se pudieron cargar los productos');
        } finally {
            setLoading(false);
        }
        };
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-10">Productos</h1>
        {loading ? (
            <div className="flex justify-center items-center h-64">
            <svg className="animate-spin h-10 w-10 text-sky-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            </div>
        ) : error ? (
            <div className="text-center text-red-600">{error}</div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
                <div key={product.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-contain mb-4 bg-gray-50" />
                <h2 className="font-bold text-lg mb-1 text-center">{product.name}</h2>
                <p className="text-gray-500 mb-1 text-center">{product.brand}</p>
                <p className="font-bold text-sky-700 text-xl mb-2">${product.price}</p>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    };

    export default Products; 