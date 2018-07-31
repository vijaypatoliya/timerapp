import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'projectsFilter',
    pure: false
})
export class ProjectsFilterPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }
        filter = filter.toLowerCase();
        return items.filter(function(item){
          if (item.projectName.toLowerCase().indexOf(filter) != -1 ||
              item.projectDescription.toLowerCase().indexOf(filter) != -1 ||
              item.projectOwner.toLowerCase().indexOf(filter) != -1 ||
              item.projectCategory.toLowerCase().indexOf(filter) != -1) {
              return item;
          } 
        });
    }
}