import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GamificationService,
  type QuizQuestion,
  type QuizResult,
} from "@/lib/learning-service";
import { CheckCircle, XCircle, Loader2, SkipForward } from "lucide-react";

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResult[]) => void;
  moduleName: string;
}

export function QuizGame({ questions, onComplete, moduleName }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = results.length;
  const totalCount = questions.length;
  const progressPercentage = (answeredCount / totalCount) * 100;
  const correctCount = results.filter((r) => r.correct).length;

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const points = isCorrect
      ? GamificationService.calculatePoints(currentQuestion.difficulty, true)
      : 0;

    const newResult: QuizResult = {
      questionId: currentQuestion.id,
      answered: true,
      correct: isCorrect,
      userAnswer: selectedAnswer,
      points,
    };

    setResults([...results, newResult]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      onComplete(results);
    }
  };

  const handleSkipQuestion = () => {
    const newResult: QuizResult = {
      questionId: currentQuestion.id,
      answered: false,
      correct: false,
      points: 0,
    };
    setResults([...results, newResult]);
    handleNextQuestion();
  };

  if (quizComplete) {
    const totalPoints = results.reduce((sum, r) => sum + r.points, 0);
    const accuracy = Math.round((correctCount / totalCount) * 100);
    const earnedBadge = correctCount === totalCount;

    return (
      <div className="space-y-6 max-w-2xl mx-auto px-4 sm:px-0">
        {/* Results Header */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 text-center space-y-4">
          <div className="text-4xl sm:text-5xl">
            {accuracy >= 80 ? "🎉" : accuracy >= 60 ? "👏" : "💪"}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Quiz Complete!
          </h2>
          <p className="text-foreground/70">
            You completed the {moduleName} quiz
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white border border-primary/10 rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {correctCount}/{totalCount}
              </div>
              <div className="text-xs sm:text-sm text-foreground/60">
                Correct
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
                {totalPoints}
              </div>
              <div className="text-xs sm:text-sm text-foreground/60">
                Points
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-500 mb-2">
                {accuracy}%
              </div>
              <div className="text-xs sm:text-sm text-foreground/60">
                Accuracy
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="font-medium text-foreground">Performance</span>
              <span className="text-foreground/60">
                {accuracy >= 90 ? "Excellent!" : accuracy >= 70 ? "Good!" : "Keep practicing!"}
              </span>
            </div>
            <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>

          {/* Badge Earned */}
          {earnedBadge && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-semibold text-yellow-900">Perfect Score!</p>
              <p className="text-xs sm:text-sm text-yellow-800 mt-1">
                You got all questions correct
              </p>
            </div>
          )}

          {/* Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs sm:text-sm text-blue-900">
              {accuracy >= 80
                ? "🎯 Excellent work! Move on to the next lesson."
                : accuracy >= 60
                  ? "📚 Good effort! Review the material and try again."
                  : "💪 Keep practicing! You'll improve with more effort."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={() => window.location.reload()}
            className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white rounded-lg py-3 font-semibold"
          >
            Retake Quiz
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none border-primary/30 hover:bg-primary/5 rounded-lg py-3 font-semibold"
          >
            Next Lesson
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 sm:px-0">
      {/* Progress Header - Mobile Optimized */}
      <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="font-bold text-foreground text-base sm:text-lg truncate">
              Question {currentQuestionIndex + 1}/{totalCount}
            </h2>
            <p className="text-xs sm:text-sm text-foreground/60 mt-1">
              {moduleName} Quiz
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right">
              <div className="text-lg sm:text-xl font-bold text-primary">
                {correctCount}
              </div>
              <div className="text-xs text-foreground/60">Correct</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-foreground/60">
            {answeredCount} of {totalCount} questions answered
          </p>
        </div>
      </div>

      {/* Question Card - Mobile Optimized */}
      <div className="bg-white border border-primary/10 rounded-lg p-4 sm:p-6 space-y-6">
        {/* Difficulty Badge */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-base sm:text-lg leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 flex-shrink-0 ${
              currentQuestion.difficulty === "easy"
                ? "bg-green-100 text-green-800"
                : currentQuestion.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {currentQuestion.difficulty.charAt(0).toUpperCase() +
              currentQuestion.difficulty.slice(1)}
          </div>
        </div>

        {/* Options - Mobile Optimized */}
        <div className="space-y-2 sm:space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const isWrong =
              selectedAnswer === index && index !== currentQuestion.correctAnswer;

            let buttonClasses =
              "w-full p-4 sm:p-5 text-left border-2 rounded-lg transition-all text-sm sm:text-base font-medium ";

            if (showExplanation) {
              if (isCorrect) {
                buttonClasses +=
                  "bg-green-50 border-green-500 text-green-900 cursor-default";
              } else if (isWrong) {
                buttonClasses +=
                  "bg-red-50 border-red-500 text-red-900 cursor-default";
              } else {
                buttonClasses +=
                  "bg-gray-50 border-gray-300 text-foreground/60 cursor-default";
              }
            } else {
              buttonClasses += isSelected
                ? "bg-primary/10 border-primary text-foreground"
                : "bg-white border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 cursor-pointer";
            }

            return (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
                className={buttonClasses}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-1">{option}</span>
                  {showExplanation && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                  {showExplanation && isWrong && (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-blue-900">
              💡 Explanation
            </p>
            <p className="text-xs sm:text-sm text-blue-900">
              {currentQuestion.explanation}
            </p>
            {selectedAnswer === currentQuestion.correctAnswer && (
              <p className="text-xs sm:text-sm text-green-700 font-semibold">
                ✓ You earned{" "}
                {GamificationService.calculatePoints(
                  currentQuestion.difficulty,
                  true
                )}{" "}
                points!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons - Mobile Optimized */}
      {!showExplanation ? (
        <div className="flex gap-2 sm:gap-3">
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/30 text-white rounded-lg py-3 sm:py-4 font-semibold text-base"
          >
            Submit Answer
          </Button>
          <Button
            onClick={handleSkipQuestion}
            variant="outline"
            className="border-primary/30 hover:bg-primary/5 rounded-lg px-4 sm:px-6 py-3 sm:py-4 font-semibold text-base"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleNextQuestion}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg py-3 sm:py-4 font-semibold text-base"
        >
          {currentQuestionIndex < questions.length - 1
            ? "Next Question"
            : "See Results"}
        </Button>
      )}

      {/* Mobile Tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-amber-900">
          💡 <span className="font-semibold">Tip:</span> Tap an option to select it,
          then submit. Points depend on difficulty level.
        </p>
      </div>
    </div>
  );
}
