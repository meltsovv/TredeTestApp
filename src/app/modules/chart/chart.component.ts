import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.updateChart();
    this.dataService.page = 1;
  }
}
