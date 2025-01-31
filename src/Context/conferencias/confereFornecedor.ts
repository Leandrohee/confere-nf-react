import { fornecedores } from "../../utils/Fonecedores";
import { pagPdf } from "../pagPdf/pagPdft";

/* ------------------- FUNCAO QUE CONFERE O FORNECEDOR NA PRIMEIRA PAGINA (NF) ------------------ */
export async function fnConfereFornecedor(pagpdf:  pagPdf[]|null): Promise<string> {
    //Lidando com erros
    if(!pagpdf){
        return "Nao foi enviada nenhuma pagina";
    }
    
    const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)[0].conteudo   
    const nomeFornecedores = fornecedores.map(fornecedor  => fornecedor.nome)
    
    //transformando os nomes de fornecedores em regex
    const nomeFornecedoresRegex = nomeFornecedores.map(fonecedor  => new RegExp(fonecedor,"gi"))

    //Encontrando o fornecedor atraves de regex
    const fornecedorEncontrado: RegExp|undefined = nomeFornecedoresRegex.find((regex) => 
        regex.test(primeiraPagina)
    )

    //Se fornecedor nao encontrado
    if (!fornecedorEncontrado) {
        return "Fornecedor não encontrado"
    }

    //Retornando o fornecedor encontrado transformado em string novamente
    return fornecedorEncontrado.source.toUpperCase()
}