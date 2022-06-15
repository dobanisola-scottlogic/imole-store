import {signInWithGooglePopup, createUserDocFromAuth} from '../../utils/firebase/firebase.utils';

const SignIn = () => {

    const processSignIn = async () => {
        const signInResponse = await signInWithGooglePopup();
        const saveResponse = await createUserDocFromAuth(signInResponse.user);
    }

    return (
        <div>
        <h1>Sign In</h1>
        <button onClick={processSignIn}>Sign in using google</button>
        </div>
    )
}

export default SignIn;