import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const GoogleLoginBtn = ({ onSuccess, onFailure }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user information using the token
        const userInfo = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

         // Navigate to the home page and pass userInfo as state
         localStorage.setItem('login',true)
         navigate('/home', {state: {userInfo: userInfo.data} });

      } catch (error) {
        console.error('Failed to fetch user information:', error);
      }
    },
    onFailure: (error) => {
      console.error('Google Login Failed:', error);
    },
  });

  return (
    <button style={{backgroundColor:'white', color:'red', boxShadow:'0.1rem 0.1rem 0.5rem grey'}} onClick={() => login()}>Google</button>
  );
};
