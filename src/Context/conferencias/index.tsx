/* ------------- ARQUIVO RESPONSAVEL POR CRIAR O CONTEXT PARA TODAS AS CONFERENCIAS ------------- */

import { createContext, useContext } from "react"
import { fnConfereFornecedor } from "./confereFornecedor"
import { usePagPdfContext } from "../pagPdf/pagPdft"
import { useLinhasContext } from "../linhas/linhas"
import { fnConferePedido } from "./conferePedido"

//Tudo oq o context vai distribuir
interface ConferenciasProps{
    fazConferencias: any,
    logs: any
}

/* ----------------------------- CRIANDO O CONTEXT PARA CONFERENCIAS ---------------------------- */
export const ConferenciasContext = createContext<ConferenciasProps>(
    {} as ConferenciasProps
)

/* ------------------------------------- CRIANDO O PROVIDER ------------------------------------- */
export function ConferenciasProvider({children}: {children: React.ReactNode}){
    const linhas = useLinhasContext()
    const pagpdf = usePagPdfContext()

    //Busca informacoes
    function fazConferencias(){
        //CONFERENCIAS
        const resultadoFornecedor = fnConfereFornecedor(pagpdf.pagPdf);             //Informacao sobre o fornecedor
        const resultadoPedido = fnConferePedido(pagpdf.pagPdf);                     //Infromacao sobre o pedido

        //ATUALIZACOES
        linhas.setTituloTb(resultadoFornecedor)
        linhas.setLinhas(linhas.linhas.map(linha => (
           linha.col1 == "PEDIDO" ? resultadoPedido : linha
        )))
    

    }


    //Só retorna os resultados das funcoes
    function logs(){
        const paginas = pagpdf.pagPdf
        console.log("FORNECEDORES:")
        console.log(fnConfereFornecedor(paginas))
        console.log("PEDIDOS:")
        console.log(fnConferePedido(paginas))
    }
    
    return(
        <ConferenciasContext.Provider  value={
            {
                fazConferencias,
                logs
            }
        }>
            {children}
        </ConferenciasContext.Provider>
    )
}

/* -- CRIANO UM HOOK PERSONALIZADO PARA NAO PRECISAR IMPORTAR O USECONTEXT() E O AuthContext SEMPRE -- */
export function useConferenciasContext(){
    const conferencias = useContext(ConferenciasContext)
    return conferencias
}

/* ----------------------------------------- INFORMACOES ---------------------------------------- */
/*
Para usar as variavel os metodo em qualquer página é só:

1. Aplicar o ConferenciasProvider envolvendo o arquivo root no caso aqui o main.ts 

2. Importar o useConferenciasContext

3. Carregar ele na pagina especifica assim:
    const ConferenciasProvider = useConferenciasContext();

4. Comecar a usar assim:
    console.log(ConferenciasProvider?.confereFornecedor)
 
*/