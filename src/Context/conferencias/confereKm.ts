import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereKm(pagpdf: pagPdf[]|null): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'KM',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------- CARREGANDO AS PAGINAS INICIAIS ------------------------------- */
        const identificadorPagOs = 'RECEPÇÃO CEMEV';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        const somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        const osPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagOs)
        ))[0].conteudo;

        /* ------------------------------------- CONFERINDO KM NA OS ------------------------------------ */
        const regexKmOs = new RegExp(/(Hodômetro[\: \s]{1,3})([\d \.]{3,7})/gi);
        const matchKmOs = regexKmOs.exec(osPagina);
        if(!matchKmOs){
            return {
                col1: 'KM',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrado km na os"
            };
        }

        /* ------------------------------------ CONFERINDO O KM NA NF ----------------------------------- */
        const kmDividido = matchKmOs[2].replace(" ", "").split(".");                                //[62, 354]
        let regexKmNf:string|RegExp = `${kmDividido[0]}[\\. \\, \\- \\s]{1,3}${kmDividido[1]}`;
        regexKmNf = new RegExp(regexKmNf,"gi");
        const matchKmNf = regexKmNf.exec(somenteRodapeNf);
        if (!matchKmNf){
            return {
                col1: 'KM',
                col2: '-',
                col3: matchKmOs[2],
                col4: "Km da os nao encontrado na nf"
            };
        }

        return {
            col1: 'KM',
            col2: matchKmNf[0],
            col3: matchKmOs[2],
            col4: "OK"
        };

    } catch(error){
        console.error(error);
        return {
            col1: 'KM',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler  o km"
        };

    } 
}