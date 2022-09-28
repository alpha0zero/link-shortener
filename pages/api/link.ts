import type { Link } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../db/prismaClient"

const hundler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST") res.status(405).end('method not allowed')

    try{
        const f_link: Link = req.body
        const link = await prisma?.link.create({
            data: f_link 
        })
        res.status(201).json(link)
    }catch(e){
        res.end('couldn\'t create the link')
    }
}

export default hundler