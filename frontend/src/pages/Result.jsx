import {useState,useEffect} from "react";
import axios from "axios";
import "./Result.css";

function Result(){
    const [results,setResults]=useState([])

    useEffect(()=>{
        getResults();
    },[]);
    const getResults=async()=>{
        try{
         const response= await axios.get("http://localhost:8000/online/my-results/");
          setResults(response.data.results);
    }
    catch(error){
          alert("result fetching failed")
    }
    };
    return(
        <div className="result-page">
            <h1>My Results</h1> 
    
                
            {results.length===0 ?(<h1>NO result found</h1>):
            (<table className="results-table">
                <tr>
                    <td>Result id</td>
                    <td>Score</td>
                    <td>Total Question</td>
                </tr>
              {results.map((result)=>(
                <tr>
                    <td>{result.id}</td>
                    <td>{result.score}</td>
                    <td>{result.total_questions}</td>
                </tr>
              ))}
              </table>
            )}
        </div>
    )
}
export default Result;