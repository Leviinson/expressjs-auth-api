import User from "@/db/models/User";

interface userProfileSerialized {
    username: string;
    email: string;
}

function serializeUserProfile(user: User): userProfileSerialized {
    return { username: user.username, email: user.email };
}

export { userProfileSerialized };
export default serializeUserProfile;
