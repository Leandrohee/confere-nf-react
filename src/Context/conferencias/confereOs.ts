import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

/* ------------------------------ CONFERE O N DA OS NA NF E NO DOC ------------------------------ */
export async function fnConfereOs(pagpdf: pagPdf[]|null): Promise<LinhasProps>{
    try{
        //Lidando com erros
        if (!pagpdf){
            return {
                col1: 'O.S',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------- CARREGAMENTO DE DADOS INICIAIS ------------------------------- */
        const identificadorPagOs = 'RECEPÇÃO CEMEV'                                                     //Essa frase só está na pagina pedido
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)[0].conteudo
        const osPagina = pagpdf.filter(pagina => 
            pagina.conteudo.includes(identificadorPagOs)
        )[0].conteudo
        const regexOsDoc = new RegExp(/(os:\s{0,5})(\d{1,4}\/\d{1,4})/gi)

        /* ------------------------------ VERIFICANDO O NUMERO DA OS NA OS ------------------------------ */
        const matchOsDoc = regexOsDoc.exec(osPagina)
        if (!matchOsDoc){
            return {
                col1: 'O.S',
                col2: '-',
                col3: '-',
                col4: "Não foi encontrado nº da os na OS"
            };
        }
        const vOsDoc = matchOsDoc[2];

        /* ------------------------------ VERIFICANDO O NUMERO DA OS NA NF ------------------------------ */
        const [nOs] = vOsDoc.split("/")                                                                 //Pegando o primeiro valor da OS sem o ano
        let regexOsNf:string|RegExp = `(${nOs}[-.\\s/\\\\]{1,5})((20)?\\d{2})`
        regexOsNf = new RegExp(regexOsNf,"gi")

        const matchOsNf = regexOsNf.exec(primeiraPagina)
        if (!matchOsNf){
            return {
                col1: 'O.S',
                col2: '-',
                col3: vOsDoc,
                col4: "Não foi encontrado nº da os na NF"
            };
        }
        let vOsNf = matchOsNf[1];
        vOsNf = vOsNf.replace(/[\\\/.-]/gi, "")

        //Checar para ver se as os sao iguais
        if  (nOs == vOsNf){
            return {
                col1: 'O.S',
                col2: matchOsNf[0],
                col3: vOsDoc,
                col4: "OK"
            };
        }

        //Se os nao forem iguais
        return {
            col1: 'O.S',
            col2: matchOsNf[0],
            col3: vOsDoc,
            col4: "OS erradas"
        };

    } catch (error){
        console.error(error)
        return {
            col1: 'O.S',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler a os"
        };
    }
}

/* ----------------------------------------- INFORMACOES ---------------------------------------- */
/*
As maneira de trabalhar com as expressoes regulares com variaveis é assim
        const nOs = '1388'
        let regexOsNf:string|RegExp = `(${nOs}[-.\\s/\\\\]{1,5})((20)?\\d{2})`
        regexOsNf = new RegExp(regexOsNf,"gi")

        O "\" nao é lido pelo javascript portando é necessáro outro "\" para o js ler. assim: "\\""

Colocar a / no comeco e no final de uma regex faz a diferenca:
        Isso: /[/.-]/gi é diferente disso /[./-]/gi
        /[/.-]/gi, /[\\\/.-]/gi -> certo
        /[./-]/gi /[.-\\\/]/gi -> errado

*/