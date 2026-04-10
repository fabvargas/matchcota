import bcypt from "bcrypt";

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    const match = await bcypt.compare(password, hash);
    return match;
}

export default comparePassword;