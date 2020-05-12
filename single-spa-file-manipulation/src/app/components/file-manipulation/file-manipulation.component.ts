import { FileManipulationService } from './../../services/file-manipulation.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'file-manipulation-file-manipulation',
  templateUrl: './file-manipulation.component.html',
  styleUrls: ['./file-manipulation.component.css']
})
export class FileManipulationComponent implements OnInit {

  private subscriptionData: Subscription;
  showInputBoxKey = false;
  showInputBoxValue = false;
  dataFromFile;
  npmrcTitle = 'Add Key Value';
  showAddEdit = false;
  showTable: boolean = true;
  loading = true;
  npmrcData = {
    key: '',
    value: '',
  };


  constructor(private readWriteService: FileManipulationService) { }

  ngOnInit(): void {
    this.readFileData();
  }

  readFileData() {
    this.loading = true;
    this.subscriptionData = this.readWriteService.readDataFromFile().subscribe(
      (response) => {
        if (response) {
          console.log('response===== ', response.fileData.content.NPMRCData);
          this.dataFromFile = response.fileData.content.NPMRCData;
          this.showTable = true;
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  addNpmrc(): void {
    this.showTable = false;
    this.showInputBoxKey = false;
    this.showInputBoxValue = false;
    this.showAddEdit = true;
  }

  hideNpmrc(): void {
    this.showAddEdit = false;
    this.npmrcData = {
      key: '',
      value: '',
    };
    this.npmrcTitle = 'Add Key Value';
    this.showTable = true;
  }

  addEditKeyValue() {
    this.showAddEdit = true;
    this.subscriptionData = this.readWriteService
      .writeEditDataToFile(
        this.npmrcData.key,
        this.npmrcData.value,
        this.npmrcTitle
      )
      .subscribe(
        (response) => {
          console.log('response===== ', response);
          if (response) {
            this.showAddEdit = false;
            this.showInputBoxKey = false;
            this.showInputBoxValue = false;
            this.readFileData();
            alert(response.fileData.content);
            this.npmrcData = {
              key: '',
              value: '',
            };
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editValueNpmrc(data) {
    this.showAddEdit = true;
    this.npmrcTitle = 'Edit Value';
    this.npmrcData.key = data.key;
    this.npmrcData.value = data.value;
    this.showInputBoxKey = true;
    this.showInputBoxValue = false;
    this.showTable = false;
  }

  editKeyNpmrc(data) {
    this.showAddEdit = true;
    this.npmrcTitle = 'Edit Key';
    this.npmrcData.key = data.key;
    this.npmrcData.value = data.value;
    this.showInputBoxKey = false;
    this.showInputBoxValue = true;
    this.showTable = false;
  }

  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
