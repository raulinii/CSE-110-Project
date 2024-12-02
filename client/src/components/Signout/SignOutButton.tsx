import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignOutButton: React.FC = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
      navigate("/"); 
      // Optionally redirect or show a success message
    } catch (error) {
      console.error("An error occurred during sign-out:", error);
    }
  };
    return(
      <button onClick={handleSignOut} style={buttonStyle}>
      Sign Out
      </button>
    );
}

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default SignOutButton;
