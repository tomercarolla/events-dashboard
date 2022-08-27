export interface EventDetails {
  user: UserDetails;
  eventType: string;
  severity: string;
  time: Date | string;
}

export interface UserDetails {
  name: string;
  email: string;
}
