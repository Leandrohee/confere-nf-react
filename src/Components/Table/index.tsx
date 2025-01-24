import styled from "styled-components"

/* --------------------------------------------- CSS -------------------------------------------- */
export const TableSC = styled.table`
    margin: auto;
    height: auto;
    width: 70%;
    border-spacing: 0;                                  //Removing the space between cells
    border-collapse: separate;
    border: 1px solid black;
    border-radius: var(--border_radius);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

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
        border-top: 1px solid black;
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
        border-top:  1px solid black;
        border-right: 1px solid black;
        width: 20%;
    }
    
    //Ultima cedula do corpo
    td:last-child{
        width: 40%;
        border-right: 0;
    }
    
`

/* ----------------------------------------- INTERFACES ----------------------------------------- */
interface Linhas{
    lin: number
    col1: string,
    col2: string|number|null,
    col3: string|number|null,
    col4: string|null,
}


export default function Table() {

    const titulo: string = "CONFERÊNCIA";

    const colunas: Array<string> = [
        "CAMPO",
        "NF",
        "PEDIDO / OS",
        "RESULTADO"
    ]; 

    const linhas: Array<Linhas> = [
        {
            lin: 1,
            col1: "PEDIDOS",
            col2: 1545,
            col3: 1545,
            col4: "OK"
        },
        {
            lin: 2,
            col1: "O.S",
            col2: 2222,
            col3: 2222,
            col4: "OK"
        },
    ]


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
                    colunas.map(coluna => (
                        <th>{coluna}</th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
            {
                linhas.map(linha => (
                    <tr>
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
