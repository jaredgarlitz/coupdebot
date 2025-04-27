import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { command } from "../commands";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommandApiService } from "../../core/services/api/commands-api.service";
import { AuthenticationService } from "../../core/services/api/auth-api.service";
import { tap } from "rxjs/operators";

@Component({
  templateUrl: './commands-dialog.component.html',
  styleUrls: ['./commands-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: '', useValue: { showError: true }
  }],
  standalone: true,
  imports : [MatSlideToggleModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})

export class CommandsDialogComponent implements AfterViewInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {command: command},
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<CommandsDialogComponent, command>,
    private fb: FormBuilder,
    private commandService: CommandApiService,
    private authService: AuthenticationService
  ){

  }

  commandFormControls = {
    command_name: this.fb.control(''),
    command_string: this.fb.control(''),
    command_response: this.fb.control(''),
    command_description: this.fb.control(''),
    active: this.fb.control(false),
    cooldown_timer: this.fb.control(0)
  };

  commandFormGroup = this.fb.group(this.commandFormControls);

  readonly command = this.data.command;

  twitchChannel = '';
  commandId = this.data.command ? this.data.command._id : null;
  readonly commandType = this.data.command ? this.data.command.commandType : 'custom';

  ngAfterViewInit(): void {
    this.commandFormControls.command_name.setValue(this.command?.commandName);
    this.commandFormControls.command_string.setValue(this.command?.commandString);
    this.commandFormControls.command_response.setValue(this.command?.commandResponse);
    this.commandFormControls.command_description.setValue(this.command?.commandDescription);
    this.commandFormControls.active.setValue(this.command?.activated);
    this.commandFormControls.cooldown_timer.setValue(this.command?.cooldownTimer);
    
    this.authService.verifyUser().pipe(
      tap((user: { twitchUsername: string; }) => {
        this.twitchChannel = user.twitchUsername;
      })
    ).subscribe();
  }

  onSaveClick(): void {
    let commandData: command = {
      _id: this.commandId!,
      commandName: this.commandFormControls.command_name.value!,
      commandDescription: this.commandFormControls.command_description.value!,
      commandResponse: this.commandFormControls.command_response.value!,
      commandString: this.commandFormControls.command_string.value!,
      activated: this.commandFormControls.active.value!,
      cooldownTimer: this.commandFormControls.cooldown_timer.value!,
      twitchUsageLevel: this.command ? this.command.twitchUsageLevel : '',
      twitchChannel: this.twitchChannel,
      commandType: this.commandType
    }

    if (this.commandId!== null) {
      this.commandService.updateCommand(this.command.commandType, commandData).subscribe(commandResponse => {});
    } else {
      this.commandService.createCommand(commandData).subscribe(commandResponse=> {});
    }
    this.matDialogRef.close();
  }

  onCloseClick(): void {
    this.matDialogRef.close();
  }
}