import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
const [categorias, setCategorias] = useState([]);
const [showCategorias, setShowCategorias] = useState(false);
const [busqueda, setBusqueda] = useState('');
const navigate = useNavigate();

useEffect(() => {
    const obtenerCategorias = async () => {
        try {
            const res = await fetch('https://vibra.icu/api/v1/category');
            const data = await res.json();
            setCategorias(data);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };
    obtenerCategorias();
}, []);

const handleBuscar = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    navigate(`/buscar/${busqueda}`);
};

return (
    <nav className="bg-sky-700 text-white px-10 py-3 shadow-md flex justify-between items-center relative pr-80 pl-80">
        <div className="flex items-center space-x-4">
            <div
            className="relative font-semibold cursor-pointer text-white"
            onMouseEnter={() => setShowCategorias(true)}
            onMouseLeave={() => setShowCategorias(false)}
        >
            Categorías
            {showCategorias && (
                <div className="absolute top-4 left-0 bg-gray-700 text-white shadow-md rounded w-56 mt-2 z-50 p-0.5">
                    {categorias.map((cat) => (
                        <div key={cat.id} className="hover:bg-gray-500 px-2 py-1 cursor-pointer">
                            {cat.name}
                        </div>
                    ))}
                </div>
            )}
            </div>
            
            <form onSubmit={handleBuscar} className="flex">
                <input
                type="text"
                placeholder="Buscar productos..."
                className="px-3 py-1 rounded-l border border-gray-300 text-black focus:outline-none"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                />
                <button type="submit" className="bg-yellow-400 text-black px-4 rounded-r hover:bg-yellow-500 transition">
                    Buscar
                </button>
            </form>
        </div>
        
        <div className="flex space-x-6 items-center text-sm font-medium">
            <button onClick={() => navigate('/mi-cuenta')} className="hover:underline">Mi cuenta</button>
            <button onClick={() => navigate('/mis-compras')} className="hover:underline">Mis compras</button>
            <button onClick={() => navigate('/carrito')} className="hover:underline">Carrito</button>
        </div>
    </nav>
    );
};

export default Navbar;
