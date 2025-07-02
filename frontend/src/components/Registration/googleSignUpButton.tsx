// components/Registration/GoogleSignUpButton.tsx
import { GoogleLogin } from '@react-oauth/google';

interface GoogleSignUpButtonProps {
  onSuccess: (data: any) => void;
}

const GoogleSignUpButton: React.FC<GoogleSignUpButtonProps> = ({ onSuccess }) => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          onSuccess(credentialResponse);
        }
      }}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
};

export default GoogleSignUpButton;
