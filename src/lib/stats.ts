import { StackOverflowAnswerStatistics, StackOverflowAnswerSummary } from "../entities/stackoverflow";

export function computeAnswerStatistics(summaries: StackOverflowAnswerSummary[]): StackOverflowAnswerStatistics {

    // TODO: Compute stats

    const answerScores = summaries.map((summary) => { return summary.answerScore })

    return {
        averageScore: answerScores.reduce((a, b) => a + b, 0) / answerScores.length || 0,
        maxScore: Math.max(...answerScores),
        minScore: Math.min(...answerScores),
        totalViews: NaN,
        totalScore: answerScores.reduce((previous, current) => { return previous + current }),
        numberOfAnswers: summaries.length
    }
}