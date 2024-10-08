const fs = require('fs');
const crypto = require('crypto');
class Repository {
    constructor(filename) {
        if (!filename) {
            throw new Error('A filename is required to make a repository');
        }
        this.filename = filename;

        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll() {
        return JSON.parse(await fs.promises.readFile(this.filename));
    }

    async writeAll(records) {
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
    }

    randomId() {
        return crypto.randomBytes(8).toString('hex');
    }

    async create(attrs) {
        attrs.id = this.randomId();
        const records = await this.getAll();
        records.push(attrs);
        await this.writeAll(records)
        return attrs;
    }

    async update(oldTitle, newTitle) {
        const records = await this.getAll();
        const recordToUpdate = records.find(record => record.title === oldTitle);
        if (recordToUpdate) {
            recordToUpdate.title = newTitle;
            await this.writeAll(records);
            return true;
        }
        return null;
    }

    async delete({ id }) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);
        await this.writeAll(filteredRecords);
        return true;
    }

    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }

    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key])
                    found = false;
                if (found)
                    return record;
            }
        }
        return false;
    }
}
module.exports = Repository;