// type User = {
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
//   // role?: string | undefined | null;
//   // accessToken?: string | undefined | null;
// };

import * as t from "io-ts";

export const EmailRegExp = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

interface EmailBrand {
  readonly Email: unique symbol;
}

export const Email = t.brand(
  t.string,
  (s: string): s is t.Branded<string, EmailBrand> => EmailRegExp.test(s),
  "Email"
);

export const User = t.type({
  id: t.string,
  email: Email,
  password: t.string,
  username: t.string,
  image: t.union([t.string, t.undefined, t.null]),
  jwtToken: t.union([t.string, t.undefined, t.null]),
});

export type User = t.TypeOf<typeof User>;
