import { useRef, useState, Fragment, useEffect } from "react";
import {Card} from 'primereact/card'
import {InputText} from 'primereact/inputtext'
import {SelectButton} from 'primereact/selectbutton'
import {Checkbox} from 'primereact/checkbox'
import {Button} from 'primereact/button'
import { Toast } from 'primereact/toast';
import Swal from 'sweetalert2'
import { useParams, useNavigate } from "react-router-dom";

const opcionesColor = [
    {label:'Rojo', value:'red'},
    {label:'Amarillo', value:'yellow'},
    {label:'Verde', value:'green'},
]

const Tarjeta = () =>{
    const[nombre, setNombre] = useState("")
    const[color, setColor] = useState('gray')
    const[email, setEmail] = useState('')
    const[acepta, setAcepta] = useState(false)
    const toast = useRef(null)
    const {id} = useParams()    
    const editIndex = Number.isInteger(parseInt(id)) ? parseInt(id) : null
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(editIndex !== null){
            const data = localStorage.getItem('personas')
            const arr = data ? JSON.parse(data) : []
            const persona = arr[editIndex]

            if(persona){
                setNombre(persona.nombre || '')
                setEmail(persona.email || '')
                setColor(persona.color || '')
                setAcepta(persona.acepta || '')
            }
        }
    },[editIndex])
    
    const emailValido = email.includes('@') && email.includes('.')
    const formValido = nombre.trim() !== "" && emailValido && color !== 'gray' && (editIndex!== null  || acepta)

    console.log(formValido, emailValido);
    
    const guardarEnLocalStorage = (persona) =>{
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente) :[]
        if(editIndex !== null && lista[editIndex]){
            lista[editIndex] = {...lista[editIndex], ...persona, updatedAt:new Date() }
        }else{
            lista.push({...persona, createdAt: new Date()})
        }
        localStorage.setItem('personas', JSON.stringify(lista))
    }

    const borrarDatosFormulario = () =>{
        setNombre("")
        setEmail('')
        setAcepta(false)
        setColor('gray')
    }

    const confirmarFormulario = ()=>{

        Swal.fire({
            title:'¿Desea confirmar los datos?',
            text:`Nombre: ${nombre || "Sin nombre"} | Email: ${email || 'Sin Email'} | Color: ${color !== 'gray' ? opcionesColor.find((item)=>item.value === color).label : 'Gris'}`,
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Si, guardar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){
                guardarEnLocalStorage({
                    nombre: nombre || 'Sin nombre',
                    color,
                    email,
                    aceptaTerminos: acepta,
                    createdAt: new Date()
                })

                toast.current?.show({
                    severity:'success',
                    summary:'Guardado',
                    detail:'Tarjeta de presentación guardada'
                })

                borrarDatosFormulario()
                navigate('/personas')
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
                    {!nombre.trim() && <p>Debes ingresar el nombre</p>}

                    <span className="p-float-label">
                        <InputText id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </span>
                    {(!email && !emailValido) && <p>Email invalido</p>}

                    <div>
                        <small>Color de fondo</small>
                        <SelectButton
                        value={color}
                        onChange={(e)=>setColor(e.value)}
                        options={opcionesColor}
                        />
                    </div>
                    {color === 'gray' && <p>Debes seleccionar un color</p>}

                    <div classname="d-grid">
                        <label>¿Acepta terminos y condiciones?</label>
                        <Checkbox inputId="acepta" checked={acepta} onChange={(e)=>setAcepta(e.checked)}/>
                    </div>
                    {!acepta && <p>Debes aceptar terminos</p>}

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
                        disabled={!formValido}
                        onClick={()=>confirmarFormulario()}
                        />
                        <Button
                        label="Limpiar"
                        icon='pi pi-eraser'
                        severity="secondary"
                        onClick={()=>{borrarDatosFormulario()}} 
                        />
                    </div>
                </div>
            </Card>
        </Fragment>
    )

}

export default Tarjeta


