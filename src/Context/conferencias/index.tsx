/* ------------- ARQUIVO RESPONSAVEL POR CRIAR O CONTEXT PARA TODAS AS CONFERENCIAS ------------- */

import { createContext, useContext } from "react"
import { fnConfereFornecedor } from "./confereFornecedor"
import { usePagPdfContext } from "../pagPdf/pagPdft"
import { useLinhasContext } from "../linhas/linhas"

//Tudo oq o context vai distribuir
interface ConferenciasProps{
    fazConferencias: any
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
        const resultadoFornecedor = fnConfereFornecedor(pagpdf.pagPdf);               //Pega informacao sobre o fornecedor
        // const conferePeddo = fnConferePedido(pagpdf)                             //Infromacao sobre o pedido
    
        //Atualiza titulo
        linhas.setTituloTb((prev:any) => prev + ` - ${resultadoFornecedor}`)
    
        //Atualiza as demais linhas 
        // linhas.linhas.filter(linha => linha.col1 == "PEDIDO")

    }
    
    return(
        <ConferenciasContext.Provider  value={
            {
                fazConferencias
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