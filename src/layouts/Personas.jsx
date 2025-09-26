import { Fragment, useEffect, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PERSONAS_KEY = 'personas'
const colorLabel = (c)=> c === 'red' ? 'Rojo' : c==='yellow' ? 'Amarillo' : c==='green' ? 'Verde' : 'Gris'


const Personas = () =>{
    const [personas, setPersonas] = useState([])

    const navigate = useNavigate()

    const cargarPersonas = () =>{
        const data = localStorage.getItem(PERSONAS_KEY)
        const formatedData = data ? JSON.parse(data) : []
        setPersonas(formatedData) 
    }
    
    useEffect(()=>{        
        cargarPersonas()
    },[])

    console.log("personas", personas);

    const colorTemplate = (row) => colorLabel(row?.color)
    const fechaTemplate = (row) => {
        const date = new Date(row?.createdAt)
        return(
            <Fragment>
                {date ? `Dia ${date.getDate()} del ${date.getMonth()} del ${date.getFullYear()}` :row?.createdAt}
            </Fragment>
        )
    
    }

    const borarPersona = (id) =>{
        Swal.fire({
            title: 'Esta seguro de eliminar la persona?',
            text:'Esta accion no se puede deshacer',
            icon: 'warning',
            showCancelButton:true,
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((action)=>{
            if(action.isConfirmed){
                const data = localStorage.getItem(PERSONAS_KEY)
                const arr = data ? JSON.parse(data) : []
                arr.splice(id,1)
                localStorage.setItem(PERSONAS_KEY, JSON.stringify(arr))
                setPersonas(arr)
            }
        })
    }

    const accionesTemplate = (row, opts) =>{
        const id = opts.rowIndex
        return(
            <div>
                <Button icon='pi pi-trash' label="Eliminar" onClick={()=> borarPersona(id)}/>
                <Button icon='pi pi-pencil' label="Editar" onClick={() => navigate(`/tarjeta/${id}`)}/>
            </div>
        )
    }

    return(
        <Card title='Personas guardadas'>
            <div>
                <Button label="Refrescar" onClick={() => cargarPersonas()}/>
                <Button label='Ir a la home' onClick={()=> navigate('/')}/>
                <Button label='Nueva persona' onClick={()=> navigate('/tarjeta')}/> 
            </div>
            <DataTable value={personas} emptyMessage='No hay personas registradas'>
                <Column field='nombre' header='Nombre'/>
                <Column field='email' header='Email'/>
                <Column header='Color' body={colorTemplate}/>
                <Column header='Fecha de creacion' body={fechaTemplate}/>
                <Column header= 'Acciones' body={accionesTemplate}/>

            </DataTable>
        </Card>
    )
    
}
export default Personas