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
            linha: "fiat",
            desconto: "55,00"
        },
        {
            linha: "gm",
            desconto: "58,20"
        },
    ]
);

const fornecedor2 = new Fornecedor(
    "gilson",                                           //Nome              -> formato: string
    "14/2025",                                          //Ne                -> formato: 00/0000
    "29/2022",                                          //Contrato          -> formato: 00/0000
    [
        {
            linha: "citroen",                        //Nome da linha     -> formato: string
            desconto: "43,10"                           //Desconto          -> formato: 00,00
        },
        {
            linha: "gmUtilitario",
            desconto: "47,51"
        },
        {
            linha: "jeep",
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
            linha: "scania",
            desconto: "36,10"
        },
        {
            linha: "toyota",
            desconto: "36,10"
        },
        {
            linha: "vw",
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
            linha: "cummins",                           //Nome da linha     -> formato: string
            desconto: "41,00"                           //Desconto          -> formato: 00,00
        },
    ]
);

const fornecedor4 = new Fornecedor(
    "parts",                                                //Nome              -> formato: string
    "21/2025",                                              //Ne                -> formato: 00/0000
    "46/2024",                                              //Contrato          -> formato: 00/0000
    [
        {
            linha: "renault",                               //Nome da linha     -> formato: string
            desconto: "58,10"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "honda",                                 //Nome da linha     -> formato: string
            desconto: "46,00"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "yamaha",                                //Nome da linha     -> formato: string
            desconto: "46,00"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "mitsubishi",                            //Nome da linha     -> formato: string
            desconto: "56,10"                               //Desconto          -> formato: 00,00
        },
        {
            linha: "iveco",                                 //Nome da linha     -> formato: string
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
            linha: "iturri",                            //Nome da linha     -> formato: string
            desconto: "29,00"                           //Desconto          -> formato: 00,00
        },
        {
            linha: "pierce",                            //Nome da linha     -> formato: string
            desconto: "30,00"                           //Desconto          -> formato: 00,00
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
]