import { mutation } from "./_generated/server";

/* 
This will remove a monetary request from one user to another. This will be called
for both an accepted and denied request, but will be handled differently in this function.
*/
export default mutation(async ({ db }, { user_username, friend_username}) => {
    
    user_username = user_username.toLowerCase();
    friend_username = friend_username.toLowerCase();

});