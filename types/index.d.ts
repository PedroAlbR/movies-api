export interface Movie {
  title: string;
  director: string;
  studio: string;
  genre: string;
  year: number;
}

export interface User {
  username?: string;
  password: string;
}

export interface Comment {
  user?: string;
  movie?: string;
  text: string;
}

export type Payload = Movie | User | Comment;
