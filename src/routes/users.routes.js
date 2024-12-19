import { faker } from '@faker-js/faker'
import express from 'express'

const router = express.Router()


router.get('/', (req, res) => {
    let limit = req.query.limit || 10
    if (limit > 100) {
        limit = 100
    }

    const users = []
    for (let i = 0; i < limit; i++) {
        users.push({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            email: faker.internet.email()
        })
    }

    res.send(users)
})



export default router