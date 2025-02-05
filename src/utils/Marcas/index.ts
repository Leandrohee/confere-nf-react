export function organizaMarcas(marca: string): string|boolean{

    //Convertendo fordPesado
    if (
        /cargo/gi.test(marca) 
    ){
        return 'fordPesado'
    }

    //Convertendo fiatLeve
    if (
        /argo/gi.test(marca) 
        || /uno/gi.test(marca)
        || /palio/gi.test(marca)
    ){
        return 'fiatLeve'
    }

    //Convertendo gmLeve
    if (
        /cruze/gi.test(marca)
    ){
        return "gmLeve"
    };

    //Convertendo citroenLeve
    if (
        /c4/gi.test(marca)
    ){
        return "citroenLeve"
    };

    //Convertendo gmUtilitario
    if (
        /s10/gi.test(marca)
    ){
        return "gmUtilitario"
    };

    //Convertendo jeepUtilitario
    if (
        /renegade/gi.test(marca)
    ){
        return "jeepUtilitario"
    };

    //Convertendo mbPesado
    if (
        /atego/gi.test(marca)
        || /0 500/gi.test(marca)
        || /1923/gi.test(marca)
        || /acello/gi.test(marca)
        || /516/gi.test(marca)
    ){
        return "mbPesado"
    }

    //Convertendo mbUtilitario
    if (
        /sprinter/gi.test(marca)
    ){
        return "mbUtilitario"
    }

    //Convertendo scaniaPesado
    if (
        /p360/gi.test(marca)
        || /p-360/gi.test(marca)
        || /p 440/gi.test(marca)
        || /p320/gi.test(marca)
        || /vabis/gi.test(marca)
    ){
        return "scaniaPesado"
    }

    //Convertendo toyotaUtilitario
    if (
        /hilux/gi.test(marca)
    ){
        return "toyotaUtilitario"
    }

    //Convertendo vwPesado
    if (
        /granmidi/gi.test(marca)
        || /13.180/gi.test(marca)
        || /17.210/gi.test(marca)
        || /piá/gi.test(marca)
        || /grand via/gi.test(marca)
        || /17250/gi.test(marca)
        || /31.320/gi.test(marca)
        || /15.190/gi.test(marca)
        || /19.390/gi.test(marca)
        || /31.330/gi.test(marca)
    ){
        return "vwPesado"
    }
    
    //Convertendo cummisPesado
    if (
        /cummis/gi.test(marca)
    ){
        return "cummisPesado"
    }

    //Convertendo fordUtilitario
    if (
        /transit/gi.test(marca) 
        || /ranger/gi.test(marca) 
    ){
        return 'fordUtilitario'
    }

    //Convertendo renaultLeve
    if (
        /renault/gi.test(marca)
        || /kangoo/gi.test(marca)
        || /sandero/gi.test(marca)
    ){
        return "renaultLeve"
    }; 

    //Convertendo hondaMoto
    if (
        /xre/gi.test(marca)
        || /cb 500/gi.test(marca)
    ){
        return "hondaMoto"
    }; 

    //Convertendo yamahaMoto
    if (
        /xtz/gi.test(marca)
        || /xt 660/gi.test(marca)
        || /f300/gi.test(marca)
    ){
        return "yamahaMoto"
    }; 


    //Convertendo mitsubishiUtilitario
    if (
        /l200/gi.test(marca)
    ){
        return "mitsubishiUtilitario"
    }; 

    //Convertendo ivecoPesado
    if (
        /70c16/gi.test(marca)
        || /ectector/gi.test(marca)
        || /daily/gi.test(marca)
        || /trakker/gi.test(marca)
    ){
        return "ivecoPesado"
    }; 

    //Convertendo agralePesado
    if (
        /agrale/gi.test(marca)
        || /granmini/gi.test(marca)
    ){
        return "agralePesado"
    }; 

    //Se nao achar nenhum match
    return false
}