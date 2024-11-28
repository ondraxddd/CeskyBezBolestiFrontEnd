'use client'

import MixResultFromApi from "@/app/Components/MixResultFromApi";
import { Urls } from "@/app/Contexts/UrlsExport";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface ReportDetailResponse {
    id: number;
    recorded: string;
    answers: ReportDetailAnswer[];
}

export interface ReportDetailAnswer {
    id: number;
    question: string;
    answers: string[];
    wasUserCorrect: boolean;
}

export default function ReportDetails() {
    const reportId = useParams().reportId
    const[report, setReport] = useState<ReportDetailResponse>()

    const DownloadReport = async () => {
        try {
            const response = await fetch(`${Urls.server}${Urls.getreportdetails}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Zajišťuje, že se pošlou cookies a další credentials
                body: JSON.stringify({
                    reportId: reportId,
                }),
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }

            const data: ReportDetailResponse = await response.json();
            setReport(data)
            return data;
        }
        catch (error) {
            console.error("Failed to download report:", error);
            return null;
        }
    };

    useEffect(() => { DownloadReport() }, [])

    return (
        <>
            <MixResultFromApi serverResponse={report}></MixResultFromApi>
        </>
    )
}
