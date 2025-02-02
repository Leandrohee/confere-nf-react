import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereCodigos(pagpdf: pagPdf[]|null): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'CÓDIGOS',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------ CARREGANDO AS VARIÁVEIS INICIAIS ------------------------------ */
        const identificadorPagAudatex = 'AudaPad';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        let audatexPagina:pagPdf[]|string = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagAudatex)
        ));

        if(!audatexPagina[0]){
            return {
                col1: 'CÓDIGOS',
                col2: '-',
                col3: '-',
                col4: "Não encontrada pagina audatex"
            };
        }
        audatexPagina = audatexPagina[0].conteudo;

        /* ------------------------------- ENCONTRAR OS CODIGOS NA AUDATEX ------------------------------ */
        const regexCodAud = new RegExp(/(trocar[\s]{0,5})([a-z\d]{3,15})/gi);
        const matchesCodAud = [...audatexPagina.matchAll(regexCodAud)]
        const codsFoundAud = matchesCodAud.map(cod =>(cod[2]))
        const nCodsFoundAud = matchesCodAud.length

        /* --------------------------------- ENCONTRAR OS CODIGOS NA NF --------------------------------- */
        let matchesCodNf: any[] = []
        let matchesCodNotFound : any[] = []
        
        codsFoundAud.forEach(cod => {
            primeiraPagina.includes(cod) && matchesCodNf.push(cod)
            !primeiraPagina.includes(cod) && matchesCodNotFound.push(cod)
        })

        if(matchesCodNf.length == 0){
            return {
                col1: 'CÓDIGOS',
                col2: '-',
                col3: `${nCodsFoundAud} códigos audatex`,
                col4: "Não encontrado os codigos na nf"
            };
        }

        /* ----------------------- VERIFICANDO OS CODIGOS DA AUDATEX COM OS DA NF ----------------------- */
        if (matchesCodNotFound.length > 0){
            return {
                col1: 'CÓDIGOS',
                col2: '-',
                col3: `${nCodsFoundAud} códigos audatex`,
                col4: `Codigo ${matchesCodNotFound[0]}  nao encontrado`
            };
        }

        /* ----------------------------------------- SE TUDO OK ----------------------------------------- */
        return {
            col1: 'CÓDIGOS',
            col2: `${matchesCodNf.length} códigos na nf`,
            col3: `${nCodsFoundAud} códigos na audatex`,
            col4: "OK"
        };

    } catch (error){
        console.error(error)
        return {
            col1: 'CÓDIGOS',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler os códgigos"
        };
    }
}