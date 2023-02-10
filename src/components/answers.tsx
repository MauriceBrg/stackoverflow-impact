import { StackOverflowAnswerSummary } from "../entities/stackoverflow"

const AnswerListHeader = () => {
    return <div>
        <h2>List of answers involving AWS/Amazon tags in the last year</h2>
    </div>
}

const AnswerItem = (props: { answerSummary: StackOverflowAnswerSummary }) => {

    const answer = props.answerSummary

    return (<div className="s-card">
        <h2 className="fs-body3 lh-sm fc-dark">{answer.questionTitle}</h2>
    </div>)
}

export const AnswerList = (props: { answerSummaries: StackOverflowAnswerSummary[] }) => {
    return (
        <div>
            <AnswerListHeader />
            {
                props.answerSummaries.map((summary) => {

                    return <AnswerItem answerSummary={summary} key={summary.questionId} />
                })
            }
        </div>
    )
}