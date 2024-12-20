import { Component } from '@angular/core';
import {
  CovidService,
  WeeklyWorldStatistics,
} from 'src/app/services/covid.services';

@Component({
  selector: 'app-weekly-chart',
  templateUrl: './weekly-chart.component.html',
  styleUrls: ['./weekly-chart.component.scss'],
})
export class WeeklyChartComponent {
  weeklyData: WeeklyWorldStatistics[] = [];

  constructor(private covidService: CovidService) {}

  ngOnInit() {
    this.covidService
      .getWeeklyWorldStatistics()
      .subscribe((data: WeeklyWorldStatistics) => {
        this.weeklyData.push(data);
      });
  }
}
