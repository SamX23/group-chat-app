import { auth, providerPublic } from "../../firebase";
import { actionTypes } from "../../store/reducer";
import { useStateValue } from "../../store/StateProvider";
import {
  LoginButton,
  LoginContainer,
  LoginText,
  LoginImages,
  LoginForm,
} from "./style";

export default function Login() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(providerPublic)
      .then((authUser) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <LoginContainer container spacing={2}>
      <LoginImages item xs={6} />
      <LoginForm
        container
        item
        xs={6}
        justify="center"
        alignContent="space-around"
        direction="column"
      >
        <LoginText variant="h2">WELCOME</LoginText>
        <LoginText variant="body1">Sign in to join group room app</LoginText>
        <LoginButton onClick={signIn} />
      </LoginForm>
    </LoginContainer>
  );
}
