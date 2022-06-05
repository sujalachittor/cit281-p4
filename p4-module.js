module.exports = {
getQuestions,
getAnswers,
getQuestionsAnswers,
getQuestion,
getAnswer,
getQuestionAnswer,
addQuestionAnswer,
//getUnmatched,
  };

let data = require("./p4-data.js").data;
function getQuestions(){
    let results = [];
    for (s of data)  
        results.push(s.question) 
    return results
}
//console.log(getQuestions());

function getAnswers(){
    let results = []; 
    for (s of data)
        results.push(s.answer)
    return results
}
//console.log(getAnswers());

function getQuestionsAnswers(){
    let results = [];
    for (s of data)
        results.push({"question": s.question, "answer": s.answer})
    return results
}

//check to expand object
//console.log(getQuestionsAnswers());

function getQuestion(no) {
    let error = "";
    let question = "";
    if (!Number.isInteger(no))
        error= 'Question number must be an integer';
    else if (no <= 0)
        error= 'Question number must be >= 1'; 
    else if (no > data.length)
        error= 'Question number must be less than the number of questions (3)';

    const qa = data.find(c => c.question == "Q" + parseInt(no));
    if (qa == undefined) {no = ""; question = ""}
    else question = qa.question;
    return ({error: error, question: question, number: no });
}

function getAnswer(no) {
    let error = "";
    let answer = "";
    if (!Number.isInteger(no))
        error= 'Answer number must be an integer';
    else if (no <= 0)
        error= 'Answer number must be >= 1'; 
    else if (no > data.length)
        error= 'Answer number must be less than the number of questions (3)';

    const qa = data.find(c => c.answer == "A" + parseInt(no));
    if (qa == undefined) {no = ""; answer = ""}
    else answer = qa.answer;
    return ({error: error, answer: answer, number: no });
}

function getQuestionAnswer(no) {
    let error = "";
    let question = "";
    let answer = "";
    if (!Number.isInteger(no))
        error= 'Answer number must be an integer';
    else if (no <= 0)
        error= 'Answer number must be >= 1'; 
    else if (no > data.length)
        error= 'Answer number must be less than the number of questions (3)';

    const qa = data.find(c => (c.question == "Q" + parseInt(no)) && (c.answer == "A" + parseInt(no)))
    if (qa == undefined) {no = ""; answer = ""}
    else {answer = qa.answer; question = qa.question}
    return ({error: error, question: question, number: no, answer: answer});

    function getUnmatched() {
        let error= "Route not found";
        let statusCode = 404;


    }
}

function addQuestionAnswer(obj) {
    let error = "";
    let message = "";
    let number = -1;
    if (obj == undefined || obj.question == undefined)
        error= 'Object question property required';
    else if (obj.answer == undefined)
        error= 'Object answer property required'; 
    else {
        let new_QA = obj;
        data.push(new_QA);
        number = data.length;
        message = 'Question added';
    }
    return ({error: error, message: message, number: number});
  };
/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = false;
  const testAdd = false;      // Extra credit
  const testUpdate = false;   // Extra credit
  const testDelete = false;   // Extra credit

  // getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
  }
  // addQuestionAnswer()
if (testAdd) {
    testing(
      "addQuestionAnswer",
      { d: "()", f: addQuestionAnswer() },
      { d: "({})", f: addQuestionAnswer({}) },
      { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
      { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
      {
        d: '(question: "Q4", answer: "A4")',
        f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
      }
    );
  }
