import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'


const EditarCliente = () => {

  const {id} = useParams()

  const [cliente, setCliente ] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
      setCargando(!cargando)
      const obtenerClienteApi = async () => {
          try {
              const url = `${import.meta.env.VITE_API_URL}/${id}`
              const respueta = await fetch(url)
              const resultado = await respueta.json()

              setCliente(resultado)
          } catch (error) {
              console.log(error)
          }

          setCargando(false)
         
      }

      obtenerClienteApi()

  }, [])

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
      {cliente?.nombre ? (
      <Formulario 
        cliente={cliente}
        cargando={cargando}
      />
      ) : <p>Cliente ID no valido</p>}
    </>
  )
}

export default EditarCliente