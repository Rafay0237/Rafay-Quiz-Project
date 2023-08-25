import './App.css';
import React, { useState,useEffect } from 'react'
import que from "./Data/data.json"



const getOptionClass=(q,opt,attempts,timer)=>{
   
    let qId=q.id;
    let ans=q.ans;
    let found=attempts.find(i=>i.id===qId && i.opt===opt);
    let checkAns=ans===opt

    if((found && checkAns) ||(timer===0 && ans===opt)){
      return("Option-right")
    }
    else if(found &&!checkAns){
      return("Option-wrong")
    }
    else{
      return("Option")
    }

}
const getBtnClass=(q,attempts)=>{
  let qId=q.id;
  let found=attempts.find(i=>i.id===qId );

  if(found ){
    return("next-btn")
  }
  else{
    return("next-btn-hide")
  }
}
const getTimerClass=(timer)=>{
  if(timer<6 && timer!=0)
  return'timer-low';
  else{
    return'timer-id';
  }

}
const getResetNavAnsId=(ans)=>{
  if(ans)
  {
    return "Reset-nav-answers"
  }else{
    return "Reset-nav-answers-hover"
    }
}
const getResetNavScoreId=(ans)=>{
  if(ans)
  {
    return "Reset-nav-score-hover"
  }else{
    return "Reset-nav-score"
  }
}
const getAttemptClass=(que,ans)=>{
  let found=que.find(q=>q.ans===ans);
  if(found)
  {
    return"attempt-right"
  }else{
    return"attempt-wrong"
  }
}
 //              App               //
function App() {

    const select=(q,opt,verify,score,timer)=>{
      if(!verify || timer===0)
      return
      let object={id:q.id,opt:opt}
      setattempts([...attempts,object])
      setNoAttempt(false)
      let found=q.ans===opt
      if(found)
      setScore(score+10);
      setTimer(0);
    }
      const useRunTimer=(timer,obj)=>{
        useEffect(() => {
          let timeout;
          if (timer >0) {
            timeout = setInterval(() => {
              setTimer(timer--);
            },500);
          }
          else{
            if(start){document.getElementById('btn').className='next-btn'}
          }
          return () => clearTimeout(timeout);
        }, [timer]);
        
      }
      const nextBtn=(qNo)=>{
        console.log(qNo)
        if(qNo===9)
        {
          setShowResult(true)
          return
        }
        qNo++;
        setqNo(qNo) 
        setI(que[qNo]);
        setNoAttempt(true);
        setTimer(15);
      }
      const ResetQuiz=()=>{
        setqNo(0);
        setI(que[0]);
        setattempts([]);
        setScore(0);
        setTimer(15);
        setShowResult(false);
        setNoAttempt(true);
      }
      //Quiz Run Time States
      let [qNo,setqNo]=useState(0);
      let [attempts,setattempts]= useState([]);
      let [i,setI]= useState(que[qNo]);
      let [NoAttempt,setNoAttempt]=useState(true);
      let [score,setScore]=useState(0);
      let [timer,setTimer]=useState(0);
      let [ShowResult,setShowResult]=useState(false);
      
       useRunTimer(timer,i)
      // Reset Quiz states
      let[answers,setAnswers]=useState(false);
      const checkAnswers=(check)=>{
        check?setAnswers(false):setAnswers(true)
      }
      //Start Page States
      let[start,setStart]=useState(false);
      const startQuiz=(start)=>{
        setStart(true);
        setTimer(15)
      }

  return (
   
    <div className="App">
     {    
        <>
        <div className='box'>
          {!start?<>
            <div id="finish"><h3>{'Guess The Capital Quiz !'}</h3><br></br><p>10 Questions</p><br></br> 
             <button  id="Start"onClick={()=>(startQuiz(start))}>{'Start Quiz'}</button></div>
          </>
            :(<>
        {ShowResult?<>
         <div className='box-h'>
        <div className='Reset-nav'>
          <div id={getResetNavAnsId(answers)} onClick={()=>checkAnswers(true)}>Score</div>
          <div id={getResetNavScoreId(answers)} onClick={()=>checkAnswers(false)}>Answers</div>
        </div>
        </div>
        {!answers?<>
         <div id="finish"><h3>{'Quiz Over !'}</h3><br></br><p>{'Score : ' }{score/10}{'/'}{10}</p><br></br> 
             <button id="play-again"onClick={()=>ResetQuiz()}>{'Play Again'}</button></div>
             </>:(
              <div className='answers-b'>
              <h3 id='review-h'>Quiz Rewiew</h3>
              <div className='review-b'>
              <div className='ans-col'>
              {
                que.map(q=>{
                  return(<>
                    <div id='statement'>{q.id}{'. '}{q.statement}</div>
                    <div id='ans'>Correct Answer : {q.ans}</div>
                    </>
                  )
                })
              }
              </div>
              <div className='attempt-col'>
              {
                attempts.map(q=>{
                  return(
                    <div id={getAttemptClass(que,q.opt)}>Your Answer : {q.opt}</div>
                  )
                })
              }
              </div>
              </div>
              </div>
             )}
             </>:(
            <>
        <div className='box-h'>
        <h3 id='web-name'>{'Guess the Capital City ! Quiz'}</h3>
        <div className='h-right-elems'>
        <div>{'Timer :'}</div><div id={getTimerClass(timer)}>{timer}</div>
        <div id='que-no'>{i.id}{' of 10'}</div>
        <div id='score'>{'Score : '}{score}</div>
        </div>
        </div>
          <div className="box-b" key={i.id}>
            <div className='Q-box'>
          <h3>{i.statement}</h3>
          </div>
        <div className='List'>
         <div className='opt-row'>
           <div className= {getOptionClass(i,i.options[0],attempts,timer)} key={i.options[0]} onClick={()=>select(i,i.options[0],NoAttempt,score,timer)}> {i.options[0]} </div>
           <div className= {getOptionClass(i,i.options[1],attempts,timer)} key={i.options[1]} onClick={()=>select(i,i.options[1],NoAttempt,score,timer)}> {i.options[1]} </div>
         </div> <div className='opt-row'>
           <div className= {getOptionClass(i,i.options[2],attempts,timer)} key={i.options[2]} onClick={()=>select(i,i.options[2],NoAttempt,score,timer)}> {i.options[2]} </div>
           <div className= {getOptionClass(i,i.options[3],attempts,timer)} key={i.options[3]} onClick={()=>select(i,i.options[3],NoAttempt,score,timer)}> {i.options[3]} </div>
         </div>
        </div>
        <div id='btn' className={getBtnClass(i,attempts)}onClick={()=>nextBtn(qNo)}>{'Next ->'}</div>
        </div>
        </>)}
        </> )}
         </div>    {/* Add here*/}

     </>
     }

    </div>
  );
}

export default App;
