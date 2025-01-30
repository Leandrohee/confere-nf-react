import styled from "styled-components"
import { Button } from "../../Components/Button"
import Table from "../../Components/Table"
import UploadBox from "../../Components/UploadBox"
import Help from "../../Components/Help"

/* --------------------------------------- ESTILIZACAO CSS -------------------------------------- */
export const HomeSc = styled.div`
    display: flex;
    flex-direction: column;

    button:first-child{
        margin-bottom: 50px;
    }

`

/* ------------------------------------------- PAGINA ------------------------------------------- */
export default function Home() {
  return (
    <HomeSc>
        <Help/>
        <UploadBox/>
        <Button
            width="15%"
            backgroundColor="#0096FF"
            hoverBackgroundColor="black"
            border="0"
            margin="20px auto 12px auto"
            text="VERIFICAR"
            height="50px"
            color="black"
        />
      <Table/>
    </HomeSc>
  )
}

