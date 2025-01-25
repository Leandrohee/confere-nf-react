/* ----------------------------------------- INTERFACES ----------------------------------------- */
export interface FornecedoresProps{
    nome: string,
    ne: string,
    contrato:  string
    linhas: linha[],
}

export interface linha{
    linha : string,
    desconto: string
} 

export class Fornecedor implements FornecedoresProps{
    constructor(
        public readonly nome: string,
        public readonly ne: string,
        public readonly contrato: string,
        public readonly linhas: linha[]
         
    ){
        // Validate `ne` format with a regular expression
        if (!isValidNe(ne)) {
            throw new Error('Invalid NE format. Expected format: 00/0000');
        }
        if (!isValidContrato(contrato)) {
            throw new Error('Invalid NE format. Expected format: 00/0000');
        }
        this.nome = nome;
        this.ne = ne;
        this.contrato = contrato;
        this.linhas = linhas;
    }
}

/* ------------------------------------- FUNCOES AUXILIARES ------------------------------------- */
function isValidNe(ne: string): boolean{
    const nePattern = /[\d]{2}\/\d{4}/gi;
    return nePattern.test(ne);
}

function isValidContrato(contrato: string): boolean{
    const nePattern = /[\d]{2}\/\d{4}/gi;
    return nePattern.test(contrato);
}
