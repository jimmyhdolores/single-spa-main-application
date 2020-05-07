import { SystemHardwareDetailsService } from './../../services/system-hardware-details.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hardware-details-hardware-details',
  templateUrl: './hardware-details.component.html',
  styleUrls: ['./hardware-details.component.css']
})
export class HardwareDetailsComponent implements OnInit {

  private subscriptionData: Subscription;
  cpuDetails;
  batteryDetails;
  memoryDetails;
  boisDetails;
  baseBoardDetails;
  graphicsDetails;
  loading = true;

  constructor(private systemHardwareDetailService: SystemHardwareDetailsService) { }

  systemHardwareDetails;
  selectedHardware;

  ngOnInit(): void {
    this.showSelectedHardwareDetails();
  }

  showSelectedHardwareDetails() {
    this.subscriptionData = this.systemHardwareDetailService
      .getSystemHardwareDetailsData()
      .subscribe(
        (response) => {
          if (response) {
            this.cpuDetails =
              response.hardwareDetailsData.content.cpuData;
            this.batteryDetails =
              response.hardwareDetailsData.content.batteryData;
            this.memoryDetails =
              response.hardwareDetailsData.content.memoryData;
            this.boisDetails =
              response.hardwareDetailsData.content.biosData;
            this.baseBoardDetails =
              response.hardwareDetailsData.content.baseboardData;
            this.graphicsDetails =
              response.hardwareDetailsData.content.graphicsData.controllers[0];
            this.loading = false;
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
