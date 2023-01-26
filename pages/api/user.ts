import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const userCreate = async (data) => {
    try {
        const user = await prisma.user.create({ data: data })
        return user
    }
    catch (err) {
        return err
    }
}

const userList = async () => {
    try {
        console.log("asasdas")
        const users = await prisma.user.findMany()
        return users
    }
    catch (err) {
        return err
    }
}



const postMethod = async (req) => {
    console.log(req.body)
    const data = { ...req.body }

    try {
        const res = await userCreate(data)
        return res
    }
    catch (err) {
        return err.message
    }
}

const getMethod = async () => {
    console.log("akshgdjkhasdghjkasd")
    try {
        const res = await userList()
        console.log("res:", res)
        return res
    }
    catch (err) {
        return err.message
    }
}


export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            const postResult = await postMethod(req)
            if (postResult.id !== undefined) {
                res.status(200).json({ message: "Success post method", data: postResult });
            } else {
                res.status(400).json({ message: postResult });
            }
            break;

        case "GET":
            const getResult = await getMethod()
            console.log("ahjksdgahjsdg")
            if (getResult) {
                console.log("   adhaskdhasd")
                res.status(200).json({ message: "Success get method", data: getResult });
            } else {
                res.status(400).json({ message: getResult });
            }
            break;


        default: res.status(400).json({ name: 'error' }); break;
    }
}