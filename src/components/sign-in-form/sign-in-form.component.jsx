import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';

import { ButtonContainer, SignInContainer, SignInTitle } from './sign-in-form.styles.jsx';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     await signInUserWithEmailAndPassword(
        email,
        password
      );
    
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('Cannot sign in, email and/or password incorrect');
      } else {
        console.log('user signin encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInGoogleUser = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <SignInTitle>Already have an account?</SignInTitle>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
    
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <ButtonContainer>
        <Button type='submit'>Sign In</Button>
        <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInGoogleUser}>
        Google Sign In
        </Button>
      </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
