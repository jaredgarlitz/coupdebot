import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { command } from "../commands";
import { CommandApiService } from "../../core/services/api/commands-api.service";

@Component({
  templateUrl: './delete-command-dialog.component.html',
  styleUrl: './delete-command-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: '', useValue: { showError: true }
  }],
  standalone: true,
  imports: []
})

export class DeleteCommandsDialogComponent implements AfterViewInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {command: command},
    private matDialog: MatDialog,
    private MatDialogRef: MatDialogRef<DeleteCommandsDialogComponent, command>,
    private commandService: CommandApiService
  ) {}

  readonly command = this.data.command;

  ngAfterViewInit(): void {
    
  }

  onDeleteConfirmClick(): void {
    this.commandService.deleteCommand(this.command.commandType, this.command._id).subscribe();
    this.MatDialogRef.close();
  }

  onCloseClick(): void {
    this.MatDialogRef.close();
  }
}