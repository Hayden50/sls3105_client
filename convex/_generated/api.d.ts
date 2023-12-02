/* eslint-disable */
/**
 * Generated API.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.12.2.
 * To regenerate, run `npx convex codegen`.
 * @module
 */

import type { ApiFromModules } from "convex/api";
import type * as addFriends from "../addFriends";
import type * as addRequest from "../addRequest";
import type * as addUser from "../addUser";
import type * as deleteFriend from "../deleteFriend";
import type * as deleteRequest from "../deleteRequest";
import type * as getUser from "../getUser";
import type * as listFriends from "../listFriends";
import type * as listRequests from "../listRequests";
import type * as listTransactions from "../listTransactions";
import type * as listUsers from "../listUsers";
import type * as searchFriends from "../searchFriends";
import type * as sendPayment from "../sendPayment";

/**
 * A type describing your app's public Convex API.
 *
 * This `API` type includes information about the arguments and return
 * types of your app's query and mutation functions.
 *
 * This type should be used with type-parameterized classes like
 * `ConvexReactClient` to create app-specific types.
 */
export type API = ApiFromModules<{
  addFriends: typeof addFriends;
  addRequest: typeof addRequest;
  addUser: typeof addUser;
  deleteFriend: typeof deleteFriend;
  deleteRequest: typeof deleteRequest;
  getUser: typeof getUser;
  listFriends: typeof listFriends;
  listRequests: typeof listRequests;
  listTransactions: typeof listTransactions;
  listUsers: typeof listUsers;
  searchFriends: typeof searchFriends;
  sendPayment: typeof sendPayment;
}>;
