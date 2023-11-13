import { query } from "./_generated/server";

export default query(async ({ db }, {username}) => {

    if (!username) {
      return null;
    }
  
    return await db
    .query("users")
    .filter(q => q.eq(q.field("username"), username))
    .first();
  });