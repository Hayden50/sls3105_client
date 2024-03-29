import { mutation } from "./_generated/server";

// This will add a monetary request from one user to another
export default mutation(async ({ db }, { user_username, friend_username, amount }) => {
    
    user_username = user_username.toLowerCase();
    friend_username = friend_username.toLowerCase();

    const friend = await db.query("users")
                            .filter(q => q.eq(q.field("username"), friend_username))
                            .first();

    if (friend && amount > 0) {
        await db.insert("requests", {user_username, friend_username, amount});
        return amount;
    }

    return -1;
});