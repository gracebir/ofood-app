import { Button, Result } from "antd";
import { useHistory } from "react-router";

export default function NotFound(){
    const history = useHistory();
    return(
        <Result
            status="404"
            title="404"
            subTitle="Desolé, la page que vous avez visité est introuvable."
            extra={[<Button type="primary" onClick={()=>history.push('/')} >Rétour à l'accueil</Button>]}
        />
        
    );
}