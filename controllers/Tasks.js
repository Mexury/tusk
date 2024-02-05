const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const crypto = require('crypto')
const Response = require('../helpers/Result')

const exclude = (entry, keys) => {
	if (entry) for (let key of keys) delete entry[key]
	return entry
}

const getAllByBoardShareId = async (boardId) => {
    const tasks = await prisma.task.findMany({
        where: {
            board_id: boardId
        }
    })
    return new Response(tasks ? true : false, tasks ?? null, tasks ? null : 'No tasks found')
}

const create = async (boardId, taskName, taskNote) => {
    try {
        const task = await prisma.task.create({
            data: {
                title: taskName,
                note: taskNote,
                board: {
                    connect: { id: boardId }
                }
            }
        })
        return new Response(true, task, null)
    } catch (error) {
        return new Response(false, null, error)
    }
}

module.exports = {
    getAllByBoardShareId,
    create
}