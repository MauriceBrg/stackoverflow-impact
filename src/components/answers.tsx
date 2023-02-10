import { StackOverflowAnswerSummary } from "../entities/stackoverflow"

const AnswerListHeader = () => {
    return <div>
        <h2>Answers involving AWS/Amazon tags in the last year</h2>
        <hr></hr>
    </div>
}

const AnswerItem = (props: { answerSummary: StackOverflowAnswerSummary }) => {

    const answer = props.answerSummary

    const is_accepted_class = answer.isAccepted ? "has-accepted-answer" : ""

    return (
        <div className="s-post-summary">

            <div className="s-post-summary--stats">
                <div className="s-post-summary--stats-item s-post-summary--stats-item__emphasized">
                    <span className="s-post-summary--stats-item-number">{answer.questionScore}</span>
                    <span className="s-post-summary--stats-item-units">Question Votes</span>
                </div>

                <div className={"s-post-summary--stats-item has-answers " + is_accepted_class}>
                    <span className="s-post-summary--stats-item-number">{answer.answerScore}</span>
                    <span className="s-post-summary--stats-item-units">Answer Votes</span>
                </div>

            </div>

            <div className="s-post-summary--content">
                <h3 className="s-post-summary-content--title">
                    <a href={answer.answerLink} target="_blank" rel="noreferrer">
                        {answer.questionTitle}
                    </a>
                </h3>
                <p className="s-post-summary--content-excerpt">
                    {answer.excerpt}
                </p>
            </div>
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