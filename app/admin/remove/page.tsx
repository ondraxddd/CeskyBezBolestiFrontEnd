'use client'

import { Urls } from "@/app/Contexts/UrlsExport"
import { questionDTO } from "@/app/Interfaces/IQuestionDTO"
import { Category, Subject, SubCategory } from "@/app/page"
import { option } from "framer-motion/client"
import { useEffect, useState } from "react"

export default function Home() {
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])
    const [allQuestions, setAllQuestions] = useState<questionDTO[]>([])
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null)
    const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null)
    const [statusText, setStatusText] = useState<string>("")

    useEffect(()=>{
        console.log("Subcatg changed: ", selectedSubCategoryId)
    },[selectedSubCategoryId])

    const checkIfAdmin = async () => {
        const data = await fetch(Urls.server + Urls.checkifadmin, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        if (data.ok) {
            setIsAdmin(await data.json())
        } else {
            setIsAdmin(false)
        }
    }

    useEffect(() => {
        checkIfAdmin()
    }, [])

    const DownloadSubjects = () => {
        fetch(Urls.server + Urls.getallsubjects, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((subjects: Subject[]) => {
                setAllSubjects(subjects)
            })
            .catch(error => {
                console.error('Chyba:', error);
            });
    }


    const DownloadQuestions = (subCatgIdTemp : Number) =>{
        console.log("Selected sub catg id: ", subCatgIdTemp)
        const requestData = {
            "subCatgId": subCatgIdTemp
        }
        fetch(Urls.server + Urls.getallquestions, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((questions: questionDTO[]) => {
                setAllQuestions(questions)
            })
            .catch(error => {
                console.error('Chyba:', error);
            });
    }

    useEffect(() => {
        DownloadSubjects()
    }, [])

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubjectId(Number(event.target.value))
        setSelectedCategoryId(0) // Resetování výběru kategorie při změně předmětu
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(Number(event.target.value))
        setSelectedSubCategoryId(0)
    }

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedsubcatgtemp = Number(event.target.value)
        setSelectedSubCategoryId(selectedsubcatgtemp)
        DownloadQuestions(selectedsubcatgtemp)
    }

    const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuestId(Number(event.target.value))
    }

    const handleDeleteButtonClick = () => {
        const requestData = {
            questId: selectedQuestId
        }
        console.log("Request data: ", requestData)
        fetch(Urls.server + Urls.removequestion,{
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        DownloadQuestions(selectedSubCategoryId)
    }

    const findSubjectById = (id: number) => {
        return allSubjects.find((subject: Subject) => subject.Id === id)
    }

    const findCategoryById = (subject: Subject, id: number) => {
        return subject?.Categories?.find((category: Category) => category.Id === id)
    }

    const selectedSubject = findSubjectById(selectedSubjectId!)
    const selectedCategory = selectedSubject ? findCategoryById(selectedSubject, selectedCategoryId!) : null

    if (!isAdmin) {
        return <h1>This page is for admins only.</h1>
    }

    return (
        <>
            <h2 onClick={() => setStatusText("")}>{statusText}</h2>
            <br />
            <select name="SubjectSelect" id="subjectselectbox" onChange={handleSubjectChange}>
                <option value={0}>-- Vyber předmět --</option>
                {allSubjects.map((tempSubject: Subject) => (
                    <option key={tempSubject.Id} value={tempSubject.Id}>
                        {tempSubject.Title}
                    </option>
                ))}
            </select>

            <select name="CategorySelect" id="categoryselect" onChange={handleCategoryChange}>
                <option value={0}>-- Vyber kategorii --</option>
                {selectedSubject && selectedSubject.Categories ? (
                    selectedSubject.Categories.map((tempCatg: Category) => (
                        <option key={tempCatg.Id} value={tempCatg.Id}>
                            {tempCatg.Title}
                        </option>
                    ))
                ) : (
                    <option value={0}>Žádné kategorie</option>
                )}
            </select>

            <select name="SubcategorySelect" id="subcategoryselect" onChange={handleSubCategoryChange}>
                <option value={0}>-- Vyber podkategorii --</option>
                {selectedCategory && selectedCategory.SubCatgs ? (
                    selectedCategory.SubCatgs.map((subCatg: SubCategory) => (
                        <option key={subCatg.Id} value={subCatg.Id}>
                            {subCatg.Desc}
                        </option>
                    ))
                ) : (
                    <option value={0}>Žádné podkategorie</option>
                )}
            </select>

            <br />

            <select name="QuestionSelect" onChange={handleQuestionChange}>
                <option value={0}>-- Vyber Otázku -- </option>
                {selectedCategory && selectedCategory.SubCatgs && selectedSubCategoryId  ? (
                    allQuestions.map((question: questionDTO) => (
                        <option key={question.questionId} value={question.questionId}>
                            {question.questionText}
                        </option>
                    ))
                ) : (
                    <option value={0}>Žádné podkategorie</option>
                )}
            </select>
            
            <button onClick={handleDeleteButtonClick}>Smazat otázku</button>
        </>
    )
}
