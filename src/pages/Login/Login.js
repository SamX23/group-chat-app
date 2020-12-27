import { auth, providerPublic } from "../../firebase";
import { actionTypes } from "../../store/reducer";
import { useStateValue } from "../../store/StateProvider";
import { LoginButton, LoginContainer, LoginText } from "./style";

export default function Login() {
  // Optimized soon
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
    <LoginContainer>
      <LoginText variant="h3">Group Chat App</LoginText>
      <LoginButton onClick={signIn} />
    </LoginContainer>
  );
}
