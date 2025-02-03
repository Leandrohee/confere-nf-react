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

    //Convertendo mbPesado
    if (
        /mercedes benz/gi.test(marca)
    ){
        return "mbPesado"
    }

    //Convertendo mbUtilitario
    if (
        /sprinter/gi.test(marca)
    ){
        return "mbUtilitario"
    }

    //Convertendo vwPesado
    if (
        /granmidi/gi.test(marca)
    ){
        return "vwPesado"
    }


    //Se nao achar nenhum match
    return "nenhuma marca encontrada"
}