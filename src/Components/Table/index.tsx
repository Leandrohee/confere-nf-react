import styled from "styled-components"
import { useLinhasContext } from "../../Context/linhas/linhas";

/* --------------------------------------------- CSS -------------------------------------------- */
export const TableSC = styled.table`
    margin: auto;
    height: auto;
    width: 70%;
    border-spacing: 0;                                  //Removing the space between cells
    border-collapse: separate;
    border: 1px solid #6f798d;
    border-radius: var(--border_radius);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    /* margin-top: 20px; */

    //Titulo
    h3{
        text-align: center;
    }

    //Arredondando bordas
    thead,
    tr:first-child th:first-child{
        border-top-right-radius: var(--border_radius);
        border-top-left-radius: var(--border_radius);
    }

    //Arredondando bordas
    tr:last-child td:first-child{
        border-bottom-left-radius: var(--border_radius);
    }

    //Arredondando bordas
    tr:last-child td:last-child{
        border-bottom-right-radius: var(--border_radius);
    }

    //Arredondando bordas
    tr:last-child{
        border-bottom-right-radius: var(--border_radius);
    }
    
    //Primeira linha
    tr:first-child th:first-child{
        background-color: #222831;
        color: white;
    }

    //Cedula do cabecalho
    th{
        background-color: #6f798d;
    }

    .th-empresa{
        border-top: 1px solid #6f798d;
    }

    .tr-cabecalho{
        margin-top: 1px solid black;
    }

    //Corpo da tabela
    tbody{
        margin: 10px black solid;
    }
    
    //Linha
    tr{
        height: 5vh;
        width: 100%;
        background-color: #EEEEEE;
    }

    //Cedula do corpo da tabela
    td{
        text-align: center;
        border-top:  1px solid #6f798d;
        border-right: 1px solid #6f798d;
        width: 20%;
    }
    
    //Ultima cedula do corpo
    td:last-child{
        width: 40%;
        border-right: 0;
    }
    
`

/* ----------------------------------------- COMPONENTE ----------------------------------------- */
export default function Table() {
    const linhasProvider = useLinhasContext()
    const titulo: string = linhasProvider.tituloTb;

    const colunas: Array<string> = [
        "CAMPO",
        "NF",
        "PEDIDO / OS",
        "RESULTADO"
    ]; 

    
  return (
    <TableSC>
        <thead>
            <tr>
                <th colSpan={4}>
                    <h3>{titulo}</h3>
                </th>
            </tr>
            <tr> 
                {
                    colunas.map((coluna,index) => (
                        <th key={index}>{coluna}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                linhasProvider.linhas.map((linha,index) => (
                    <tr key={index}>
                        <td>{linha.col1}</td>
                        <td>{linha.col2}</td>
                        <td>{linha.col3}</td>
                        <td>{linha.col4}</td>
                    </tr>
                ))
            }
        </tbody>
    </TableSC>
  )
}
