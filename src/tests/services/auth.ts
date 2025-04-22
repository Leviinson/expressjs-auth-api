import { Request } from "express";
import request, { Test } from "supertest";
import TestAgent from "supertest/lib/agent";

import app from "@/app";
import UserRepo from "@/db/models/repos/user";

function extractCSRFTokenFromHeaders(headers: Request["headers"]) {
    const setCookiesHeaders = headers["set-cookie"];
    const csrfTokenUnparsed = setCookiesHeaders!.find((cookie) =>
        cookie.startsWith("csrftoken=")
    );
    return csrfTokenUnparsed?.split(";")[0].split("=")[1];
}

async function getCSRFToken(requestAgent: TestAgent<Test>): Promise<string> {
    const responseWithCSRFToken = await requestAgent.get("/me");
    return extractCSRFTokenFromHeaders(responseWithCSRFToken.headers)!;
}

async function createUserAndLogin(
    userDataOverride = {},
    agent?: TestAgent<Test>
) {
    const userData = {
        email: "test@gmail.com",
        username: "levinsxn",
        password: "dsaasddsaaa",
        ...userDataOverride,
    };

    const userRepo = new UserRepo();
    const user = await userRepo.create({ ...userData });

    const requestAgent = agent ? agent : request(app);
    const csrfToken = await getCSRFToken(requestAgent);
    expect(csrfToken).toBeDefined();

    const signInRes = await requestAgent
        .post("/auth/signin")
        .set("Cookie", `csrftoken=${csrfToken}`)
        .send({
            username: userData.username,
            password: userData.password,
            csrftoken: csrfToken,
        });
    return { response: signInRes, user: user, csrfToken: csrfToken };
}

export { getCSRFToken };
export default createUserAndLogin;
