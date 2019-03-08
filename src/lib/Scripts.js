const path = require('path')
const fs = require('fs-extra')
const FILENAME = path.resolve(__dirname, '../../', 'data/scripts.json')

class Scripts {
    static get() {
        let data = {}
        if (fs.existsSync(FILENAME)) {
            try {
                data = require(FILENAME)
            } catch (e) {}
        }
        return data
    }

    static set(data) {
        fs.createFile(FILENAME, err => {
            if (err) throw new Error(err)
            fs.writeFileSync(FILENAME, JSON.stringify(data, null, 2))
        })
        try {
            delete require.cache[require.resolve(FILENAME)]
        } catch (e) {}
    }
}

module.exports = Scripts
