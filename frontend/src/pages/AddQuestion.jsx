import axios from 'axios';
import {useState} from 'react';
import "./AddQuestion.css";
const API_URL = import.meta.env.VITE_API_URL;
function AddQuestion(){
    const [formdata,setFormData]=useState({
       question:"",
       option1:"",
       option2:"",
       option3:"",
       option4:"",
       correct_option:"" 
    });
    const [message, setMessage] = useState("");
    const[error,setError]=useState("");
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formdata,
            [name]:value})
    }
     const addQuestion = async (event) => {

        event.preventDefault();

        try {

            const response = await axios.post(
                `${API_URL}/online/add-question/`,formdata
            );

            setMessage(response.data.message);

        } catch (error) {
            setError(error.response.data.message);
        }
    setFormData(
      {question:"",
       option1:"",
       option2:"",
       option3:"",
       option4:"",
       correct_option:""})
    };

    return (
         <div className="add-question-page">
              {error?(<p  className="error-message">{error}</p>):(<p  className="success-message">{message}</p>)}

            <div className="add-question-box">


            <h2>Add Question</h2>

            <form onSubmit={addQuestion}>
              
              <label>Question</label>

                <textarea
                    name="question"
                    placeholder="Question"
                    value={formdata.question}
                    onChange={handleChange}
                />
             <label>Option 1</label>
                <input
                    name="option1"
                    placeholder="Option 1"
                    value={formdata.option1}
                    onChange={handleChange}
                    required
                />
            <label>Option 2</label>
                <input
                    name="option2"
                    placeholder="Option 2"
                    value={formdata.option2}
                    onChange={handleChange}
                    required
                />
            <label>Option 3</label>
                <input
                    name="option3"
                    placeholder="Option 3"
                    value={formdata.option3}
                    onChange={handleChange}
                    required
                />
            <label>Option 4</label>
                <input
                    name="option4"
                    placeholder="Option 4"
                    value={formdata.option4}
                    onChange={handleChange}
                    required
                />
            <label>Correct Option</label>
                <input
                    name="correct_option"
                    placeholder="Correct option"
                    value={formdata.correct_option}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Question
                </button>

            </form>
         </div>
        </div>
    );
}

export default AddQuestion;
   