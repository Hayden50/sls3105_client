import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { user_username, friend_username}) => {

  user_username = user_username.toLowerCase();
  friend_username = friend_username.toLowerCase();
  
  const friend = await db.query("users")
                            .filter(q => q.eq(q.field("username"), friend_username))
                            .first();
  if (!friend) {
    return null;
  }
  
  const check_friend = await db.query("friends")
                        .filter(q => q.and(q.eq(q.field("friend_username"), friend_username), 
                                          q.eq(q.field("user_username"), user_username)))
                        .first();

  if (check_friend) {
    return friend_username;
  }
  await db.insert("friends", {user_username, friend_username});
  return friend;
});
