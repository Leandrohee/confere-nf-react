/* ------------- ARQUIVO RESPONSAVEL POR CRIAR O CONTEXT PARA TODAS AS CONFERENCIAS ------------- */

import { createContext, useContext } from "react"
import { fnConfereFornecedor } from "./confereFornecedor"
import { usePagPdfContext } from "../pagPdf/pagPdft"
import { useLinhasContext } from "../linhas/linhas"
import { fnConferePedido } from "./conferePedido"
import { fnConfereOs } from "./confereOs"
import { fnConfereDanfe } from "./confereDanfe"
import { fnConfereEmpenho } from "./confereEmpenho"
import { fnConfereContrato } from "./confereContrato"
import { fnConferePrefixo } from "./conferePrefixo"
import { fnConferePlaca } from "./conferePlaca"
import { fnConfereMarca } from "./confereMarca"
import { fnConfereDesconto } from "./confereDesconto"
import { fnConfereKm } from "./confereKm"
import { fnConfereAno } from "./confereAno"
import { fnConfereCodigos } from "./confereCodigos"
import { fnConfereValor } from "./confereValor"

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
    async function fazConferencias(){
        //CONFERENCIAS
        const resultadoFornecedor = await fnConfereFornecedor(pagpdf.pagPdf);               //Informacao sobre o fornecedor
        const resultadoPedido = await fnConferePedido(pagpdf.pagPdf, resultadoFornecedor);  //Infromacao sobre o pedido
        const resultadoOs = await fnConfereOs(pagpdf.pagPdf);                               //Informacao sobre a OS
        const resultadoDanfe = await fnConfereDanfe(pagpdf.pagPdf);
        const resultadoEmpenho = await fnConfereEmpenho(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoContrato = await fnConfereContrato(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoPrefixo = await fnConferePrefixo(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoPlaca = await fnConferePlaca(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoMarca = await fnConfereMarca(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoDesconto = await fnConfereDesconto(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoKm = await fnConfereKm(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoAno = await fnConfereAno(pagpdf.pagPdf, resultadoFornecedor);
        const resultadoCodigos = await fnConfereCodigos(pagpdf.pagPdf);
        const resultadoValor = await fnConfereValor(pagpdf.pagPdf, resultadoCodigos.col2, resultadoDesconto.col2);

        //ATUALIZACOES
        linhas.setTituloTb(resultadoFornecedor)
        linhas.setLinhas(linhas.linhas.map(linha => (
            linha.col1 === "PEDIDO" ? resultadoPedido :
            linha.col1 === "O.S" ? resultadoOs :
            linha.col1 === "DANFE" ? resultadoDanfe :
            linha.col1 === "EMPENHO" ? resultadoEmpenho :
            linha.col1 === "CONTRATO" ? resultadoContrato :
            linha.col1 === "PREFIXO" ? resultadoPrefixo :
            linha.col1 === "PLACA" ? resultadoPlaca :
            linha.col1 === "MARCA" ? resultadoMarca :
            linha.col1 === "DESCONTO" ? resultadoDesconto :
            linha.col1 === "KM" ? resultadoKm :
            linha.col1 === "ANO" ? resultadoAno :
            linha.col1 === "CÓDIGOS" ? resultadoCodigos :
            linha.col1 === "VALOR" ? resultadoValor :
            linha
        )))
    }

    //Só retorna os resultados das funcoes
    function logs(){
        const paginas = pagpdf.pagPdf
        console.log("FORNECEDORES:")
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