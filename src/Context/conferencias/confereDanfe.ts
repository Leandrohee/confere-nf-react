import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereDanfe(pagpdf: pagPdf[]|null): Promise<LinhasProps>{
    try{
        //Lidando com erros
        if (!pagpdf){
            return {
                col1: 'DANFE',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------- CARREGAMENTO DE DADOS INICIAIS ------------------------------- */
        const identificadorPagOs = 'Digest Value'                                                     //Essa frase só está na pagina danfe
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)[0].conteudo
        const danfePagina = pagpdf.filter(pagina => 
            pagina.conteudo.includes(identificadorPagOs)
        )[0].conteudo
        const regexDanfe = new RegExp(/[/\d.-]{58,60}/gi)

        /* ---------------------- VERITICANDO O NUMERO DO DANFE NA PAGINA DO DANFE ---------------------- */
        const matchDanfeDoc = regexDanfe.exec(danfePagina)
        if (!matchDanfeDoc){
            return {
                col1: 'DANFE',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrado o arquivo danfe"
            };
        }
        const cleanDanfeDoc = matchDanfeDoc[0].replace(/[/.-]/gi,"")

        /* ------------------------------ VERIFICANDO O NUMERO DANFE NA NF ------------------------------ */
        //Optei por nao utilizawr esse metodop
        // const danfeFormatNf = cleanDanfeDoc.replace(/(\d{4})(?=\d)/g, '$1 ');        //Coloca espacos em branco a cada 4 numeros do danfe encontrado no danfe
        // let regexDanfeNf: string|RegExp = new RegExp(danfeFormatNf,"gi");            //Faz a expressao regular disso
        
        //Optei por utilizar esse metodo de encontrar um danfe na nf totalmente novo
        const regexDanfeNf = new RegExp(/\d{4}[\d\s]{49,51}/gi)
        const matchDanfeNF = regexDanfeNf.exec(primeiraPagina)
        console.log(matchDanfeNF)
        if (!matchDanfeNF){
            return {
                col1: 'DANFE',
                col2: '-',
                col3: '-',
                col4: "O danfe não condiz"
            };
        }
        const cleanDanfeNf = matchDanfeNF[0].replace(/\s/gi, "")

        /* ----------------------------------- MOSTRANDO OS RESULTADOS ---------------------------------- */
        const finalDanfeDoc = "..." + cleanDanfeDoc.slice(-8)
        const finalDanfeNf = "..." + cleanDanfeNf.slice(-8)
        
        if( cleanDanfeDoc == cleanDanfeNf){
            return {
                col1: 'DANFE',
                col2: finalDanfeNf,
                col3: finalDanfeDoc,
                col4: "OK"
            };
        }

        return {
            col1: 'DANFE',
            col2: finalDanfeNf,
            col3: finalDanfeDoc,
            col4: "Danfe da nf incompatível"
        };

    }  catch (error){
        console.error(error)
        return {
            col1: 'DANFE',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler o danfe"
        };
    }

}