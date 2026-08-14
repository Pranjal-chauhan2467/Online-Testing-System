import {useState,useEffect} from 'react';
import axios from 'axios';
import "./Exam.css";
const API_URL = import.meta.env.VITE_API_URL;
function Exam(){
    const [questions,setQuestions]=useState([])
    // Stores answers selected by the user
    const [answers, setAnswers] = useState([]);
    const [marks,setMarks]=useState("");
    const [error,setError]=useState("");
    useEffect(()=>{
       startExam();
    },[])

    const startExam=async ()=>{
        try{
           const response= await axios.get(`${API_URL}/online/start-exam/`)
            setQuestions(response.data.questions)
        }
        catch(error){
            setError("failed to start exam")
        }
    };

    // Runs when user selects an option 
    const selectAnswer = (questionId, option) => {
       // Remove old answer of this question
       const newAnswers = answers.filter( (answer) => answer.question_id !== questionId );
       // Add the newly selected answer 
       newAnswers.push({ question_id: questionId, selected_option: option }); 
       // Update answers state 
       setAnswers(newAnswers); 
      };
      // Submit exam 
      const submitExam=async()=> { 
       for (let question of questions) {
    const answered = answers.some(
        (answer) => answer.question_id === question.id
    );
    if (!answered) {
        setError("Please answer all questions");
        return;
    }
}
         try{ 
           const response = await axios.post( `${API_URL}/online/submit-exam/`, { answers: answers }
           );
          // Display score 
          setMarks( "Your Score: " + response.data.score + "/" + response.data.total_questions ); 
        } 
          catch (error) 
            {
              alert("Failed to submit exam");
             }
            };
    return(
        <div className='exam-page'>
            <h1>Exam Page</h1>
            {questions.map((que,index)=>(
              <div className='question-box' key={que.id}>
               <h3>
                 {index + 1}.{que.question}
                </h3>
                 <label>
                 <input type="radio" 
                  name={que.id} 
                  onChange={() => { selectAnswer(que.id, 1); }}
                  required/>
                 {que.option1}
                </label>
                  <label>
                 <input type="radio" name={que.id} 
                  onChange={() => { selectAnswer(que.id, 2); }}
                  required
                  />
                 {que.option2}
               </label>
                <label>
                 <input type="radio" name={que.id} 
                 onChange={()=>{ selectAnswer(que.id, 3); }}
                  required/>
                 {que.option3}
                </label>
                <label>
                 <input type="radio" name={que.id} 
                  onChange={() => { selectAnswer(que.id, 4); }}
                  required/>
                 {que.option4}
               </label>
               </div>
            ))}
            {marks?(<p className='success-message'>{marks}</p>):
             (<p className='error-message'>{error}</p>)
              }
            <button onClick={submitExam} className="submit-button">
              Submit Exam
              </button>
        </div>
    )
}
export default Exam;