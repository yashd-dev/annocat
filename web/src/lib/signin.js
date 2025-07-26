import { authClient } from "@/lib/auth-client"; //import the auth client

await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
  errorCallbackURL: "/error",
  disableRedirect: true,
});
