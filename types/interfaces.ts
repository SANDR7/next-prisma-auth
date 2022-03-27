import { user } from "@prisma/client";

export interface account extends user {
	isLoggedIn: boolean;
  }
  
 export interface Account {
	account?: account;
  }