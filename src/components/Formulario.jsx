import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(20, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                    .email('Email no válido')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .integer('El número no es válido')
                    .positive('El número no es válido')
                    .typeError('El número no es válido')

    })

    const handleSubmit = async (valores) => {
        try {
            const url = "http://localhost:4000/clientes"

            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(respuesta)
            const resultado = await respuesta.json()
            console.log(resultado)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar cliente</h1>
        <Formik
            initialValues={{
                nombre: "",
                empresa: "",
                email: "",
                telefono: "",
                notas: "",
            }}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            validationSchema={nuevoClienteSchema}
        >
             {({errors, touched}) => {
                return (
            <Form
                className='mt-10'
            >
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='nombre'
                    >Nombre:</label>
                    <Field 
                        id="nombre"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Nombre del Cliente"
                        name="nombre"
                    />
                    {errors.nombre && touched.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='empresa'
                    >Empresa:</label>
                    <Field 
                        id="empresa"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Empresa del Cliente"
                        name="empresa"
                    />
                    {errors.empresa && touched.empresa ? (
                        <Alerta>{errors.empresa}</Alerta>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='email'
                    >Email:</label>
                    <Field 
                        id="email"
                        type="email"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Email del Cliente"
                        name="email"
                    />
                    {errors.email && touched.email ? (
                        <Alerta>{errors.email}</Alerta>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='telefono'
                    >Teléfono:</label>
                    <Field 
                        id="telefono"
                        type="tel"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Teléfono del Cliente"
                        name="telefono"
                    />
                    {errors.telefono && touched.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <label
                        className='text-gray-800'
                        htmlFor='notas'
                    >Notas:</label>
                    <Field
                        as="textarea" 
                        id="notas"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-100"
                        placeholder="Notas del Cliente"
                        name="notas"
                    />
                </div>
                <input 
                    type="submit"
                    value="Agregar Cliente"
                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                />
            </Form>
        
    )}}
        </Formik>
    </div>
  )
}

export default Formulario