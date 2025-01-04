'use client'

import { Urls } from "@/app/Contexts/UrlsExport"
import { Category, Subject, SubCategory } from "@/app/page"
import { useEffect, useState } from "react"

export default function Home() {
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])
    const [selectedSubjectId, setSelectedSubjectId] = useState<number|null>(null)
    const [selectedCategoryId, setSelectedCategoryId] = useState<number|null>(null)
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number|null>(null)
    const [statusText, setStatusText] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [correctAnswer, setCorrectAnswer] = useState<string>("")
    const [wrongAnswer, setWrongAnswer] = useState<string>("")
    const [newSubcategoryName, setNewSubcategoryName] = useState<string>("")
    const [newCategoryName, setNewCategoryName] = useState<string>("")
    
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

    useEffect(() => {
        DownloadSubjects()
    }, [])

    const handleSubjectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubjectId(Number(event.target.value))
        setSelectedCategoryId(0) // Resetování výběru kategorie při změně předmětu
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(Number(event.target.value))
    }

    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubCategoryId(Number(event.target.value))
    }

    const handleNewCategorySubmit = async () => {
        if(newCategoryName == "" || selectedSubjectId == null){
            setStatusText("Napiště název nové kategorie a vyberte rodiče!")
            return;
        }
        setStatusText("")

        const payload = {
            subjectId: selectedSubjectId,
            categoryName: newCategoryName,
            categoryDesc: ""
        }

        try {
            const response = await fetch(Urls.server + Urls.addcategory, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                console.log("Nová kategorie uložena.", payload)
                setStatusText("Nová kategorie uložena.")
                await DownloadSubjects()
                setNewCategoryName("")
            } else {
                console.error("Chyba při odesílání:", response.statusText)
                setStatusText("Při ukládání došlo k chybě.")
            }
        } catch (error) {
            setStatusText("Při ukládání došlo k chybě.")
            console.error("Chyba při odesílání:", error)
        }

    }

    const handleNewSubcategorySubmit = async () => {

        if(newSubcategoryName == "" || selectedCategoryId == null){
            setStatusText("Napiště název podkategorie a vyberte rodiče!")
            return
        }
        setStatusText("")

        const payload = {
            categoryId: selectedCategoryId,
            subcategoryName: newSubcategoryName
        }

        try {
            const response = await fetch(Urls.server + Urls.addsubcategory, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                console.log("Nová podkategorie uložena.", payload)
                setStatusText("Nová podkategorie uložena.")
                await DownloadSubjects()
                setNewSubcategoryName("")
            } else {
                console.error("Chyba při odesílání:", response.statusText)
                setStatusText("Při ukládání došlo k chybě.")
            }
        } catch (error) {
            setStatusText("Při ukládání došlo k chybě.")
            console.error("Chyba při odesílání:", error)
        }
    }

    const handleQuestionSubmit = async () => {
        setStatusText("Loading...")
        if(selectedCategoryId == null || question == "" || correctAnswer == "" || wrongAnswer == "" ){
            setStatusText("Všechna pole otázky musí být vyplněna!")
            return
        }

        const payload = {
            subCatgId: selectedSubCategoryId,
            questText: question,
            answers: [correctAnswer, wrongAnswer] // Správná odpověď je vždy na prvním místě
        }

        try {
            const response = await fetch(Urls.server + Urls.addquestion, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                console.log("Otázka byla úspěšně odeslána:", payload)
                setStatusText("Otázka úspěšně uložena!")
            } else {
                console.error("Chyba při odesílání otázky:", response.statusText)
                setStatusText("Při ukládání otázky došlo k chybě.")
            }
        } catch (error) {
            setStatusText("Při ukládání otázky došlo k chybě.")
            console.error("Chyba při odesílání:", error)
        }
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
            
            <br/>

            <h1>Přidat kategorii</h1>
            <input
                type="text"
                placeholder="Název kategorie"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <button onClick={handleNewCategorySubmit}>Přidat kategorii</button>

            <h1>Přidat podkategorii</h1>
            <input
                type="text"
                placeholder="Název podkategorie"
                value={newSubcategoryName}
                onChange={(e) => setNewSubcategoryName(e.target.value)}
            />
            <button onClick={handleNewSubcategorySubmit}>Přidat podkategorii</button>


            <h1>Přidat otázku</h1>
            <input
                type="text"
                placeholder="otázka"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <input
                type="text"
                placeholder="dobře"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <input
                type="text"
                placeholder="špatně"
                value={wrongAnswer}
                onChange={(e) => setWrongAnswer(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Přidat otázku</button>
            <button onClick={()=>console.log(selectedSubCategoryId)}>Log subcatg id</button>
           

        </>
    )
}
