import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConferePlaca(
    pagpdf: pagPdf[]|null,
    vFornecedor: string
): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'PLACA',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------------ INICIANDO AS PAGINAS ------------------------------------ */
        const identificadorPagOs = 'RECEPÇÃO CEMEV';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        let somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        if (vFornecedor == 'RABELO'){
            somenteRodapeNf = primeiraPagina.split(/INFORMAÇÕES\s{0,5}COMPLEMENTARES/gi)[1];
        }
        const osPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagOs)
        ))[0].conteudo;

        /* ----------------------------------- PROCURANDO PLACA NA OS ----------------------------------- */
        const regexPlacaOs = new RegExp(
            /(placa[\s \: \. \-]{1,5})([a-z]{3}[\s \- \. \/]{0,3}[a-z \d]{4})/gi
        );
        const matchPlacaOs = regexPlacaOs.exec(osPagina);
        if(!matchPlacaOs){
            return {
                col1: 'PLACA',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrado placa na os"
            };
        }

        /* ----------------------------------- PROCURANDO PLACA NA NF ----------------------------------- */
        const regexPlacaNf = new RegExp(
             /(placa[\s \: \. \-]{1,5})([a-z]{3}[\s \- \. \/]{0,3}[a-z \d]{4})/gi
        );
        const matchPlacaNf = regexPlacaNf.exec(somenteRodapeNf);
        if(!matchPlacaNf){
            return {
                col1: 'PLACA',
                col2: '-',
                col3: matchPlacaOs[2],
                col4: "Não foi encontrado placa na nf"
            };
        }

        /* ------------------------------------ FORMATANDO AS PLACAS ------------------------------------ */
        let cleanPlacaOs = matchPlacaOs[2].replace(/[\s \. \: \- \/ \\]/gi, "")
        let cleanPlacaNf = matchPlacaOs[2].replace(/[\s \. \: \- \/ \\]/gi, "")

        /* ---------------------------- CONFERINDO AS DUAS PLACAS ENCONTRADAS --------------------------- */
        if (cleanPlacaOs !== cleanPlacaNf){
            return {
                col1: 'PLACA',
                col2: matchPlacaNf[2],
                col3: matchPlacaOs[2],
                col4: "Placas incompatíveis"
            };
        }

        return {
            col1: 'PLACA',
            col2: matchPlacaNf[2],
            col3: matchPlacaOs[2],
            col4: "OK"
        };

    } catch (error){
        console.error(error);
        return {
            col1: 'PLACA',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler a placa"
        };
    }
}