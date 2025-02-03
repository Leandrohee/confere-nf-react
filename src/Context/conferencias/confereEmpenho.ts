import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";
import { fornecedores } from "../../utils/Fonecedores";

export async function fnConfereEmpenho(
    pagpdf: pagPdf[]|null,
    vFornecedor: string
): Promise<LinhasProps>{
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'EMPENHO',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------ CARREGANDO AS VARIAVEIS INICIAIS ------------------------------ */
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        const fornecedorEncontrado = fornecedores.filter(fornecedor => (
            fornecedor.nome == vFornecedor.toLocaleLowerCase()
        ))[0]
        const empenho = fornecedorEncontrado.ne                                         //22/2025
        const empenhoFormatado = empenho.split("/").reverse().join("NE")                //2025NE22
        const vEmpenho = empenho.split("/")[0]
        const anoVEmpenho = empenho.split("/")[1].slice(2)                              //Fiz 2025 virar 25


        /* ------------------------------- PROCURAR EMPENHO ESPERADO NA NF ------------------------------ */
        let regexNeNf: string|RegExp = `((20)?${anoVEmpenho})\\s{0,3}ne\\s{0,3}(\\d{0,6}${vEmpenho})`;          //2025ne00043
        regexNeNf = new RegExp(regexNeNf,"gi")
        const matchNeNf = regexNeNf.exec(primeiraPagina)

        /* ----------------------------- PROCURAR EMPENHO NAO ESPERADO NA NF ---------------------------- */
        if(!matchNeNf){
            const regexNaoEsperadoNf =  new RegExp(/((20)?\d{2})\s{0,3}ne\s{0,3}(\d{2,8})/gi)
            const matchNeNaoEsperadoNf = regexNaoEsperadoNf.exec(primeiraPagina)

            //Se nao encontrar empenho nao esperado
            if (!matchNeNaoEsperadoNf){
                return {
                    col1: 'EMPENHO',
                    col2: '-',
                    col3: '-',
                    col4: `Empenho ${empenhoFormatado} não encontrado na NF`
                };
            }
            
            //Se encontrar empenho nao esperado
            return {
                col1: 'EMPENHO',
                col2: matchNeNaoEsperadoNf[0],
                col3: '-',
                col4: `Empenho ${empenhoFormatado} não encontrado na NF`
            };
        }
        
        /* -------------------------------- MOSTRAR RESULTADO SE TUDO OK -------------------------------- */
        return {
            col1: 'EMPENHO',
            col2: empenhoFormatado,
            col3: '-',
            col4: "OK"
        };


    } catch (error){
        console.error(error)
        return {
            col1: 'EMPENHO',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler o empenho"
        };

    }
}