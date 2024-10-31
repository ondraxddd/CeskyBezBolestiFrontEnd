'use client'
import { FullSubjectsContext } from "@/app/Contexts/FullSubjects"
import { useContext } from "react"
import topicCardComponent from "@/app/Components/TopicCard"
import TopicCard from "../../../Components/TopicCard"
import "./style.css"

interface Props{
    params: {subjectId:number}
}

export default function SubjectDetail( {params}:Props ) {
    const subjects = useContext(FullSubjectsContext)
    const subject = subjects?.subjects.find(subject => subject.Id == params.subjectId)
    return (
        <div id="subjectDetailsPage">
            <h1>{subject?.Title}</h1>
            {subject?.Categories.map(ctg => (
                <TopicCard key={ctg.Id} category={ctg}></TopicCard>
            ))}
        </div>
    )
}
