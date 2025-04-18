import createUserAndLogin from "../services/auth";

describe("POST /auth/signin", () => {
    it("must return access and refresh token", async () => {
        const { response } = await createUserAndLogin({ isActive: true });
        expect(response.status).toStrictEqual(200);
    });
});
