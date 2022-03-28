import { post, user } from "@prisma/client";

export interface account extends user {
	isLoggedIn: boolean;
	posts: post[];
  }
  
 export interface Account {
	account?: account;
  }