const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

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

const exclude = (entry, keys) => {
	if (entry) for (let key of keys) delete entry[key]
	return entry
}

const hashPassword = async (password) => await bcrypt.hash(password, 10)
const comparePassword = async (password, hash) => await bcrypt.compare(password, hash)

const exists = async (email) => {
    let user
    try {
        user = await prisma.user.findFirst({ where: { email }})
        return new Response(user ? true : false, user ? exclude(user, ['password']) : null, user ? null : "User not found")
    } catch (error) {
        return new Response(false, null, error)
    }
}

const validate = async (email, password) => {
    let exists = exists(email)
    if (exists.success = true) {
        if (await comparePassword(password, exists.data.password)) {
            return new Response(true, exclude(exists.data, ['password']), null)
        }
        return new Response(false, null, "Incorrect email or password")
    }
    return new Response(false, null, "Incorrect email or password")
}

const register = async (display_name, email, password) => {
    let user
    try {
        let hash = await hashPassword(password)
        user = await prisma.user.create({
            data: {
                display_name,
                email,
                password: hash,
                administrator: false
            }
        })
        return new Response(true, exclude(user, ['password']), null)
    } catch (error) {
        return new Response(false, null, error)
    }
}

module.exports = {
    exists,
    validate,
    register
}