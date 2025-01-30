import { pagPdf } from "../pagPdf/pagPdft";

/* ------------------------ CONFERE SE O N DO PED NA NF E NOS DEMAIS DOCS ----------------------- */
export function fnConferePedido(pagpdf: pagPdf[]|null): any{
    //Lidando com erros
    if (!pagpdf){
        return {erro: "Nao foi enviada nenhuma pagina"};
    }

    /* ------------------------------- CARREGAMENTO DE DADOS INICIAIS ------------------------------- */
    const identificadorPagPedido = 'Pedido Interno de Material'                                                     //Essa frase só está na pagina pedido
    const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)[0].conteudo
    const pedidoPagina = pagpdf.filter(pagina => 
        pagina.conteudo.includes(identificadorPagPedido)
    )[0].conteudo
    const regexPedNf = new RegExp(/(ped[a-z/\-.:\s]{0,7})(\d{1,4})/gi)
    const regedPedDoc = new RegExp(/(pedido[:\s]{1,4})(\d{1,4})/gi)


    /* ------------------------------------ PROCURANDO PED NA NF ------------------------------------ */
    const matchPedNf = regexPedNf.exec(primeiraPagina)
    if(!matchPedNf){
        console.log("Nao encontrado valor de pedido na NF")
        return {erro: "Nao foi encontrado valor de pedido na NF"}
    }
    const vPedNf = matchPedNf[2].replace(/ˆ0+/,"")                                        //valor do pedido achado na NF

    /* ------------------------ PROCURANDO PED NOS OUTROS DOCUMENTOS (PEDIDO) ----------------------- */
    // const matchPedDoc = regexPedNf.exec(pedidoPagina)
    const matchPedDoc = regedPedDoc.exec(pedidoPagina)
    if (!matchPedDoc){
        console.log("Nao encontrado valor de pedido no PEDIDO")
        return {erro: "Nao encontrado valor de pedido no PEDIDO"}
    }
    const vPedDoc = matchPedDoc[2].replace(/ˆ0+/,"")
    console.log(vPedNf)
    console.log(vPedDoc)
    console.log(vPedDoc == vPedNf)

}