import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ListsService } from "../../shared/services/lists/lists.service";
import { ToastService } from "../../shared/services/toast/toast.service";
import { List } from "../../models/list.model";

@Injectable()
export class ListResolve implements Resolve<any>{

    constructor(
        private listsService: ListsService, 
        private toastService: ToastService,
        private router: Router    
      ){ }

      resolve(route: ActivatedRouteSnapshot){
        return this.listsService.getOne(route.params)
        .catch(error => {
            this.toastService.toastTrigger({
              message: error.error.message,
              options: {type: 'error'}
            });
          this.router.navigate(['/main/projects']);
          return Observable.of(null);
        });    
      }

}