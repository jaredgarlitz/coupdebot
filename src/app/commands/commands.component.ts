import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";


@Component({
  selector: 'app-commands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.css'
})

export class CommandsComponent{
  listItems = ['A', 'B', 'C', 'D'];
  public test() {
    // let listItems: string[] = ['A', 'B', 'C', 'D'];
    // listItems.forEach(item => {
    //   console.log(item);
    // })
  }
}