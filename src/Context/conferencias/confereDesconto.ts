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
        const identificadorPagPed = 'Pedido Interno de Material';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        let somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        if (vFornecedor == 'RABELO'){
            somenteRodapeNf = primeiraPagina.split(/INFORMAÇÕES\s{0,5}COMPLEMENTARES/gi)[1];
        }
        const osPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagOs)
        ))[0].conteudo;
        const pedidoPagina = pagpdf.filter(pagina => 
            pagina.conteudo.includes(identificadorPagPed)
        )[0].conteudo;
        const fornecedorEncontrado = fornecedores.filter(fornecedor => (
            fornecedor.nome == vFornecedor.toLocaleLowerCase()
        ))[0];

        /* --------------------- CONFERINDO O MODELO NA OS PARA CALCULAR O DESCONTO --------------------- */
        const regexModeloOs = new RegExp(/(modelo[\s \. \: \/]{1,5})([a-z \d \s]{1,30})hod/gi);
        const matchModeloOs = regexModeloOs.exec(osPagina);
        console.log(regexModeloOs)
        console.log(matchModeloOs)
        if(!matchModeloOs){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: '-',
                col4: "Não encontrado modelo na os"
            }; 
        }

        /* --------------------- DESCOBRINDO O DESCONTO ATRAVES DO MODELO DO VEICULO -------------------- */
        const cleanMarca = organizaMarcas(matchModeloOs[2])
        console.log(matchModeloOs[2])
        console.log(cleanMarca)
        const descontoProcurado = fornecedorEncontrado.linhas.filter(linha => (
            linha.linha == cleanMarca
        ))[0].desconto.split(",")
        const descontoInteiro = fornecedorEncontrado.linhas.filter(linha => (
            linha.linha == cleanMarca
        ))[0].desconto

        /* ------------------------------ VERIFICANDO O DESCONTO NO PEDIDO ------------------------------ */
        let regexDescontoPed:string|RegExp = `${descontoProcurado[0]}[\\.\\,\\-]{0,1}(${descontoProcurado[1]})?\\\s{0,2}%`
        regexDescontoPed = new RegExp(regexDescontoPed, "gi");
        const matchDescPed = regexDescontoPed.exec(pedidoPagina);
        if(!matchDescPed){
            return {
                col1: 'DESCONTO',
                col2: '-',
                col3: matchModeloOs[2],
                col4: `Não encontrado o desconto ${descontoInteiro} no ped`
            };
        }

        /* -------------------------------- VERIFICANDO O DESCONTO NA NF -------------------------------- */
        let regexDescontoNf:string|RegExp = `${descontoProcurado[0]}[\\.\\,\\-]{0,1}(${descontoProcurado[1]})?\\\s{0,2}%`
        regexDescontoNf = new RegExp(regexDescontoNf, "gi");
        const matchDescNf = regexDescontoNf.exec(somenteRodapeNf)
        if(!matchDescNf){
            return {
                col1: 'DESCONTO',
                col2: '-',
                col3: matchModeloOs[2],
                col4: `Não encontrado o desconto ${descontoInteiro} na nf`
            };
        }

        return {
            col1: 'DESCONTO',
            col2: matchDescNf[0],
            col3: matchModeloOs[2],
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