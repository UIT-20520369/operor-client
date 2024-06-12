import { oapi } from "@/global-instances/axios-intance";

async function getUsers(input: { limit: number, offset: number }) {
    try {
        const response = await oapi.post('/user', { limit: input.limit, offset: input.offset })
        if (!!response.data) {
            return response.data
        }
    } catch (error) {
        alert(error);
    }
}
export const userQueries = { getUsers }