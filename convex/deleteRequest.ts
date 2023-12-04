import { mutation } from "./_generated/server";

/* 
This will remove a monetary request from one user to another. This will be called
for both an accepted and denied request, but will be handled differently in this function.
*/
export default mutation(async ({ db }, { request_id }) => {

    const request = await db.query("requests")
    .filter(q => q.eq(q.field("id"), request_id))
    .first();

    if (!request) {
        return false;
    }

    db.delete(request._id);
    return true;
});