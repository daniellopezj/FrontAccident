import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AccidentService {
    constructor(private http: HttpClient) { }
  
    public getCategory(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/category`);
    }

    public getOfensive(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/ofensive`);
    }
    
    public getPoliceReport(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/PoliceReport`);
    }
    
    public getdayWeek(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/dayWeek`);
    }
    
    public getmonth(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/month`);
    }
}