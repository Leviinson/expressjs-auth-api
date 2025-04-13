import { IncomingHttpHeaders } from "http";

function isAuthenticated(headers: IncomingHttpHeaders): boolean {
    const authHeader = headers.authorization?.split(" ")[1];
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const accessToken: string = authHeader.slice(7);
        return isTokenValid(accessToken);
    }
    return false;
}

function isTokenValid(accessToken: string): boolean {
    return false;
}

export default isAuthenticated;
