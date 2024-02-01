const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const Response = require('../helpers/Result')

const exclude = (entry, keys) => {
	if (entry) for (let key of keys) delete entry[key]
	return entry
}

const hashPassword = async (password) => await bcrypt.hash(password, 10)
const comparePassword = async (password, hash) => await bcrypt.compare(password, hash)

const exists = async (email, includePassword) => {
    let user
    try {
        user = await prisma.user.findFirst({ where: { email }})
        return new Response(user != null ? true : false, user ? exclude(user, [includePassword ? '' : 'password']) : null, user ? null : "User not found")
    } catch (error) {
        return new Response(false, null, error)
    }
}

const validate = async (email, password) => {
    let result = await exists(email, true)
    if (result.success = true) {
        if (await comparePassword(password, result.data.password)) {
            return new Response(true, exclude(result.data, ['password']), null)
        }
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