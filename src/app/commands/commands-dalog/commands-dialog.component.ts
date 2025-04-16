import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { command } from "../commands";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";

@Component({
  templateUrl: './commands-dialog.component.html',
  styleUrls: ['./commands-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: '', useValue: { showError: true }
  }],
  standalone: true,
  imports : [MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule]
})

export class CommandsDialogComponent implements AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {command: command},
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<CommandsDialogComponent, command>
  ){

  }

  readonly command = this.data.command;

  ngAfterViewInit(): void {
    // console.log(this.command);
  }

  onSaveClick(): void {
    //save form details and post them to server
    this.matDialogRef.close();
  }

  onCloseClick(): void {
    this.matDialogRef.close();
  }
}