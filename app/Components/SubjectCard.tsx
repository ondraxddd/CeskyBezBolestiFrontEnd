import Link from "next/link";
import { Category, Subject, removeDiacriticsAndSpaces } from "../page";
import './ComponentStyles/SubjectCard.css';

interface Props {
    subject: Subject
}

function SubjectCard({subject }: Props) {
    const link = removeDiacriticsAndSpaces(subject.Title)
   
    return (
        <div className="topicCard">
            <Link href={"subject/"+ link +"/"+subject.Id}>
                <h1>{subject.Title}</h1>
                <p className="exCount">1098 cvičení zdarma a 98 prémiových</p>
                <ul>
                    {subject.Categories.map((category:Category)=><li key={category.Id}>{category.Title}</li>)}
                </ul>
            </Link>
        </div>
    )
};

export default SubjectCard;