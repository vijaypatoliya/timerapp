import { Injectable } from '@angular/core';
import { List } from '../../../models/list.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable()
export class ListsService {
  apiPath: string = '/api/lists';
  list: List;
  taskLists: List[];
  mappedResults: object = {};

  constructor(private http: HttpClient) { }

  getAll(params): Observable<List[]>{
    return this.http.post(this.apiPath + '/all', params, httpOptions).map((result: List[]) => {
                    this.mapedResults(result);
                    return result;
                    })
                    .catch((error:HttpErrorResponse) => {
                        return Observable.throw(error)
                      });
  }

  mapedResults(results){
    let length = results.length;
    for (let i=0;i<length;i++) {
      this.mappedResults[results[i]._id] = results[i];
    }
  }

  addList(list: List): Observable<List>{
    return this.http.post(this.apiPath + '/add', list, httpOptions)
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  getOne(params): Observable<List>{
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: List) => {
      this.list = result;
      return result;
    })
    .catch((error:HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  updateOne(list): Observable<List>{
    return this.http.put(this.apiPath + '/update', list,httpOptions).map((result: List) => {
      this.list = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

}
