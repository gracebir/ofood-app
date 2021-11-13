import { Button, Result } from "antd";


export default function NotFound(){

    return(
        <Result
            status="404"
            title="404"
            subTitle="Desolé, la page que vous avez visité est introuvable."
            extra={[<Button type="primary">Rétour à l'accueil</Button>]}
        />
        
    );
}