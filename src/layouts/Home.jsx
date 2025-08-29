import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Home = () =>{
    const navigate = useNavigate()

    return(
        <Button label="Ir al formulario" onClick={()=> navigate('/tarjeta')}/>
    )
}

export default Home