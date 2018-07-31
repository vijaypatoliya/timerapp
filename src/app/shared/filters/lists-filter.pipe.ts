import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listsFilter',
    pure: false
})
export class ListsFilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        filter = filter.toLowerCase();
        return items.filter(function(item){
          if (item.listName.toLowerCase().indexOf(filter) != -1 ||
              item.listDescription.toLowerCase().indexOf(filter) != -1) {
              return item;
          } 
        });
    }
}