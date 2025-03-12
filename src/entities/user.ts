import { randomUUID } from "node:crypto";

interface UserProps {
  id: string;
  name?: string | null;
  email: string;
  password?: string | null;
  phone: string;
  username: string;
}

export class User {
  private readonly props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get phone() {
    return this.props.phone;
  }

  get username() {
    return this.props.username
  }

  public static create(props: Omit<UserProps, "id">): User {
    const id = randomUUID();
    return new User({ id, ...props });
  }

  public static delete(id: string) {
    
  }
}
