import { StackOverflowAnswerStatistics, StackOverflowAnswerSummary } from "../entities/stackoverflow"

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

export const AnswerStats = (props: { answerStats: StackOverflowAnswerStatistics | null }) => {

    const stats = props.answerStats

    if (stats == null) {
        return <span>Waiting for answer data to compile stats.</span>
    }

    return (<div>
        <div className="s-card">
            <div className="d-flex fd-column h100">
                <h1 className="flex--item fs-category fs-fine fc-black-350">Answer Statistics</h1>
                <div className="flex--item fl-grow1">
                    <div className="d-flex fw-wrap h100 flex__fl-equal g16 s-anchors s-anchors__muted">
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{stats.numberOfAnswers}</div>
                            <div className="fs-caption fc-light ws-nowrap">answers</div>
                        </div>
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{stats.totalScore}</div>
                            <div className="fs-caption fc-light ws-nowrap">total score</div>
                        </div>
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{stats.totalViews}</div>
                            <div className="fs-caption fc-light ws-nowrap">total views</div>
                        </div>
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{stats.maxScore}</div>
                            <div className="fs-caption fc-light ws-nowrap">max score</div>
                        </div>
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{Math.round((stats.averageScore + Number.EPSILON) * 100) / 100}</div>
                            <div className="fs-caption fc-light ws-nowrap">mean score</div>
                        </div>
                        <div className="flex--item">
                            <div className="fs-body3 fc-dark">{stats.minScore}</div>
                            <div className="fs-caption fc-light ws-nowrap">min score</div>
                        </div>
                    </div>
                </div>
            </div>
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