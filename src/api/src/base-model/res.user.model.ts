export class ResUser {
  id: string;
  name: string;
  user_name: string;
  email: string;

  constructor(json: any) {
    this.id = json?.id;
    this.name = json?.name;
    this.user_name = json?.user_name;
    this.email = json?.email;
  }
}
