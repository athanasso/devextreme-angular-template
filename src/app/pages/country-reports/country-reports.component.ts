import { Component } from '@angular/core';
import { CountryReport, CovidService } from 'src/app/services/covid.services';

@Component({
  selector: 'app-country-reports',
  templateUrl: './country-reports.component.html',
  styleUrls: ['./country-reports.component.scss'],
})
export class CountryReportsComponent {
  countryReports = {};
  isLoading = true; // flag to track loading state
  gridColumns = [
    { dataField: 'region.iso', caption: 'ISO' },
    { dataField: 'region.name', caption: 'Country' },
    { dataField: 'confirmed', caption: 'Confirmed Cases' },
    { dataField: 'active', caption: 'Active Cases' },
    { dataField: 'recovered', caption: 'Recovered' },
    { dataField: 'deaths', caption: 'Deaths' },
  ];

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService.getAllCountryReports().subscribe({
      next: (data: CountryReport) => {
        this.countryReports = data;
        this.isLoading = false; // turn off loading when data is ready
      },
      error: (err) => {
        console.error('Error fetching country reports', err);
        this.isLoading = false; // turn off loading on error
      },
    });
  }
}
