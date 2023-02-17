import { useRouter } from "next/router";

function Error() {
  const router = useRouter();
  const error = router.query.error;

  return <>{error && <SignInError error={error} />}</>;
}

export default Error;

//define error message
const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: "Sign in failed. Check the details you provided are correct.",
  AccessDenied:"You do not have permission to access this page.",
  default: "Unable to sign in.",
};

const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <div>
      <h2>This is Error Page</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

Error.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
