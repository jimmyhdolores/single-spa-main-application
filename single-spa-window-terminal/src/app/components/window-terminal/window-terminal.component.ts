import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WindowTerminalService } from 'src/app/services/window-terminal.service';


@Component({
  selector: 'angular-terminal-window-terminal',
  templateUrl: './window-terminal.component.html',
  styleUrls: ['./window-terminal.component.css']
})
export class WindowTerminalComponent implements OnInit, OnDestroy {

  private subscriptionData: Subscription;
  content: string;
  showExecutedCommandResult: boolean = false;
  showExecutedCommands: boolean = false;
  loader: boolean = false;
  showData: boolean = false;
  executeCommands = [];
  executedCommandName: string;

  constructor(private terminalService: WindowTerminalService) { }

  ngOnInit(): void {
  }

  commandData = {
    command: ''
  };

  executeCommand() {
    this.showExecutedCommandResult = false;
    this.showExecutedCommands = false;
    this.loader = true;
    this.subscriptionData = this.terminalService.executeCommand(this.commandData.command)
      .subscribe((response) => {
        console.log('response===== ', response);
        if (response.commandOuput.content.status) {
          this.executedCommandName = this.commandData.command;
          this.content = response.commandOuput.content.output;
          this.executeCommands = response.commandOuput.content.executedCommands;
          this.showExecutedCommandResult = true;
          this.loader = false;
          this.showData = true;
        } else {
          this.loader = false;
          this.showData = false;
          alert(response.commandOuput.content.message);
        }
      },
        (error) => {
          console.log('Error While Executing Command ', error);
          this.loader = false;
        }
      );
  }

  showExecutedCommandList() {
    this.showExecutedCommandResult = false;
    this.showExecutedCommands = false;
    this.loader = true;
    this.subscriptionData = this.terminalService.getExecutedCommands()
      .subscribe((response) => {
        console.log('response===== ', response);
        if (response) {
          this.executeCommands = response.executedCommands.content;
          this.showExecutedCommands = true;
          this.loader = false;
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
