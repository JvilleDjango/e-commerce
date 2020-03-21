import { UserActionTYpes } from "./user-types";

export const setCurrentUser = user => ({
  type: UserActionTYpes.SET_CURRENT_USER,
  payload: user
});
