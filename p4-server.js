const { getQuestions, getAnswers, getQuestionsAnswers,
     getQuestion, getAnswer, getQuestionAnswer, 
     addQuestionAnswer
    } = require("./p4-module");

let fastify = require("fastify")();
let app = fastify;
app.get("/cit/question", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "application/json")
    .send({error:"", statusCode:200, questions:getQuestions()});
});

app.get("/cit/answer", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "application/json")
    .send({error:"", statusCode:200, answers: getAnswers()});
});

app.get("/cit/questionanswer", (request, reply) => {
    reply
    .code(200)
    .header("Content-Type", "application/json")
    .send({error:"", statusCode:200, questions_answers: getQuestionsAnswers()});
});

app.get("/cit/question/:number", (request, reply) => {
    let no = request.url.substring(14);
    let question_object = getQuestion(parseInt(no));
    let error_code = question_object.error==""? 200:404;
    reply
    .code(error_code)
    .header("Content-Type", "application/json")
    .send({error:question_object.error, statusCode:error_code, question:question_object.question, number:question_object.number});
});

app.get("/cit/answer/:number", (request, reply) => {
    let no = request.url.substring(12);
    let answer_object = getAnswer(parseInt(no));
    let error_code = answer_object.error==""? 200:404;
    reply
    .code(error_code)
    .header("Content-Type", "application/json")
    .send({error:answer_object.error, statusCode:error_code, answer:answer_object.answer, number:answer_object.number});
});

app.get("/cit/questionanswer/:number", (request, reply) => {
    let no = request.url.substring(20);
    let questionanswer_object = getQuestionAnswer(parseInt(no));
    let error_code = questionanswer_object.error==""? 200:404;
    reply
    .code(error_code)
    .header("Content-Type", "application/json")
    .send({error:questionanswer_object.error, statusCode:error_code, 
        question:questionanswer_object.question, 
            answer:questionanswer_object.answer, number:questionanswer_object.number});
});

app.post("/cit/question", (request, reply) => {
    let response = addQuestionAnswer(request.body)
    reply
    .code(response.number>=1? 201:404)
    .header("Content-Type", "application/json")
    .send({error:response.error, statusCode:response.number>=1? 201:404, number:response.number});
});

app.get("*", (request, reply) => {
    reply
    .code(404)
    .header("Content-Type", "application/json")
    .send({error: "Route not found",
    statusCode: 404})
});

   /*
        reply
            .code(a number) // status code
            .header("Content-Type", a header type)
            .send( a function call that returns something, data, html, text)
    */

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
app.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
})