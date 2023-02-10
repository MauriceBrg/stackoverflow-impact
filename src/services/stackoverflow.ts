import { StackOverflowUserInfo } from "../entities/stackoverflow";

const API_BASE_URL = "https://api.stackexchange.com/2.3/"
const SITE_NAME = "stackoverflow"

interface StackOverflowListResponse {
    items: { [key: string]: any }[]
    has_more: boolean
    quota_max: number
    quota_remaining: number
}

export async function getUserInfo(userId: number): Promise<StackOverflowUserInfo> {

    // Don't hammer the API

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