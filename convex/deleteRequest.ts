import { mutation } from "./_generated/server";

/* 
This will remove a monetary request from one user to another. This will be called
for both an accepted and denied request, but will be handled differently in this function.
*/
export default mutation(async ({ db }, { user_username, friend_username, request_id, accepted }) => {
    
    user_username = user_username.toLowerCase();
    friend_username = friend_username.toLowerCase();

    const request = await db.query("requests")
    .filter(q => q.eq(q.field("id"), request_id))
    .first();

    if (!request) {
        return false;
    }

    if (!accepted) {
        db.delete(request._id);
        return true;
    }

    // TODO: Check that the user has the balance needed to pay request
    // TODO: Reduce the balance of the user here based on amount
    db.delete(request._id);
    return true;
});