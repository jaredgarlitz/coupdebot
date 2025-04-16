export interface command {
  _id: string,
  commandName: string,
  commandDescription: string,
  commandString: string,
  commandResponse: string,
  twitchUsageLevel: string,
  activated: boolean,
  cooldownTimer: number,
  twitchChannel: string
}