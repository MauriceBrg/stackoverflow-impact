export interface StackOverflowUserInfo {
    userId: number
    displayName: string
    imageUrl: string
    profileUrl: string
    reputationChangeYear: number
    reputation: number
}

export interface StackOverflowAnswerSummary {
    answerId: number
    answerScore: number
    answerLink: string
    isAccepted: boolean

    excerpt: string

    questionId: number
    questionScore: number
    questionLink: string
    questionTitle: string
    questionViews?: number
}

export interface StackOverflowAnswerStatistics {
    numberOfAnswers: number
    minScore: number
    maxScore: number
    totalScore: number
    averageScore: number
    totalViews: number
}