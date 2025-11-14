import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)
export const basename = resolve(__dirname);

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);
