const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const crypto = require('crypto')
const Response = require('../helpers/Result')

const exclude = (entry, keys) => {
	if (entry) for (let key of keys) delete entry[key]
	return entry
}

const getAllFromUser = async (userId) => {
    const boards = await prisma.board.findMany({
        where: {
            creator_id: userId
        }
    })
    return new Response(boards ? true : false, boards ?? null, boards ? null : 'No boards found')
}

const create = async (userId, boardName, boardNote) => {
    try {
        const board = await prisma.board.create({
            data: {
                title: boardName,
                note: boardNote,
                share_id: crypto.randomUUID(),
                creator: {
                    connect: { id: userId }
                }
            }
        })
        return new Response(true, board, null)
    } catch (error) {
        return new Response(false, null, error)
    }
}

module.exports = {
    getAllFromUser,
    create
}