import { organizaMarcas } from "../../utils/Marcas";
import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereValor(
    pagpdf: pagPdf[]|null,
    marca: string|number|null

): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }


        /* ------------------------------ CARREGANDO AS VARIÁVEIS INICIAIS ------------------------------ */
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        let audatexPagina:pagPdf[]|string = pagpdf.filter(pagina => (
            pagina.conteudo.includes('AudaPad')
            || pagina.conteudo.includes('Segurado')
            // || pagina.conteudo.includes('audatex')
            // || pagina.conteudo.includes('Audatex')
        ));

        // console.log(primeiraPagina)
        if(!audatexPagina[0]){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: "Não encontrada pagina audatex"
            };
        }
        audatexPagina = audatexPagina[0].conteudo;

        /* -------------------------- DESCOBRINDO OS VALORES DOS CODIGOS AUDATEX ------------------------- */
        const regexValoresCod = new RegExp(/(trocar[\s a-z \d \* ()]{0,100})(\s\d{1,5},\d{2})/gi);
        let matchesValoresAud: any[] = [...audatexPagina.matchAll(regexValoresCod)]
        matchesValoresAud = matchesValoresAud.map(valor => valor[2].replace(" ", ""));
        if(matchesValoresAud.length == 0){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: "Não encontrado valores na audatex"
            };
        }

        /* --------------------------- VERIFICANDO OS VALORES DO AUDATEX NA NF -------------------------- */
        let matchesValoresNf: any[] = []
        let matchesValoresNotFoundNf: any[] = []
        matchesValoresAud.forEach( valor => {
            primeiraPagina.includes(valor) && matchesValoresNf.push(valor)
            !primeiraPagina.includes(valor) && matchesValoresNotFoundNf.push(valor)
        })

        if (matchesValoresNotFoundNf.length > 0){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: `R$ ${matchesValoresNotFoundNf[0]} não encontrado na nf`
            };
        }
        
        /* --------- DEPOIS DE VERIFICAR O VALOR INDIVIDUAL DOS CODS VERIFICAR O DESCONTO DA NF --------- */
        const regexNumeros = new RegExp(/\s\d{0,3}.?\d{1,3},?\d{2}\s/gi)
        let somenteValores: any[]|string = primeiraPagina.split(/cálculo\s{1,5}do\s{1,5}imposto/gi)[1]
        somenteValores = somenteValores.split(/dados\s{1,5}dos?\s{1,5}produtos?/gi)[0];
        somenteValores = [...somenteValores.matchAll(regexNumeros)]
        somenteValores = somenteValores.map(valor => (
            Number(valor[0].replace(/\./gi,"").replace(",",".").replace(/\s/gi,"")) > 0 &&
            Number(valor[0].replace(/\./gi,"").replace(",",".").replace(/\s/gi,""))
        ))
        somenteValores = somenteValores.filter(valores => valores)

        const provavelValorNfTotal = somenteValores[0]


        //MELHORAR ESSE CODIGO...

        return {
            col1: 'VALOR',
            col2: `R$ ${provavelValorNfTotal}`,
            col3: '-',
            col4: "OK"
        };

    } catch (error){
        return {
            col1: 'VALOR',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler o valor"
        };
    }
}