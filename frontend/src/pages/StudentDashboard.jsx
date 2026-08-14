import { Link } from "react-router-dom";
import "./StudentDashboard.css";
function StudentDashboard(){
    return (
        <div className="learner-page">

            <h1>Learner Dashboard</h1>

            <p>Welcome to the Online Examination System</p>

            <div className="learner-cards">

                <div className="learner-card">

                    <h2>Start Exam</h2>

                    <p>Take your online examination.</p>

                    <Link to="/exam">
                        Start Exam
                    </Link>

                </div>

                <div className="learner-card">

                    <h2>My Results</h2>

                    <p>View your previous exam results.</p>

                    <Link to="/result">
                        View Results
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default StudentDashboard;
