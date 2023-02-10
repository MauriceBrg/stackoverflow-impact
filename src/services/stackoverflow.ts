import { StackOverflowAnswerSummary, StackOverflowUserInfo } from "../entities/stackoverflow";

const API_BASE_URL = "https://api.stackexchange.com/2.3/"
const SITE_NAME = "stackoverflow"

interface StackOverflowListResponse {
    items: { [key: string]: any }[]
    has_more: boolean
    quota_max: number
    quota_remaining: number
}

export async function getUserInfo(userId: number): Promise<StackOverflowUserInfo> {

    // return {
    //     userId: 6485881,
    //     displayName: "Maurice",
    //     imageUrl: "https://i.stack.imgur.com/KXGsc.jpg?s=256&g=1",
    //     profileUrl: "https://stackoverflow.com/users/6485881/maurice",
    //     reputation: 10567,
    //     reputationChangeYear: 614,
    // }


    const response = await fetch(`${API_BASE_URL}users/${userId}?site=${SITE_NAME}`)
    const apiResponse = await response.json() as StackOverflowListResponse

    const userItem = apiResponse.items[0]

    return {
        userId: userItem.user_id,
        displayName: userItem.display_name,
        imageUrl: userItem.profile_image,
        profileUrl: userItem.link,
        reputation: userItem.reputation,
        reputationChangeYear: userItem.reputation_change_year,
    }

}

async function getSearchPage(searchUrl: string, page: number): Promise<StackOverflowListResponse> {

    const url = `${searchUrl}&page=${page}`
    const response = await fetch(url)
    const data = await response.json()

    return data as StackOverflowListResponse
}

