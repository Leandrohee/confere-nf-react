import { fornecedores } from "../../utils/Fonecedores";
import { pagPdf } from "../pagPdf/pagPdft";

/* ------------------- FUNCAO QUE CONFERE O FORNECEDOR NA PRIMEIRA PAGINA (NF) ------------------ */
export function fnConfereFornecedor(pagpdf:  pagPdf[]|null): any {
    //Lidando com erros
    if(!pagpdf){
        console.log("Nao foi enviada nenhuma pagina")
        return "";
    }
    
    const primeiraPagina = pagpdf.filter(pagina => pagina.pagina  == 1)   
    const nomeFornecedores = fornecedores.map(fornecedor  => fornecedor.nome)
    
    //transformando os nomes de fornecedores em regex
    const nomeFornecedoresRegex = nomeFornecedores.map(fonecedor  => new RegExp(fonecedor,"gi"))

    //Encontrando o fornecedor atraves de regex
    const fornecedorEncontrado: RegExp|undefined = nomeFornecedoresRegex.find((regex) => 
        regex.test(primeiraPagina[0].conteudo)
    )

    //Se fornecedor nao encontrado
    if (!fornecedorEncontrado) {
        return "Fornecedor n encontrado"
    }

    //Retornando o fornecedor encontrado transformado em string novamente
    return fornecedorEncontrado.source.toUpperCase()
}