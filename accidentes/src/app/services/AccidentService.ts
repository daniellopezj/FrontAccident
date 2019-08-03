import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AccidentService {
    constructor(private http: HttpClient) { }
  
    public getcountyName(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/countyName`);
    }

    public getnumVechicle(): Observable<JSON> {
        return this.http.get<JSON>(`http://localhost:3000/numVechicle`);
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