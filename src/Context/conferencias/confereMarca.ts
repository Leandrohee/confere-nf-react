import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";
import { fornecedores } from "../../utils/Fonecedores";
import { organizaMarcas } from "../../utils/Marcas";

export async function fnConfereMarca(
    pagpdf: pagPdf[]|null,
    vFornecedor: string
): Promise<LinhasProps>{
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'MARCA',
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
        const fornecedorEncontrado = fornecedores.filter(fornecedor => (
            fornecedor.nome == vFornecedor.toLocaleLowerCase()
        ))[0];

        /* ---------------------------------- PROCURANDO A MARCA NA OS ---------------------------------- */
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

        /* ----------------------------------- PROCURANDO A MARCA NA N ---------------------------------- */
        const regexMarcaNf =  new RegExp(/(marca[\s \. \: \/]{1,5})([a-z\d]{1,20})/gi);
        const matchMarcaNf = regexMarcaNf.exec(somenteRodapeNf);
        if(!matchMarcaNf){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: matchMarcaOs[1],
                col4: "Não encontrado marca na nf"
            }; 
        }

        /* ----------------- VERIFICANDO SE AS MARCAS SAO REFERENTES A ESSE FORNECEDEDOR ---------------- */
        const cleanMarcaNf = organizaMarcas(matchMarcaNf[2]);
        const cleanMarcaOs = organizaMarcas(matchMarcaOs[2]);
        const marcaNfOk = fornecedorEncontrado.linhas.some(linha =>(
            linha.linha == cleanMarcaNf
        ));
        const marcaOsOk = fornecedorEncontrado.linhas.some(linha =>(
            linha.linha == cleanMarcaOs
        ));

        if (marcaNfOk == false || marcaOsOk == false){
            return {
                col1: 'MARCA',
                col2: matchMarcaNf[2],
                col3: matchMarcaOs[2],
                col4: "Essa marca não é desse fornecedor"
            }; 
        }

        if (cleanMarcaNf !== cleanMarcaOs){
            return {
                col1: 'MARCA',
                col2: matchMarcaNf[2],
                col3: matchMarcaOs[2],
                col4: "Marca da os incompatível com a da nf"
            };  
        }

        /* --------------------------------------- SE TUDO CORRETO -------------------------------------- */
        return {
            col1: 'MARCA',
            col2: matchMarcaNf[2],
            col3: matchMarcaOs[2],
            col4: "OK"
        };

    } catch (error) {
        console.error(error)
        return {
            col1: 'MARCA',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler a marca"
        };
    }
}