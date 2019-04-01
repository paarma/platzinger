import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
    
    /**
     * Se sobreescribe el metodo de la interfaz PipeTransform
     * @param value = lista de datos en la cual  se va ha hacer la busqueda
     * @param args = parametros para la busqueda
     */
    public transform(value, args: string){
        if(!value){
            return;
        }

        if(!args){
            return value;
        }

        //Se convierte en minusculas los argumentos para comparar contra la misma forma (minusculas)
        args = args.toLowerCase();

        // 'item' hace referencia al elemento de la lista (similar al alias del foreach)
        //JSON.stringify: convierte de un valor javascrip a un objeto javacrip
        //includes retorna true si incluye la cadena de los argumentos en el contenido del item
        return value.filter((item => {
            return JSON.stringify(item).toLowerCase().includes(args);
        }))
    }

}