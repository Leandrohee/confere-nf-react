export function organizaMarcas(marca: string): string{

    //Convertendo gmLeve
    if (
        /general/gi.test(marca) 
        || /gm/gi.test(marca)
        || /cruze/gi.test(marca)
    ){
        return "gmLeve"
    };

    //Convertendo renaultLeve
    if (
        /renault/gi.test(marca)
        || /kangoo/gi.test(marca)
    ){
        return "renaultLeve"
    }; 

    //Convertendo agralePesado
    if (
        /agrale/gi.test(marca)
        || /granmini/gi.test(marca)
    ){
        return "agralePesado"
    }; 



    //Se nao achar nenhum match
    return "nenhuma marca encontrada"
}