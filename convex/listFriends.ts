import { query } from "./_generated/server";

export default query(async ({ db }, {user_username}) => {

    if (!user_username) {
      return [];
    }
  
    return await db
    .query("friends")
    .filter(q => q.eq(q.field("user_username"), user_username))
    .collect();
  });
