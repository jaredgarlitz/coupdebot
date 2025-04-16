import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { command } from "../../../commands/commands";

@Injectable({
  providedIn: 'root'
})

export class CommandApiService {
  private path = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}

  public getDefaultCommandsForUser(twitchChannelName: string) {
    return this.http.get<any>(`${this.path}twitch/commands/default/channel/${twitchChannelName}`);
  }

  public getCustomCommandsForUser(twitchChannelName: string) {
    return this.http.get<any>(`${this.path}twitch/commands/custom/channel/${twitchChannelName}`);
  }
}