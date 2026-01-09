import { Router } from "express";
import QuestionController from "../controllers/QuestionController.js";
import QuizzController from "../controllers/QuizzController.js";

const router = Router();
//quizz routes
router.post("/quizzes", QuizzController.createQuizz);
router.get("/quizzes", QuizzController.getAllQuizzes);
router.get("/quizzes/:id", QuizzController.getQuizz);
router.delete("/quizzes/:id", QuizzController.deleteQuizz);

//question routes
router.post("/questions", QuestionController.createQuestion);
router.get("/questions/quiz/:quiz_id", QuestionController.getQuestionsByQuiz);
router.delete("/questions/:id", QuestionController.deleteQuestion);

export default router;
