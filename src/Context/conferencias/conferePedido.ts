import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

/* ------------------------ CONFERE SE O N DO PED NA NF E NOS DEMAIS DOCS ----------------------- */
export async function fnConferePedido(pagpdf: pagPdf[]|null): Promise<LinhasProps>{
    try{
        //Lidando com erros
        if (!pagpdf){
            return {
                col1: 'PEDIDO',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            }
        }

        /* ------------------------------- CARREGAMENTO DE DADOS INICIAIS ------------------------------- */
        const identificadorPagPedido = 'Pedido Interno de Material';                                                     //Essa frase só está na pagina pedido
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)[0].conteudo
        const pedidoPagina = pagpdf.filter(pagina => 
            pagina.conteudo.includes(identificadorPagPedido)
        )[0].conteudo
        const regexPedNf = new RegExp(/(ped[a-z/\-.:\s]{0,7})(\d{1,4})/gi)
        const regexPedDoc = new RegExp(/(pedido[:\s]{1,4})(\d{1,4})/gi)


        /* ------------------------------------ PROCURANDO PED NA NF ------------------------------------ */
        const matchPedNf = regexPedNf.exec(primeiraPagina)
        if(!matchPedNf){
            console.log("Nao encontrado valor de pedido na NF")
            return {
                col1: 'PEDIDO',
                col2: '-',
                col3: '-',
                col4: "Nao foi encontrado valor de pedido na NF"
            }
        }
        const vPedNf = matchPedNf[2].replace(/ˆ0+/,"")                                        //valor do pedido achado na NF

        /* ------------------------ PROCURANDO PED NOS OUTROS DOCUMENTOS (PEDIDO) ----------------------- */
        const matchPedDoc = regexPedDoc.exec(pedidoPagina)
        if (!matchPedDoc){
            console.log("Nao encontrado valor de pedido no PEDIDO")
            return {
                col1: 'PEDIDO',
                col2: vPedNf,
                col3: '-',
                col4: "Nao encontrado valor de pedido no PEDIDO"
            }
        }
        const vPedDoc = matchPedDoc[2].replace(/ˆ0+/,"")

        /* ----------------------------------- MOSTRANDO OS RESULTADOS ---------------------------------- */
        const resPed = vPedDoc == vPedNf ? "OK" : "Valores divergentes"
        
        return {
            col1: "PEDIDO",
            col2: vPedNf,
            col3: vPedDoc,
            col4: resPed,
        }
    } catch{
        return{
            col1: "PEDIDO",
            col2: "-",
            col3: "-",
            col4: "Erro ao ler o pedido",
        }
    }
}