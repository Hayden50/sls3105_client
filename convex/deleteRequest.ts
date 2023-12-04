import { mutation } from "./_generated/server";

/* 
This will remove a monetary request from one user to another. This will be called
for both an accepted and denied request, but will be handled differently in this function.
*/
export default mutation(async ({ db }, { user_username, friend_username, amount }) => {
    
    user_username = user_username.toLowerCase();
    friend_username = friend_username.toLowerCase();

    const request = await db.query("requests")
    .filter(q => q.eq(q.field("friend_username"), friend_username))
    .filter(q => q.eq(q.field("user_username"), user_username))
    .filter(q => q.eq(q.field("amount"), amount))
    .first();

    if (!request) {
        return false;
    }

    db.delete(request._id);
    return true;
});