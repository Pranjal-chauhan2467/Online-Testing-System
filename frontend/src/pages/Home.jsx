import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="home">

            <div className="hero">

                <h1>Online Examination System</h1>

                <p>
                    Test your knowledge, complete exams,
                    and check your results online.
                </p>

                <div className="home-buttons">

                    <Link to="/exam">Start Exam</Link>
                    <Link to="/result">View Results</Link>
                </div>

            </div>


            <div className="features">

                <div className="feature">
                    <h2>📝 Online Exams</h2>
                    <p>
                        Take exams easily from anywhere.
                    </p>
                </div>

                <div className="feature">
                    <h2>📊 Instant Results</h2>
                    <p>
                        See your score after submitting the exam.
                    </p>
                </div>

                <div className="feature">
                    <h2>🔒 Secure Login</h2>
                    <p>
                        Your account and exam results are protected.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Home;