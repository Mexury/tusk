class Response {
    success
    data
    error

    constructor(success, data, error) {
        this.success = success
        this.data = data
        this.error = error
    }
}

module.exports = Response