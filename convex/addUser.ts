import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { user_id, friend_id }) => {

    const friend = await db.query("users")
        .filter(q => q.and(q.eq(q.field("user_id"), user_id), q.eq(q.field("friend_id"), friend_id)))
        .first();
    if (!friend) {
        await db.insert("friends", { user_id, friend_id });
        return friend;
    }
    return friend;
});
