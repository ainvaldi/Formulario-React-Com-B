import { useRef, useState, Fragment } from "react";
import {Card} from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {SelectButton} from 'primereact/selectbutton'
import {Button} from 'primereact/button'
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'

const opcionesColor = [
    {label:'Rojo', value:'red'},
    {label:'Amarillo', value:'yellow'},
    {label:'Verde', value:'green'},
]

const Tarjeta = () =>{
    const[nombre, setNombre] = useState("")
    const[color, setColor] = useState('gray')
    const toast = useRef(null)

    const guardarEnLocalStorage = (persona) =>{
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente):[]
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))   
    }

    const confirmarFormulario = ()=>{
        Swal.fire({
            title:'¿Desea confirmar los datos?',
            text:`Nombre: ${nombre || "Sin nombre"} | Color: ${color !== 'gray' ? opcionesColor.find((item)=>item.value === color).label : 'Gris'}`,
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Si, guardar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){

                guardarEnLocalStorage({
                    nombre: nombre || 'Sin nombre',
                    color: color || 'Sin color',
                    createdAt: new Date()
                })

                toast.current?.show({
                    severity:'success',
                    summary:'Guardado',
                    detail:'Tarjeta de presentación guardada'
                })
            }
        })
    }

    return(
        <Fragment>
            <Toast ref={toast}/>

            <Card title='Tarjeta de presentación'>
                <div className="p-fluid" style={{display:'grid'}}>
                    <span className="p-float-label">
                        <InputText
                        id="nombre"
                        value={nombre}
                        onChange={(e)=>setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>

                    <div>
                        <small>Color de fondo</small>
                        <SelectButton
                        value={color}
                        onChange={(e)=>setColor(e.value)}
                        options={opcionesColor}
                        />
                    </div>

                    <div
                    style={{
                        backgroundColor: color,
                        borderRadius:12,
                        padding:16
                    }}
                    >
                        <h2>Hola, soy {nombre || '_______'}</h2>
                        <p>Mi color favorito es {color !== 'gray' ? opcionesColor.find((item)=>item.value === color).label : 'Gris'}</p>
                    </div>

                    <div style={{display:'flex'}}>
                        <Button 
                        label="Guardar"
                        icon='pi pi-check'
                        severity="success"
                        onClick={()=>confirmarFormulario()}
                        />
                        <Button
                        label="Limpiar"
                        icon='pi pi-eraser'
                        severity="secondary"
                        onClick={()=>{
                            setNombre("")
                            setColor('gray')
                        }} 
                        />
                    </div>
                </div>
            </Card>
        </Fragment>
    )

}

export default Tarjeta


