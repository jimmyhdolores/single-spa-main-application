import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingDetailService } from '../../services/logging-detail.service';

@Component({
  selector: 'logging-details-logging-details',
  templateUrl: './logging-details.component.html',
  styleUrls: ['./logging-details.component.css']
})
export class LoggingDetailsComponent implements OnInit, OnDestroy {

  private subscriptionData: Subscription;
  content: string;
  loader: boolean = true;

  constructor(private loggingService: LoggingDetailService) { }

  ngOnInit(): void {
    this.getLoggingData();
  }

  getLoggingData() {
    this.loader = true;
    this.subscriptionData = this.loggingService.getLoggingDetails()
      .subscribe((response) => {
        console.log('response===== ', response);
        if (response.loggingOutput.status) {
          this.content = response.loggingOutput.content;
          this.loader = false;
        } else {
          this.loader = false;
          alert(response.loggingOutput.message);
        }
      },
        (error) => {
          console.log('Error While Executing Command ', error);
          this.loader = false;
        }
      );
  }

  clearLog() {
    this.loader = true;
    this.subscriptionData = this.loggingService.clearLogFile()
      .subscribe((response) => {
        console.log('response===== ', response);
        if (response.loggingOutput.status) {
          this.content = response.loggingOutput.content;
          this.loader = false;
        } else {
          this.loader = false;
          alert(response.loggingOutput.message);
        }
      },
        (error) => {
          console.log('Error While Executing Command ', error);
          this.loader = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
