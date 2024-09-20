import bcrypt from 'bcrypt';

export default abstract class HashMethods {
    static compareHash(hash: string, password: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    static hash(password: string, saltRounds: number): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }
}
