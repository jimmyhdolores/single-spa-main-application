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
  npmrcData = {
    key: '',
    value: '',
  };


  constructor(private readWriteService: FileManipulationService) { }

  ngOnInit(): void {
    this.readFileData();
  }

  readFileData() {
    this.subscriptionData = this.readWriteService.readDataFromFile().subscribe(
      (response) => {
        if (response) {
          console.log('response===== ', response.fileData.content.NPMRCData);
          this.dataFromFile = response.fileData.content.NPMRCData;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addNpmrc(): void {
    this.showAddEdit = true;
    this.showInputBoxKey = false;
    this.showInputBoxValue = false;
  }

  hideNpmrc(): void {
    this.showAddEdit = false;
    this.npmrcData = {
      key: '',
      value: '',
    };
    this.npmrcTitle = 'Add Key Value';
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
  }

  editKeyNpmrc(data) {
    this.showAddEdit = true;
    this.npmrcTitle = 'Edit Key';
    this.npmrcData.key = data.key;
    this.npmrcData.value = data.value;
    this.showInputBoxKey = false;
    this.showInputBoxValue = true;
  }

  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }

}
