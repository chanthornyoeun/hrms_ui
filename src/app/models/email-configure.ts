export interface EmailConfigure {
  driver: string;
  host: string;
  port: number;
  encryption: string;
  fromAddress: string;
  fromName: string;
  username: string;
  password: string;
}
