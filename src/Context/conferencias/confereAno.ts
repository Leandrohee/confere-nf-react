import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereAno(pagpdf: pagPdf[]|null): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'ANO',
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

        /* ----------------------------------- PROCURANDO O ANO NA OS ----------------------------------- */
        const regexAnoOs = new RegExp(/(fabricação[\s \: ]{1,5})(\d{4})/gi);
        const matchAnoOs = regexAnoOs.exec(osPagina);
        if(!matchAnoOs){
            return {
                col1: 'ANO',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrado ano na o.s"
            };
        }

        /* ----------------------------------- PROCURANDO O ANO NA NF ----------------------------------- */
        let regexAnoNf:string|RegExp = `(ano[\\: \\. \\- \\/]{0,4})(${matchAnoOs[2]})`
        regexAnoNf = new RegExp(regexAnoNf,"gi");
        const matchAnoNf = regexAnoNf.exec(somenteRodapeNf);
        if(!matchAnoNf){
            return {
                col1: 'ANO',
                col2: '-',
                col3: matchAnoOs[2],
                col4: `Não foi encontrado o ano ${matchAnoOs[2]} na nf`
            }; 
        }

        /* ----------------------------------------- SE TUDO OK ----------------------------------------- */
        return {
            col1: 'ANO',
            col2: matchAnoNf[2],
            col3: matchAnoOs[2],
            col4: "OK"
        };
        
    } catch (error){
        console.error(error);
        return {
            col1: 'ANO',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler ano"
        };
    }
}