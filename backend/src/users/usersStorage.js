const Repository = require('../tasks/Repository');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);
class UsersRepository extends Repository{
    async create(attrs){
        attrs.id = this.randomId();
        const salt  = crypto.randomBytes(8).toString('hex');
        const buffer = await scrypt(attrs.password,salt,64);
        const record = {
            ...attrs,
            password: `${buffer.toString('hex')}.${salt}`
        }
        const records = await this.getAll();
        records.push(record);
        await this.writeAll(records)
        return record;
    }
    async comparePasswords(supplied, saved){
        const [hashed , salt] = saved.split('.');
        const hashedSuppliedBuffer = await scrypt(supplied,salt,64);
        return hashedSuppliedBuffer.toString('hex') === hashed;
    }
    async update(email, update) {
        const records = await this.getAll();
        const recordToUpdate = records.find(record => record.email === email);
        console.log({recordToUpdate})
        console.log({email , update})
        if (recordToUpdate) {
            recordToUpdate.email = update;
            await this.writeAll(records);
            return true;
        }
        return null;
    }
    async delete(email) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.email !== email);
        await this.writeAll(filteredRecords);
        return true;
    }
};
module.exports = new UsersRepository('users.json');