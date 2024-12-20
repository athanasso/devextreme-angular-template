import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  private API_BASE_URL = 'https://covid-api.com/api';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    try {
      return this.http
        .get<{ data: Country[] }>(`${this.API_BASE_URL}/regions?`)
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error fetching countries:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error fetching countries:', error);
      return of([]);
    }
  }

  // COVID-19 statistics for a specific country and date
  getCountryStatistics(
    iso: string,
    date: string
  ): Observable<CountryStatistics[]> {
    try {
      return this.http
        .get<{ data: CountryStatistics[] }>(
          `${this.API_BASE_URL}/reports?date=${date}&iso=${iso}&`
        )
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error fetching country statistics:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error fetching country statistics:', error);
      return of([]);
    }
  }

  // worldwide COVID-19 statistics for the last week
  getWeeklyWorldStatistics(): Observable<WeeklyWorldStatistics> {
    try {
      const today = new Date();
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      return this.http
        .get<{ data: WeeklyWorldStatistics }>(
          `${this.API_BASE_URL}/reports/total?datem=${
            oneWeekAgo.toISOString().split('T')[0]
          }&`
        )
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error fetching weekly statistics:', error);
            return of();
          })
        );
    } catch (error) {
      console.error('Error fetching weekly statistics:', error);
      return of();
    }
  }

  // all country reports
  getAllCountryReports(): Observable<CountryReport> {
    try {
      return this.http
        .get<{ data: CountryReport }>(
          `${this.API_BASE_URL}/reports?per_page=1000&`
        )
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            console.error('Error fetching country reports:', error);
            return of();
          })
        );
    } catch (error) {
      console.error('Error fetching country reports:', error);
      return of();
    }
  }
}

export interface Country {
  iso: string;
  name: string;
}

export interface CountryStatistics {
  date: string;
  confirmed: number;
  active: number;
  deaths: number;
  recovered: number;
}

export interface WeeklyWorldStatistics {
  date: string;
  confirmed: number;
  deaths: number;
  active: number;
}

export interface CountryReport {
  region: Country;
  confirmed: number;
  active: number;
  recovered: number;
  deaths: number;
}
