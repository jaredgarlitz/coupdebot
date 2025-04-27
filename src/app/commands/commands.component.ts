import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, ViewChild } from "@angular/core";
import { CommandApiService } from "../core/services/api/commands-api.service";
import { User } from "../core/services/service";
import { AuthenticationService } from "../core/services/api/auth-api.service";
import { switchMap, tap, first, startWith } from "rxjs";
import { command } from "./commands";
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommandsDialogComponent } from "./commands-dalog/commands-dialog.component";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeleteCommandsDialogComponent } from "./delete-command-dialog/delete-command-dialog.component";


@Component({
  selector: 'app-commands',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatProgressSpinnerModule, MatPaginator, MatPaginatorModule, MatButtonModule, MatSlideToggleModule],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.css'
})


export class CommandsComponent implements AfterViewInit{

  constructor(
    private authService: AuthenticationService,
    private commandservice: CommandApiService,
    private matDialog: MatDialog
  ){}
  listItems = ['A', 'B', 'C', 'D'];

  isLoadingResults = signal(true);
  dataError = signal(false);
  totalItems = signal(0);
  tableColumns = signal([] as string[]);

  user!: User;
  commandsArray = signal([] as command[]);
  expandedElement!: command | null;
  columnsToDisplay = ['commandName', 'commandString', 'commandResponse'];
  resultsLength!: number;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'edit', 'delete'];

  ngAfterViewInit() {
    this.authService.verifyUser().pipe(
      startWith(),
      switchMap(user => {
        this.user = user;
        return this.commandservice.getDefaultCommandsForUser(user.twitchUsername);
      }),
      switchMap(data => {
        this.commandsArray.set(data);
        this.totalItems.set(data.length);
        return this.commandservice.getCustomCommandsForUser(this.user.twitchUsername);
      })
    ).subscribe(data => {
      data.forEach((command: command) => {
        this.commandsArray.update(value => {
          return [...value, command];});
      });
      
      this.isLoadingResults.set(false);
      this.totalItems.update(value => { 
        return value + data.length;
      });
    });
  }

  isExpanded(command: command) {
    return this.expandedElement === command;
  }

  toggle(command: command) {
    this.expandedElement = this.isExpanded(command) ? null : command;
  }

  createCommand() {
    let dialogRef = this.matDialog.open<CommandsDialogComponent, {}, command>(CommandsDialogComponent, {data: {}})
  }

  editCommand(row: command){
    let dialogRef = this.matDialog.open<CommandsDialogComponent, {command: command}, command>(CommandsDialogComponent, { data: { command: row} });

    dialogRef.afterClosed().subscribe((closeResponse) => {
      return;
    })
  }

  deleteCommand(row: command){
    let dialogRef = this.matDialog.open<DeleteCommandsDialogComponent, {command: command}, command>(DeleteCommandsDialogComponent, { data: { command: row} });

    dialogRef.afterClosed().subscribe((closeResponse) => {
      return;
    })
  }
}