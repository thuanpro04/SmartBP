export interface UserType {
  email: string;
  name: string;
  photo: string;
  accessToken: string;
}
export interface measureInfo {
  timestamp: Date;
  systolic: number;
  diastolic: number;
  pulse: number;
  tag: string[];
  _id: string;
}