    import { useState } from 'react';
    import { useNavigate } from 'react-router-dom';

    const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!correo || !contrasena) {
        setError('Todos los campos son obligatorios');
        return;
        }
        try {
        const response = await fetch('https://vibra.icu/api/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena })
        });
        if (!response.ok) {
            const data = await response.json();
            setError(data.msg || 'Error al iniciar sesión');
            return;
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('expirationDate', data.expirationDate);
        navigate('/products');
        } catch (err) {
        setError('Error de red o del servidor');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
            <div className="mb-4">
            <label className="block mb-1 font-medium">Correo</label>
            <input
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="correo@correo.com"
                required
            />
            </div>
            <div className="mb-6">
            <label className="block mb-1 font-medium">Contraseña</label>
            <input
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="********"
                required
            />
            </div>
            <button type="submit" className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-800 transition">Ingresar</button>
        </form>
        </div>
    );
    };

    export default Login; 