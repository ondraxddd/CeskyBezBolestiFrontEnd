"use client"
import '../Components/ComponentStyles/MixReport.css'
import { useEffect, useState } from "react"
import { Urls } from "../Contexts/UrlsExport"

interface allMixesReport {
    reports: Array<oneMixReport> | null
}

interface oneMixReport {
    Id: number
    DateTime: Date
}

export default function MixesOverview() {
    const [reports, setReports] = useState<allMixesReport | null>(null)

    useEffect(() => {
        fetch(Urls.server + Urls.getmixesreport, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((report: allMixesReport) => {
                setReports(report)
            })
            .catch(error => {
                console.error('Chyba:', error)
            })
    }, [])

    return (
        <>
            <div id="mixReportDiv">
                <div id="mixReportHeader">
                    <p>Id testu</p>
                    <p>Datum</p>
                </div>
                <nav id='mixReportFreshContent'>
                    {reports?.reports && reports.reports.map((report) => {
                        return (
                            <div
                                key={report.Id}
                                id='reportRow'
                                onClick={() => window.location.href = `ctyrletymix/report/${report.Id}`}>
                                <p>{report.Id}</p>
                                <p>{report.DateTime
                                    ? new Date(report.DateTime).toLocaleString('cs-CZ', { dateStyle: 'short', timeStyle: 'short' })
                                    : 'N/A'}</p>
                            </div>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}
