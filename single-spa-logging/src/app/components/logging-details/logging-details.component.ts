import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingDetailService } from '../../services/logging-detail.service';
import { log } from 'util';

@Component({
  selector: 'logging-details-logging-details',
  templateUrl: './logging-details.component.html',
  styleUrls: ['./logging-details.component.css']
})
export class LoggingDetailsComponent implements OnInit, OnDestroy {

  private subscriptionData: Subscription;
  content: string;
  loader: boolean = false;
  showTable: boolean = false
  auditDataContent: any = [];

  constructor(private loggingService: LoggingDetailService) {
  }

  ngOnInit(): void {
    //this.getLoggingData();
    this.getAuditingData();
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

  getAuditingData() {
    window.addEventListener('auditData', (evt: CustomEvent) => {
      this.auditDataContent = evt.detail.auditContent;
      this.loader = false;
      this.showTable = true;
    });
    this.writeAuditDataToFile(this.auditDataContent);
  }

  getAllHistoryAudit() {
    this.subscriptionData = this.loggingService.getAllHistoryAudit()
      .subscribe(
        (response) => {
          console.log('response data========== ', response.result.auditData);
          this.auditDataContent = response.result.auditData;
          this.showTable = true;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  writeAuditDataToFile(data: any) {
    this.subscriptionData = this.loggingService
      .writeAuditDataToFile(data)
      .subscribe(
        (response) => {
          console.log('response===== ', response);
        },
        (error) => {
          console.log(error);
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
