import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";
import { fornecedores } from "../../utils/Fonecedores";
import { organizaMarcas } from "../../utils/Marcas";

export async function fnConfereDesconto(
    pagpdf: pagPdf[]|null,
    vFornecedor: string
): Promise<LinhasProps> {
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'DESCONTO',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------- CARRAGANDO AS PAGINAS INICIAIS ------------------------------- */
        const identificadorPagOs = 'RECEPÇÃO CEMEV';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        let somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        if (vFornecedor == 'RABELO'){
            somenteRodapeNf = primeiraPagina.split(/INFORMAÇÕES\s{0,5}COMPLEMENTARES/gi)[1];
        }
        const osPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagOs)
        ))[0].conteudo;
        const fornecedorEncontrado = fornecedores.filter(fornecedor => (
            fornecedor.nome == vFornecedor.toLocaleLowerCase()
        ))[0];

        /* ---------------------- CONFERINDO A MARCA NA OS PARA CALCULAR O DESCONTO --------------------- */
        const regexMarcaOs = new RegExp(/(marca[\s \. \: \/]{1,5})([a-z \d \s]{1,30})Modelo/gi);
        const matchMarcaOs = regexMarcaOs.exec(osPagina);
        if(!matchMarcaOs){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: '-',
                col4: "Não encontrado marca na os"
            }; 
        }

        /* ------------------------ VERIFICANDO O DESCONTO NA NF BASEADO NA MARCA ----------------------- */
        const cleanMarca = organizaMarcas(matchMarcaOs[2])
        const descontoProcurado = fornecedorEncontrado.linhas.filter(linha => (
            linha.linha == cleanMarca
        ))[0].desconto.split(",")
        const descontoInteiro = fornecedorEncontrado.linhas.filter(linha => (
            linha.linha == cleanMarca
        ))[0].desconto
        let regexDescontoNf:string|RegExp = `${descontoProcurado[0]}[\\.\\,\\-]{0,1}(${descontoProcurado[1]})?\\\s{0,2}%`
        regexDescontoNf = new RegExp(regexDescontoNf, "gi");
        const matchDescNf = regexDescontoNf.exec(somenteRodapeNf)
        if(!matchDescNf){
            return {
                col1: 'DESCONTO',
                col2: '-',
                col3: '-',
                col4: `Não encontrado o desconto ${descontoInteiro} na nf`
            };
        }

        return {
            col1: 'DESCONTO',
            col2: matchDescNf[0],
            col3: '-',
            col4: "OK"
        };

    } catch(error){
        console.error(error)
        return {
            col1: 'DESCONTO',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler o desconto"
        };
    }
}