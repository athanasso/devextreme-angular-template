import { Component } from '@angular/core';
import {
  Country,
  CountryStatistics,
  CovidService,
} from 'src/app/services/covid.services';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  countries: { iso: string; name: string }[] = [];
  selectedCountry: string = '';
  selectedDate: Date = new Date();
  yesterdayDate: Date = new Date(new Date().setDate(new Date().getDate() - 1));
  countryStats!: {
    confirmed: number;
    active: number;
    deaths: number;
    recovered: number;
  };

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getCountries().subscribe((response: Country[]) => {
      this.countries = response;
    });
  }

  fetchCountryStats() {
    if (this.selectedCountry && this.selectedDate) {
      this.covidService
        .getCountryStatistics(
          this.selectedCountry,
          this.selectedDate.toISOString().split('T')[0]
        )
        .subscribe({
          next: (response: CountryStatistics[]) => {
            let aggregatedStats = {
              confirmed: 0,
              active: 0,
              deaths: 0,
              recovered: 0,
            };
            response.forEach(
              (item: {
                confirmed: number;
                active: number;
                deaths: number;
                recovered: number;
              }) => {
                aggregatedStats.confirmed += item.confirmed;
                aggregatedStats.active += item.active;
                aggregatedStats.deaths += item.deaths;
                aggregatedStats.recovered += item.recovered;
              }
            );
            this.countryStats = aggregatedStats;
          },
          error: () => {
            this.countryStats = {
              confirmed: 0,
              active: 0,
              deaths: 0,
              recovered: 0,
            };
          },
        });
    }
  }

  onDateChanged(value: Date): void {
    this.selectedDate = new Date(value);
  }
}
