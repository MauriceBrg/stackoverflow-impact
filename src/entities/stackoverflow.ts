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

    questionId: number
    questionScore: number
    questionLink: string
    questionTitle: string
}