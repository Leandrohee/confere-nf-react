import { Fornecedor, FornecedoresProps } from "./interfaces";

/* ---------------------------------------- FORNECEDORES ---------------------------------------- */
const fornecedor1 = new Fornecedor(
    "mix",                                              //Nome              -> formato: string
    "22/2025",                                           //Ne                -> formato: 00/0000
    "41/2024",                                          //Contrato          -> formato: 00/0000
    [
        {
            linha: "fordPesado",                        //Nome da linha     -> formato: string
            desconto: "55,00"                           //Desconto          -> formato: 00,00
        },
        {
            linha: "fiatLeve",
            desconto: "55,00"
        },
        {
            linha: "gmLeve",
            desconto: "58,20"
        },
    ]
);

const fornecedor2 = new Fornecedor(
    "rabelo",                                           //Nome              -> formato: string
    "14/2025",                                          //Ne                -> formato: 00/0000
    "29/2022",                                          //Contrato          -> formato: 00/0000
    [
        {
            linha: "citroenLeve",                           //Nome da linha     -> formato: linha/Tipo
            desconto: "43,10"                           //Desconto          -> formato: 00,00
        },
        {
            linha: "gmUtilitario",                      //
            desconto: "47,51"
        },
        {
            linha: "jeepUtilitario",
            desconto: "49,10"
        },
        {
            linha: "mbPesado",
            desconto: "39,91"
        },
        {
            linha: "mbUtilitario",
            desconto: "47,51"
        },
        {
            linha: "scaniaPesado",
            desconto: "36,10"
        },
        {
            linha: "toyotaUtilitario",
            desconto: "36,10"
        },
        {
            linha: "vwPesado",
            desconto: "49,10"
        },
    ]
);

const fornecedor3 = new Fornecedor(
    "romeo",                                            //Nome              -> formato: string
    "00/2025",                                          //Ne                -> formato: 00/0000
    "45/2024",                                          //Contrato          -> formato: 00/0000
    [
        {
            linha: "cumminsPesado",                     //Nome da linha     -> formato: linha/Tipo
            desconto: "41,00"                           //Desconto          -> formato: 00,00
        },
    ]
);

const fornecedor4 = new Fornecedor(
    "parts lub",                                            //Nome              -> formato: string
    "21/2025",                                              //Ne                -> formato: 00/0000
    "46/2024",                                              //Contrato          -> formato: 00/0000
    [
        {
            linha: "renaultLeve",                           //Nome da linha     -> formato: linha/tipo
            desconto: "58,10"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "hondaMoto",                             //Nome da linha     -> formato: linha/tipo
            desconto: "46,00"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "yamahaMoto",                            //Nome da linha     -> formato: linha/tipo
            desconto: "46,00"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "mitsubishiUtilitario",                  //Nome da linha     -> formato: linha/tipo
            desconto: "56,10"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "ivecoPesado",                           //Nome da linha     -> formato: linha/tipo
            desconto: "52,10"                               //Desconto          -> formato: 00,00
        },
    ]
);

const fornecedor5 = new Fornecedor(
    "aderbauto",                                         //Nome              -> formato: string
    "00/2025",                                           //Ne                -> formato: 00/0000
    "44/2024",                                           //Contrato          -> formato: 00/0000
    [
        {
            linha: "iturriPesado",                      //Nome da linha     -> formato: linha/Tipo
            desconto: "29,00"                           //Desconto          -> formato: 00,00
        },
        {
            linha: "piercePesado",                            //Nome da linha     -> formato: linha/Tipo
            desconto: "30,00"                           //Desconto          -> formato: 00,00
        },
    ]
);

const fornecedor6 = new Fornecedor(
    "patricia",                                             //Nome              -> formato: string
    "52/2025",                                              //Ne                -> formato: 00/0000
    "43/2024",                                              //Contrato          -> formato: 00/0000
    [
        {
            linha: "agralePesado",                          //Nome da linha     -> formato: linha/tipo
            desconto: "49,00"                               //Desconto          -> formato: 00,00
        },
    ]
);


/* ------------------------------------ TODOS OS FORNECEDORES ----------------------------------- */
export const fornecedores: FornecedoresProps[] = [
    fornecedor1,
    fornecedor2,
    fornecedor3,
    fornecedor4,
    fornecedor5,
    fornecedor6
]