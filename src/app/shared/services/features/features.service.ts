import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Feature } from '../../../models/feature.model';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class FeaturesService {
  apiPath: string = '/api/main';
  features: Feature[];

  constructor(private http: HttpClient) { }

  getFeatures(params){
    return this.http.post(this.apiPath + '/features', params, httpOptions).map((result: Feature[]) => {
                    this.features = result;
                    return result;
                    })
                    .catch((error:HttpErrorResponse) => {
                        return Observable.throw(error)
                      });
  }

}
