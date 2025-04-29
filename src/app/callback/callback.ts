export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: [string];
  token_type: string;
}

export interface TwitchUser {
  twitchUrl: string;
  userName: string;
  accessToken: string;
  refreshToken: string;
  botEnabled: boolean;
}

export interface SpotifyUser {
  
}