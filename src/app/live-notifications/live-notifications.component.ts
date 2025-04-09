import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'app-live-notification',
  standalone: true,
  imports: [],
  templateUrl: './live-notifications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LiveNotificationComponent {

}