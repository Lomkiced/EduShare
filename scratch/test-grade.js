const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const attempt = await prisma.assessmentAttempt.findFirst({
    orderBy: { startedAt: "desc" },
    include: { answers: true, assessment: { include: { questions: { include: { choices: true, matchPairs: true } } } } },
  });

  if (!attempt) {
    console.log("No attempt found");
    return;
  }

  console.log("Attempt ID:", attempt.id);
  console.log("Status:", attempt.status);
  console.log("Score:", attempt.score);
  console.log("Answers:", attempt.answers.map(a => ({
    questionId: a.questionId,
    selected: a.selectedChoiceIds,
    match: a.matchAnswers,
    text: a.textAnswer,
    isCorrect: a.isCorrect
  })));

  for (const question of attempt.assessment.questions) {
    console.log("\nQuestion:", question.questionText, "(Type:", question.type, ")");
    console.log("Choices:", question.choices.map(c => ({ id: c.id, text: c.choiceText, isCorrect: c.isCorrect })));
    
    const answer = attempt.answers.find(a => a.questionId === question.id);
    if (answer) {
      console.log("Student answered:", answer.selectedChoiceIds);
      let isCorrect = false;
      if (question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_OR_FALSE") {
        const correctChoice = question.choices.find(c => c.isCorrect);
        isCorrect = answer.selectedChoiceIds[0] === correctChoice?.id;
        console.log("Correct choice ID:", correctChoice?.id);
      }
      console.log("Calculated isCorrect:", isCorrect);
    } else {
      console.log("No answer for this question.");
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