export async function getAwsAnswerSummaries(userId: number): Promise<StackOverflowAnswerSummary[]> {
    /**
     * Returns all answers for amazon-* and aws-* tags by the specific user in the last year.
     * (Up to 500)
     */

    // return [
    //     {
    //         answerId: 74346709,
    //         answerLink: "https://stackoverflow.com/a/74346709/",
    //         answerScore: 0,
    //         isAccepted: true,
    //         questionId: 74346013,
    //         questionLink: "https://stackoverflow.com/questions/74346013/",
    //         questionScore: 0,
    //         questionTitle: "How to order dynamic frame data?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 74086371,
    //         answerLink: "https://stackoverflow.com/a/74086371/",
    //         answerScore: 1,
    //         isAccepted: true,
    //         questionId: 74086155,
    //         questionLink: "https://stackoverflow.com/questions/74086155/",
    //         questionScore: 0,
    //         questionTitle: "How to tell when Lambdas complete processing of all messages in SQS",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72711849,
    //         answerLink: "https://stackoverflow.com/a/72711849/",
    //         answerScore: 3,
    //         isAccepted: false,
    //         questionId: 72710892,
    //         questionLink: "https://stackoverflow.com/questions/72710892/",
    //         questionScore: 0,
    //         questionTitle: "Where do I put initialisation code for lambda (only executed once on cold start)?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72560952,
    //         answerLink: "https://stackoverflow.com/a/72560952/",
    //         answerScore: 1,
    //         isAccepted: false,
    //         questionId: 72557982,
    //         questionLink: "https://stackoverflow.com/questions/72557982/",
    //         questionScore: 0,
    //         questionTitle: "AWS SecretManager Read and Write concurrency",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72414485,
    //         answerLink: "https://stackoverflow.com/a/72414485/",
    //         answerScore: 3,
    //         isAccepted: true,
    //         questionId: 72412078,
    //         questionLink: "https://stackoverflow.com/questions/72412078/",
    //         questionScore: 2,
    //         questionTitle: "How to upload a zip to S3 with CDK",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72413535,
    //         answerLink: "https://stackoverflow.com/a/72413535/",
    //         answerScore: 3,
    //         isAccepted: true,
    //         questionId: 72412795,
    //         questionLink: "https://stackoverflow.com/questions/72412795/",
    //         questionScore: 1,
    //         questionTitle: "Using SQS as EventSource for Lambda in private VPC - do I need SQS VPC Endpoints?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72292009,
    //         answerLink: "https://stackoverflow.com/a/72292009/",
    //         answerScore: 3,
    //         isAccepted: true,
    //         questionId: 72291892,
    //         questionLink: "https://stackoverflow.com/questions/72291892/",
    //         questionScore: 2,
    //         questionTitle: "How do I get the tasks running as part of an ECS service?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72225671,
    //         answerLink: "https://stackoverflow.com/a/72225671/",
    //         answerScore: 2,
    //         isAccepted: true,
    //         questionId: 72225406,
    //         questionLink: "https://stackoverflow.com/questions/72225406/",
    //         questionScore: 1,
    //         questionTitle: "How can an S3 event trigger a Lambda Function in a VPC?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 72025058,
    //         answerLink: "https://stackoverflow.com/a/72025058/",
    //         answerScore: 1,
    //         isAccepted: true,
    //         questionId: 72021590,
    //         questionLink: "https://stackoverflow.com/questions/72021590/",
    //         questionScore: 2,
    //         questionTitle: "Problems to query last entry in DynamoDB - Always endup with NULL",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 71629915,
    //         answerLink: "https://stackoverflow.com/a/71629915/",
    //         answerScore: 1,
    //         isAccepted: true,
    //         questionId: 71625298,
    //         questionLink: "https://stackoverflow.com/questions/71625298/",
    //         questionScore: 0,
    //         questionTitle: "Which AWS account is responsible for cross-account SDK API limits?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 71514923,
    //         answerLink: "https://stackoverflow.com/a/71514923/",
    //         answerScore: 2,
    //         isAccepted: true,
    //         questionId: 71514398,
    //         questionLink: "https://stackoverflow.com/questions/71514398/",
    //         questionScore: 0,
    //         questionTitle: "Send a lot of SQS messages in a lambda without getting timed out",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 71512357,
    //         answerLink: "https://stackoverflow.com/a/71512357/",
    //         answerScore: 0,
    //         isAccepted: false,
    //         questionId: 71511475,
    //         questionLink: "https://stackoverflow.com/questions/71511475/",
    //         questionScore: 0,
    //         questionTitle: "share db session across multiple lambda invocations using Mangum",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 71014511,
    //         answerLink: "https://stackoverflow.com/a/71014511/",
    //         answerScore: 1,
    //         isAccepted: true,
    //         questionId: 71014452,
    //         questionLink: "https://stackoverflow.com/questions/71014452/",
    //         questionScore: 1,
    //         questionTitle: "How many times do I need to run cdk bookstrap?",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 70737534,
    //         answerLink: "https://stackoverflow.com/a/70737534/",
    //         answerScore: 0,
    //         isAccepted: false,
    //         questionId: 70737422,
    //         questionLink: "https://stackoverflow.com/questions/70737422/",
    //         questionScore: 0,
    //         questionTitle: "AWS Lambda costs at resource level granularity",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 70730526,
    //         answerLink: "https://stackoverflow.com/a/70730526/",
    //         answerScore: 0,
    //         isAccepted: true,
    //         questionId: 70730423,
    //         questionLink: "https://stackoverflow.com/questions/70730423/",
    //         questionScore: 0,
    //         questionTitle: "Prevent duplicate DynamoDB transaction",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    //     {
    //         answerId: 70621561,
    //         answerLink: "https://stackoverflow.com/a/70621561/",
    //         answerScore: 2,
    //         isAccepted: false,
    //         questionId: 70620897,
    //         questionLink: "https://stackoverflow.com/questions/70620897/",
    //         questionScore: -1,
    //         questionTitle: "Creating a method to power on or off RDS Clusters",
    //         excerpt: "Lorem ipsum, some test that is real.",
    //     },
    // ]

    const searchTerm = encodeURIComponent(`[amazon-*] [aws-*] is:answer user:${userId} created:1y`)
    const url = `${API_BASE_URL}search/excerpts?site=${SITE_NAME}&q=${searchTerm}&pagesize=100`

    // "https://api.stackexchange.com/2.3/search/excerpts?site=stackoverflow&q=%5Bamazon-*%5D%20%5Baws-*%5D%20is%3Aanswer%20user%3A6485881%20created%3A1y&pagesize=100"

    let all_answers: { [key: string]: any }[] = []

    const maxPages = 5
    let page = 1
    while (page <= maxPages) {
        let partial_response = await getSearchPage(url, page)
        page++

        all_answers = all_answers.concat(partial_response.items)
        if (!partial_response.has_more) {
            break
        }

    }

    return all_answers.map((item) => {
        return {
            answerId: item.answer_id,
            answerLink: `https://stackoverflow.com/a/${item.answer_id}/`,
            answerScore: item.score,
            isAccepted: item.is_accepted,
            excerpt: item.excerpt,

            questionId: item.question_id,
            questionLink: `https://stackoverflow.com/questions/${item.question_id}/`,
            questionScore: item.question_score,
            questionTitle: item.title,
        }
    })
}