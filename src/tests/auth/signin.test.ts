import createUserAndLogin from "@/tests/services/auth";

describe("POST /auth/signin", () => {
    it("must return access and refresh token", async () => {
        const { response } = await createUserAndLogin({ isActive: true });
        expect(response.status).toStrictEqual(200);
        expect(response.body).toMatchObject({ access: response.body.access });
    });
});
