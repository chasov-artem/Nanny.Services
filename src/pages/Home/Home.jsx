import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <h1 className="home-title">Nanny Services</h1>
        <p className="home-slogan">Find the perfect caregiver for your family</p>
        <Link to="/nannies" className="home-button">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;

