import { MemoryDetailsService } from './../../services/memory-details.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angular-charts-memory-details',
  templateUrl: './memory-details.component.html',
  styleUrls: ['./memory-details.component.css']
})
export class MemoryDetailsComponent implements OnInit {

  private subscriptionData: Subscription;
  constructor(private memoryChartServices: MemoryDetailsService) { }

  ngOnInit(): void {
    this.getMemoryData();
    this.getDiskWiseMemoryData();
  }

  titlePie = 'Pie Chart For Harddisk';
  titleBar = 'Bar Chart For Harddisk';
  typePie = 'PieChart';
  typeBar = 'BarChart';
  data = [];
  diskWiseData = [];
  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true,
  };
  optionsPie = {
    colors: ['#000080', '#00FF00', '#00FFFF', '#0000FF', '#FF0000'], is3D: true
  };
  width = 550;
  height = 400;
  loading = true;

  getMemoryData() {
    this.subscriptionData = this.memoryChartServices
      .getMemoryDetailsData()
      .subscribe(
        (response) => {
          if (response) {
            this.data = response.hardwareDetailsData.content;
            this.loading = false;
            console.log('data=========== ', this.data);
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  getDiskWiseMemoryData() {
    this.subscriptionData = this.memoryChartServices
      .getDiskWiseMemoryData()
      .subscribe(
        (response) => {
          if (response) {
            this.diskWiseData = response.hardwareDetailsData.content;
            this.loading = false;
            console.log('diskWiseData=========== ', this.diskWiseData);
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    if(this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
