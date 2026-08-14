import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

    return (
        <div className="admin-page">

            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage your online examination system</p>
            </div>

            <div className="admin-cards">

                <div className="admin-card">
                    <h2>➕ Add Question</h2>
                    <p>Add a new question to the exam.</p>
                    <Link to="/add-question">
                        Add Question
                    </Link>
                </div>

                <div className="admin-card">
                    <h2>📋 View Questions</h2>
                    <p>View, update and delete questions.</p>
                    <Link to="/view-question">
                        View Questions
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;