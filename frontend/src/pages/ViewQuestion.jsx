
import "./ViewQuestion.css"
import { useEffect, useState } from "react";
import axios from "axios";
import "./ViewQuestion.css";

function ViewQuestion() {

    const [question, setQuestion] = useState([]);
    const [editquestion, setEditQuestion] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        getQuestions();
    }, []);

    const getQuestions = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8000/online/view-question/",
                {
                    withCredentials: true
                }
            );

            setQuestion(response.data.questions);

        } catch (error) {

            setMessage("Question fetching failed");

        }
    };

    const handleEdit = (question) => {
        setEditQuestion(question);
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditQuestion({
            ...editquestion,
            [name]: value
        });
    };

    const handleUpdate = async () => {

        try {

            await axios.post(
                `http://localhost:8000/online/update-question/${editquestion.id}/`,
                editquestion,
                {
                    withCredentials: true
                }
            );

            alert("Question updated successfully");

            setEditQuestion(null);

            getQuestions();

        } catch (error) {

            alert("Question update failed");

        }
    };

    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `http://localhost:8000/online/delete-question/${id}/`,
                {
                    withCredentials: true
                }
            );

            setMessage("Question deleted successfully");

            getQuestions();

        } catch (error) {

            setMessage("Question deletion failed");

        }
    };

    return (

        <div className="question-page">
            {message&&(<p>{message}</p>)}

            {!editquestion && (
                <>

                    <h1>View Questions</h1>

                    <table className="question-table">

                        <thead>

                            <tr>
                                <th>Question ID</th>
                                <th>Question</th>
                                <th>Option 1</th>
                                <th>Option 2</th>
                                <th>Option 3</th>
                                <th>Option 4</th>
                                <th>Correct Option</th>
                                <th>Edit / Delete</th>
                            </tr>

                        </thead>

                        <tbody>

                            {question.map((que) => (

                                <tr key={que.id}>

                                    <td>{que.id}</td>

                                    <td>{que.question}</td>

                                    <td>{que.option1}</td>

                                    <td>{que.option2}</td>

                                    <td>{que.option3}</td>

                                    <td>{que.option4}</td>

                                    <td>{que.correct_option}</td>

                                    <td>

                                        <button
                                            className="edit-button"
                                            onClick={() => handleEdit(que)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(que.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </>
            )}

            {editquestion && (

                <div className="edit-box">

                    <h2>Edit Question</h2>

                    <input
                        className="edit-input"
                        name="question"
                        value={editquestion.question}
                        onChange={handleChange}
                    />

                    <input
                        className="edit-input"
                        name="option1"
                        value={editquestion.option1}
                        onChange={handleChange}
                    />

                    <input
                        className="edit-input"
                        name="option2"
                        value={editquestion.option2}
                        onChange={handleChange}
                    />

                    <input
                        className="edit-input"
                        name="option3"
                        value={editquestion.option3}
                        onChange={handleChange}
                    />

                    <input
                        className="edit-input"
                        name="option4"
                        value={editquestion.option4}
                        onChange={handleChange}
                    />

                    <input
                        className="edit-input"
                        name="correct_option"
                        value={editquestion.correct_option}
                        onChange={handleChange}
                    />

                    <button
                        className="update-button"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                </div>

            )}

        </div>
    );
}

export default ViewQuestion;