import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../db/prismaClient"

const hundler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query
    console.log(req.query);
    

    if (slug) {
        try{
            const data = await prisma?.link.findFirst({
                where: {
                    slug: {
                        equals: `${slug}`,
                    }
                }
            })
            res.status(201).json(data)
        }catch(_){
            res.end('couldn\'t get the data')
        }
    }
}

export default hundler