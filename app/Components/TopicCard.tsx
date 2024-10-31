import pdfIcon from "../../public/pdfIconpng.png"
import Image from "next/image"
import Link from "next/link"
import { Category } from "../page"
import "./ComponentStyles/TopicCard.css"
import { removeDiacriticsAndSpaces } from "../page"

interface Props {
    category: Category
}

export default function topicCardComponent({ category }: Props) {

    return (
        <div id='topicCardCtg'>
            <h2 id='excHeadline'>{category.Title}</h2>
            <ul>
                {category.SubCatgs.map(ctg => (
                    <>
                        <Link href={"/procvicovani/" + removeDiacriticsAndSpaces(category.Title) + "/" + removeDiacriticsAndSpaces(ctg.Desc) + "/" + ctg.Id}>
                            <li key={ctg.Id}>{ctg.Desc}</li>
                        </Link>
                    </>
                ))}
            </ul>
            <button id='ucebnice'><Image src={pdfIcon} alt="" id='ucebniceImg' />Učebnice</button>
        </div>
    )
}