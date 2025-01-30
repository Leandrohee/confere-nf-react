/* ------------ ARQUIVO RESPONSAVEL POR LIDAR COM AS INFORMACOES DAS LINHAS DA TABELA ----------- */

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

//Variavel linhas 
interface LinhasProps{
    lin: number
    col1: string,
    col2: string|number|null,
    col3: string|number|null,
    col4: string|null,
}

//Tudo oq o context vai destribuir
interface linhasContextProps{
    setLinhas: any,        //Pra falar que é o metodo useState
    linhas: LinhasProps[],
    setTituloTb: Dispatch<SetStateAction<string>>|any,                  //Pra falar que é o metodo useState
    tituloTb: string|null
}

/* ------------------------------- CRIANDO UM CONTEXT PARA LINHAS ------------------------------- */
export const LinhaContext = createContext<linhasContextProps>(
    {} as linhasContextProps
);

/* ----------------------------- CRIANDO UM VALOR PADRAO PARA LINHAS ---------------------------- */
export function vLinhasPadrao(): Array<LinhasProps>{
    //Titulos das linhas
    const titulosLinhas= [
        "PEDIDO",
        "O.S",
        "EMPENHO",
        "CONTRATO",
        "PREFIXO",
        "PLACA",
        "MARCA",
        "DESCONTO",
        "KM",
        "ANO",
        "CÓDIGOS",
        "VALOR"
    ]

    //Gerando o formato das linhas padrao
    const vLinhasPadrao = titulosLinhas.map((linha,index) =>(
        {
            lin: index+1,
            col1: linha,
            col2: null,
            col3: null,
            col4: null,
        }
    ));

    return vLinhasPadrao

}

/* ----------------------- CRIANDO UM VALOR PADRAO PARA O TITULO DA TABELA ---------------------- */
export const vTituloTb: null|string = null

/* ------------------------------ CRIANDO O PROVIDER PARA AS LINHAS ----------------------------- */
export function LinhaProvider({children}: {children: React.ReactNode}){
    const [linhas, setLinhas] = useState(vLinhasPadrao())
    const [tituloTb, setTituloTb] = useState(vTituloTb)

    return(
        <LinhaContext.Provider value={
            {
                setLinhas: setLinhas,                      //Isso se lê assim: setLinhas: setLinhas
                linhas,                          //isso se lê assim: linhas: linhas
                setTituloTb: setTituloTb,
                tituloTb
            }
        }>
            {children}
        </LinhaContext.Provider>
    )
};

/* -- CRIANO UM HOOK PERSONALIZADO PARA NAO PRECISAR IMPORTAR O USECONTEXT() E O AuthContext SEMPRE -- */
export function useLinhasContext(){
    const linhasProvider = useContext(LinhaContext)
    if (!linhasProvider) {
        throw new Error("useLinhasContext must be used within a LinhaProvider");
    }
    return linhasProvider
}

/* ----------------------------------------- INFORMACOES ---------------------------------------- */
/*
Para usar a variavel linhas e o metodo setLinhas em qualquer página é só:

1. Aplicar o LinhaProvider envolvendo o arquivo root no caso aqui o main.ts 

2. Importar o useLinhasContext

3. Carregar ele na pagina especifica assim:
    const linhasProvider = useLinhasContext();

4. Comecar a usar assim:
    console.log(linhasProvider?.linhas)
    console.log(linhasProvider?.setLinhas)
 
*/