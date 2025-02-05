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

        /* ------------------------ PEGANDO O MODELO NA OS PARA VERIFICAR A MARCA ----------------------- */
        const regexModeloOs = new RegExp(/(modelo[\s \. \: \/]{1,5})([a-z \d \. \s]{1,30})hod/gi);
        const matchModeloOs = regexModeloOs.exec(osPagina);
        if(!matchModeloOs){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: '-',
                col4: "Não encontrado modelo na os"
            }; 
        }

        /* --------------------------- PEGANDO A MARCA REFERENTE A ESSE MODELO -------------------------- */
        const marca = organizaMarcas(matchModeloOs[2])

        if (typeof marca == 'boolean'){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: matchModeloOs[2],
                col4: "Não encontrado marca pra esse modelo"
            }; 
        }

        /* ---------------------- VERIFICANDO SE A MARCA É REFERENTE AO FORNECEDOR ---------------------- */
        const matchMarca = fornecedorEncontrado.linhas.some(linha => (
            linha.linha == marca
        ))
        if(!matchMarca){
            return {
                col1: 'MARCA',
                col2: '-',
                col3: marca,
                col4: "Esse modelo não é referente a esse fornecedor"
            }; 
        }

        /* --------------------------------------- SE TUDO CORRETO -------------------------------------- */
        return {
            col1: 'MARCA',
            col2: '-',
            col3: marca,
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