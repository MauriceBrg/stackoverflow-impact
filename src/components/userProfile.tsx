import { StackOverflowUserInfo } from "../entities/stackoverflow"

const AWS_ANSWERS_BASE_URL = "https://stackoverflow.com/search?tab=votes&searchOn=3&q=%5bamazon-*%5d%20%5baws-*%5d%20is%3aanswer%20user%3a"

export const UserProfile = (props: { userInfo: StackOverflowUserInfo | null }) => {

    if (props.userInfo == null) {
        return (<p>Loading user Profile...</p>)
    }

    const user = props.userInfo

    return (
        <div>
            <div className="s-card">
                <h2 className="fs-body3 lh-sm fc-dark">User Profile of {user.displayName}</h2>
                <div className="d-grid grid__2">
                    <div className="grid--item">
                        <a href={props.userInfo.profileUrl} className="s-avatar s-avatar__128">
                            <img className="s-avatar--image" alt={`Profile of ${user.displayName}`} src={props.userInfo.imageUrl} />
                        </a>
                    </div>
                    <div className="grid--item">
                        <ul className="list-ls-disc">
                            <li>
                                <a
                                    className="s-link"
                                    href={user.profileUrl}
                                    target="_blank"
                                    rel="noreferrer">
                                    StackOverflow Profile
                                </a>
                            </li>
                            <li>
                                <a
                                    className="s-link"
                                    href={AWS_ANSWERS_BASE_URL + user.userId}
                                    target="_blank"
                                    rel="noreferrer">
                                    AWS-* | Amazon-* Answers
                                </a>
                            </li>
                            <li>
                                Reputation: {user.reputation}
                            </li>
                            <li>
                                Reputation Change in the last year: {user.reputationChangeYear}
                            </li>
                        </ul>
                    </div>

                </div>

                <p className="fs-body1 fc-medium">

                </p>


            </div>

        </div>

    )
}