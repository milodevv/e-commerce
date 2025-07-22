import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Context
//import { ProductosProvider } from './context/ProductosProvider'

// Layout
//import LayoutAuth from './Layout/LayoutAuth'

// pages (productos)
//import ListaProductos from './pages/productos/ListaProductos'
//import FormularioProductos from './pages/productos/FormularioProductos'
//import DetalleProducto from './pages/productos/DetalleProducto'

function App() {
  return (
    <Router>
      <ProductosProvider>
        <Routes>
          <Route path='/' element={<LayoutAuth />}>
            <Route index element={<ListaProductos />} />
          </Route>
          <Route path='/products' element={<LayoutAuth />}>
            <Route index element={<ListaProductos />} />
            <Route path='agregar-producto' element={<FormularioProductos />} />
            <Route path='detalle-producto/:id' element={<DetalleProducto />} />
          </Route>
        </Routes>
      </ProductosProvider>
    </Router>
  )
}

export default App