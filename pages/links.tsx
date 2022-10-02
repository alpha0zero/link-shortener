import { Link } from "@prisma/client"
import { GetServerSideProps } from "next"
import { prisma } from "../db/prismaClient"

type Props = { links: Link[] | null }

const Links = (props: Props) => {
    return (
        <div className="m-3">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Slug</th>
                        <th scope="col">URL</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.links?.map( link => (
                            <tr key={link.id}>
                                <th scope="row">{ link.id }</th>
                                <td> {link.slug} </td>
                                <td style={{cursor: 'pointer'}} className="link-primary"> <a href={link.url}> {link.url} </a> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export const getServerSideProps = async () => {
    const links = await prisma.link.findMany({
        select: {
            id: true,
            slug: true,
            url: true
        }
    })

    return {
        props: {
            links
        }
    }
}

export default Links