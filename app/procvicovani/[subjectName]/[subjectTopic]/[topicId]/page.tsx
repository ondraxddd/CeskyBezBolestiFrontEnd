'use client'
import ClickerComponent from "@/app/Components/Clicker"
import { FullSubjectsContext } from "@/app/Contexts/FullSubjects"
import { Urls } from "@/app/Contexts/UrlsExport"
import { SubcategoryDTO } from "@/app/Interfaces/SubcategoryDTO"
import { Console } from "console"
import { useEffect, useState } from "react"
import "./style.css"


interface Props{
    params: {topicId:number}
}

export default function Exercise( {params}:Props ) {

    const [subcategory, setSubcategory] = useState<SubcategoryDTO | undefined>()

    async function DownloadCategoryDetails() {
        const response = await fetch(Urls.server + Urls.getsubcategorydetails + "?subcatgid=" + params.topicId)
        if(response.ok) setSubcategory( await response.json())
        console.log(subcategory)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{DownloadCategoryDetails()}, [])

    return (
        <div id="procvicovaniPage">
            <h1 id="procvicovaniCategoryName">{ subcategory?.ParentCatgName + " - " + subcategory?.Desc}</h1>
            {subcategory ? <ClickerComponent subCategory={subcategory}></ClickerComponent> : <h1>Loading...</h1>}
        </div>
    )
}
