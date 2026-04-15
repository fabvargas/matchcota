import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

export default hashPassword;