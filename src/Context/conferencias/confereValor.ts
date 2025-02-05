import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";

export async function fnConfereValor(
    pagpdf: pagPdf[]|null,
    codigos: string|number|null,
    desconto: string|number|null

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
        const identificadorPagDanfe = 'Digest Value' 
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        const danfePagina = pagpdf.filter(pagina => 
            pagina.conteudo.includes(identificadorPagDanfe)
        )[0].conteudo
        let audatexPagina:pagPdf[]|string = pagpdf.filter(pagina => (
            pagina.conteudo.includes('AudaPad')
            || pagina.conteudo.includes('Segurado')
        ));

        if(!audatexPagina[0]){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: "Não encontrada pagina audatex"
            };
        }
        audatexPagina = audatexPagina[0].conteudo;


        /* ------------------------------- PEGANDO OS CODIGOS ENCONTRADOS ------------------------------- */
        let nCodigosEncontrados: number = 0
        if (typeof(codigos) == 'string'){
            nCodigosEncontrados = Number(codigos.replace(/[a-z ó \s]/gi,""));
        }

        /* -------------------------- DESCOBRINDO OS VALORES DOS CODIGOS AUDATEX ------------------------- */
        const regexValoresCod = new RegExp(
            /(trocar[\s a-z \d \* \- \. \, \\ \! \? \/ áãâéêëíîìóôõúüûç ()]{0,100})(\s\d{0,3}.?\d{1,5},\d{2})/gi
        );
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

        if(matchesValoresAud.length !== nCodigosEncontrados){
            return {
                col1: 'VALOR',
                col2: '-',
                col3: '-',
                col4: "Não encontrado todos os valores de cods na audatex"
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
        
        /* --------- DEPOIS DE VERIFICAR O VALOR INDIVIDUAL DOS CODS VERIFICAR O VALOR TOATAL DA NF --------- */
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

        /* ------------------------ VERIFICAR O VALOR COM DESCONTO DA NF NO DANDE ----------------------- */
        const regexNfDesconto = new RegExp(/(NF-e[\s]{0,5})(\d{0,3}.?\d{1,3},\d{2})/gi);
        const matchNfDesconto = regexNfDesconto.exec(danfePagina);
        if(!matchNfDesconto){
            return {
                col1: 'VALOR',
                col2: `R$ ${provavelValorNfTotal}`,
                col3: '-',
                col4: "Não encontrado valor da nf no danfe"
            };
        }
        
        /* --------------- VERIFICAR SE O VALOR COM DESCONTO BATE COM O DESCONTO DA LINHA --------------- */
        const cleanValorTotalNf = Number(provavelValorNfTotal);
        const cleanValorDescontoNf = Number(matchNfDesconto[2].replace(".","").replace(",","."))     
        let cleanDesconto: number = 0
        if (typeof(desconto) == 'string') {
            cleanDesconto = Number(desconto.replace("%","").replace(",","."));
            cleanDesconto =  Number((cleanDesconto * 0.01).toFixed(4))   
        }
        const descontoEncontrado = Number((1- (cleanValorDescontoNf/cleanValorTotalNf)).toFixed(4))


        console.log(cleanValorTotalNf)
        console.log(cleanValorDescontoNf)
        console.log(cleanDesconto)
        console.log(descontoEncontrado)

        if(descontoEncontrado !== cleanDesconto){
            return {
                col1: 'VALOR',
                col2: `R$ ${cleanValorTotalNf}`,
                col3: `R$ ${cleanValorDescontoNf}`,
                col4: "O valor da nota nao corresponde com o desconto"
            };
        }

        return {
            col1: 'VALOR',
            col2: `R$ ${cleanValorTotalNf}`,
            col3: `R$ ${cleanValorDescontoNf}`,
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