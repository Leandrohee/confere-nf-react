import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConferePrefixo(pagpdf: pagPdf[]|null): Promise<LinhasProps>{
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'PREFIXO',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------------ INICIANDO AS PAGINAS ------------------------------------ */
        const identificadorPagPed = 'Pedido Interno de Material';
        const identificadorPagOs = 'RECEPÇÃO CEMEV';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        const somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        const pedidoPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagPed)
        ))[0].conteudo;
        const osPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagOs)
        ))[0].conteudo;

        
        /* ------------------------------- PROCURANDO O PREFIXO NO PEDIDO ------------------------------- */
        const regexPrefixo = new RegExp(
            /(pref(ixo)?[\: \. \- \/ \s \\]{1,4})([a-z]{2,4}[\- \. \s]{1,4}\d{1,4})/gi
        );
        const matchPrefixoPed = regexPrefixo.exec(pedidoPagina);
        if(!matchPrefixoPed){
            return {
                col1: 'PREFIXO',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrato prefixo no pedido"
            };
        }

        /* --------------------------------- PROCURANDO O PREFIXO NA OS --------------------------------- */
        const regexPrefixoOs = new RegExp(
            /(pref(ixo)?[\: \. \- \/ \s \\]{1,4})([a-z]{2,4}[\- \. \s]{1,4}\d{1,4})/gi
        );
        const matchPrefixoOs = regexPrefixoOs.exec(osPagina);
        if(!matchPrefixoOs){
            return {
                col1: 'PREFIXO',
                col2: '-',
                col3: `${matchPrefixoPed[3]} | ??`,
                col4: "Não foi encontrato prefixo na o.s"
            };
        }


        /* ----------------------------- PROCURANDO O PREFIXO NA NOTA FISCAL ---------------------------- */
        const regexPrefixoNf = new RegExp(
            /(pref(ixo)?[\: \. \- \/ \s \\]{1,4})([a-z]{2,4}[\- \. \s]{1,4}\d{1,4})/gi
        );
        const matchPrefixoNf = regexPrefixoNf.exec(somenteRodapeNf)
        if(!matchPrefixoNf){
            return {
                col1: 'PREFIXO',
                col2: '-',
                col3: `${matchPrefixoPed[3]} | ${matchPrefixoOs[3]}`,
                col4: "Não foi encontrato prefixo na nf"
            };
        }

        /* ----------------------------------- FORMATANDO OS PREFIXOS ----------------------------------- */
        let cleanPrefixoPed = matchPrefixoPed[3].replace(/[\s \. \- \/ \:]{1,6}/gi,"");
        const soNomePrefixoPed = cleanPrefixoPed.split(/\d/)[0];
        const soNumeroPrefixoPed = cleanPrefixoPed.split(soNomePrefixoPed)[1].replace(/^0+/gi,"")
        cleanPrefixoPed = soNomePrefixoPed + soNumeroPrefixoPed;

        let cleanPrefixoOs = matchPrefixoPed[3].replace(/[\s \. \- \/ \:]{1,6}/gi,"");
        const soNomePrefixoOs = cleanPrefixoOs.split(/\d/)[0];
        const soNumeroPrefixoOs = cleanPrefixoOs.split(soNomePrefixoOs)[1].replace(/^0+/gi,"");
        cleanPrefixoOs = soNomePrefixoOs + soNumeroPrefixoOs;

        let cleanPrefixoNf = matchPrefixoNf[3].replace(/[\s \. \- \/ \:]{1,6}/gi,"");
        const soNomePrefixoNf = cleanPrefixoNf.split(/\d/)[0];
        const soNumeroPrefixoNf = cleanPrefixoNf.split(soNomePrefixoNf)[1].replace(/^0+/gi,"")
        cleanPrefixoNf = soNomePrefixoNf + soNumeroPrefixoNf;

        /* --------------------------- COMPARANDO OS TRES PREFIXOS ENCONTRADOS -------------------------- */
        if (cleanPrefixoPed == cleanPrefixoOs && cleanPrefixoOs == cleanPrefixoNf){
            return {
                col1: 'PREFIXO',
                col2: matchPrefixoNf[3],
                col3: `${matchPrefixoPed[3]}  |  ${matchPrefixoOs[3]}`,
                col4: "OK"
            };
        }

        return {
            col1: 'PREFIXO',
            col2: matchPrefixoNf[3],
            col3: `${matchPrefixoPed[3]}  |  ${matchPrefixoOs[3]}`,
            col4: "pedidos incompatíveis"
        };

    } catch(error){
        console.error(error);
        return {
            col1: 'PREFIXO',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler prefixo"
        };
    }
}