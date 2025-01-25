/* ------------- ARQUIVO RESPONSAVEL POR LIDAR COM AS INFORMACOES DAS PAGINAS DO PDF ------------ */

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

//Variavel pagPdf
export interface pagPdf{
    pagina: number,
    conteudo: string
}

//Tudo oq oq o context vai distribuir
export interface PagPdfProps{
    pagPdf: pagPdf[]|null
    setPagPfg: Dispatch<SetStateAction<pagPdf[]>> | any,
}

/* ------------------------------- CRIANDO UM CONTEXT PARA PAGPDF ------------------------------- */
export const PagPdfContext = createContext<PagPdfProps>(
    {} as PagPdfProps
)

/* ---------------------------- CRIANDO O PROVIDER PARA AS PAGINASPDF --------------------------- */
export function PagPdfProvider({children}: {children: React.ReactNode}){
    const [pagPdf, setPagPfg] = useState(null)

    return(
        <PagPdfContext.Provider value={
            {
                pagPdf,                     //Isso se lê assim: pagPdf: pagPdf
                setPagPfg                   //Isso se lê assim: setPagPfg: setPagPfg
            }
        }>
            {children}
        </PagPdfContext.Provider>
    )
}

/* -- CRIANO UM HOOK PERSONALIZADO PARA NAO PRECISAR IMPORTAR O USECONTEXT() E O AuthContext SEMPRE -- */
export function usePagPdfContext(){
    const linhasProvider = useContext(PagPdfContext)
    return linhasProvider
}

/* ----------------------------------------- INFORMACOES ---------------------------------------- */
/*
Para usar as variavel os metodo em qualquer página é só:

1. Aplicar o PagPdfProvider envolvendo o arquivo root no caso aqui o main.ts 

2. Importar o usePagPdfContext

3. Carregar ele na pagina especifica assim:
    const pagPdfProvider = usePagPdfContext();

4. Comecar a usar assim:
    console.log(pagPdfProvider?.pagPdf)
    console.log(pagPdfProvider?.setPagPdf)
 
*/