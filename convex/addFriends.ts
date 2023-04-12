import { mutation } from "./_generated/server";

export default mutation(async ({ db }, { user_id, friend_id }) => {
  await db.insert("friends", {user_id, friend_id});
  return "ok";
});
