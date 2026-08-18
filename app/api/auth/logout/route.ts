import { clearTokens, ok } from "lib/api";
export async function POST() { const response = ok({ auth: false }); clearTokens(response); return response; }
