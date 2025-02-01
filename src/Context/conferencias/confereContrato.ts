import { LinhasProps } from "../linhas/linhas";
import { pagPdf } from "../pagPdf/pagPdft";
import { fornecedores } from "../../utils/Fonecedores";

export async function fnConfereContrato(
    pagpdf: pagPdf[]|null,
    vFornecedor: string
): Promise<LinhasProps>{
    try{
        //Lindando com o erro se a pagina nao chegar
        if(!pagpdf){
            return {
                col1: 'CONTRATO',
                col2: '-',
                col3: '-',
                col4: "Não foi enviado nenhuma página"
            };
        }

        /* ------------------------------ CARREGANDO AS VARIÁVEIS INICIAIS ------------------------------ */
        const identificadorPagPed = 'Pedido Interno de Material';
        const primeiraPagina = pagpdf.filter(pagina => pagina.pagina == 1)[0].conteudo;
        const somenteRodapeNf = primeiraPagina.split(/dados[\s]{0,5}adicionais/gi)[1];
        const pedidoPagina = pagpdf.filter(pagina => (
            pagina.conteudo.includes(identificadorPagPed)
        ))[0].conteudo
        const fornecedorEncontrado = fornecedores.filter(fornecedor => (
            fornecedor.nome == vFornecedor.toLocaleLowerCase()
        ))[0];
        const contratoEsperado = fornecedorEncontrado.contrato;
        let [vContrato, anoContrato] = contratoEsperado.split("/");
        anoContrato = anoContrato.slice(-2)     

        /* ----------------------------- PROCURANDO O NUMERO ESPERADO NA NF ----------------------------- */
        let regexContrato: RegExp|string = `(${vContrato})[\\s \\. \\- \\/ \\\\]{1,6}((20)?${anoContrato})`;
        const regexContratoNaoEsperado = new RegExp(/(\d{1,4})[\s \/ \. \- \\]{1,3}((20)?\d{2})/gi);
        regexContrato = new RegExp(regexContrato, "gi");
        const matchContratoNf = regexContrato.exec(somenteRodapeNf);
        
        /* --------------------------- PROCURANDO O NUMERO NAO ESPERADO NA NF --------------------------- */
        if(!matchContratoNf){
            const matchContratoNaoEsperado = regexContratoNaoEsperado.exec(somenteRodapeNf);
            
            //Se nao achar contrato nao esperado
            if (!matchContratoNaoEsperado){
                return {
                    col1: 'CONTRATO',
                    col2: '-',
                    col3: '-',
                    col4: `Nao encontrado contrato ${contratoEsperado} na NF`
                };
            }

            //Se achar contrato nao esperado
            return {
                col1: 'CONTRATO',
                col2: matchContratoNaoEsperado[0],
                col3: '-',
                col4: `Contrato na NF incompatível com ${contratoEsperado}`
            };
        }

        /* -------------------------- PROCURANDO O CONTRATO ESPERADO NO PEDIDO -------------------------- */
        const matchContratoPed = regexContrato.exec(pedidoPagina)

        /* ------------------------ PROCURANDO O CONTRATO NAO ESPERADO NO PEDIDO ------------------------ */
        
        if (!matchContratoPed){
            const matchContratoNaoEsperadoPed = regexContratoNaoEsperado.exec(pedidoPagina)
            
            //Se nao achar contrato nao esperado no pedido
            if(!matchContratoNaoEsperadoPed){
                return {
                    col1: 'CONTRATO',
                    col2: matchContratoNf[0],
                    col3: '-',
                    col4: `Contrato não encontrado no ped`
                };
            }

            //Se achar contrato nao esperado no pedido
            return {
                col1: 'CONTRATO',
                col2: matchContratoNf[0],
                col3: matchContratoNaoEsperadoPed[0],
                col4: `Contrato no Ped incompatível com ${contratoEsperado}`
            };
        }

        /* ------------------------------- SE TUDO OK MOSTRAR O RESULTADO ------------------------------- */
        return {
            col1: 'CONTRATO',
            col2: matchContratoNf[0],
            col3: matchContratoPed[0],
            col4: "OK"
        };

    } catch(error){
        console.error(error)
        return {
            col1: 'CONTRATO',
            col2: '-',
            col3: '-',
            col4: "Erro ao ler o contrato"
        };
    }
}