import { pbkdf2Sync, randomBytes } from "crypto";

type HashedPassword = string;
type RawPassword = string;

/**
 * This function uses "pbkdf2_sha256" algorythm
 * for passwords hashing.
 *
 * The number of iterations can be specified only
 * via "PASSWORD_HASH_ITERATIONS" envvar.
 *
 * The number of keylen is 32.
 *
 * Separator is "$"
 * @param password - raw password passed in the payload (for example)
 * @returns hashed password
 */
function hashPassword(password: RawPassword): HashedPassword {
    const algorythm = "pbkdf2_sha256";
    const iterations = parseInt(process.env.PASSWORD_HASH_ITERATIONS!);
    const salt = randomBytes(16).toString("hex");
    const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
    return `${algorythm}$${iterations}$${salt}$${hash}`;
}

export default hashPassword;
