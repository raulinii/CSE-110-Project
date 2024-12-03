import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './SignOutButton.css';

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
      navigate("/"); 
    } catch (error) {
      console.error("An error occurred during sign-out:", error);
    }
  };

  return (
    <button className="logout-button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOutButton;