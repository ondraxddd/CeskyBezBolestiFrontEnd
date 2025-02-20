"use client"
import "./statisticsPage.css"
import BestAndWorstStat from "../Components/Statistics/BestAndWorstStat"
import SuccessRateStat from "../Components/Statistics/SuccessRateStat"
import TimeSpentStat from "../Components/Statistics/TimeSpentStat"
import ShouldRemember, { ToRememberServerResponse } from "../Components/Statistics/ShouldRemember"
import { Urls } from "../Contexts/UrlsExport"
import { useEffect, useState } from "react"

export default function Statistics() {

    interface Userstats{
        SuccessRate: string;
        BestCategory: string;
        WorstCategory: string;
        DailyAvg: string;
        ShouldRemember: { [key: string]: string }[]
    }
 
    const [userStats, setUserStats] = useState<Userstats>()
    const DownloadStats = () => {
        // Provedení HTTP požadavku a zpracování odpovědi
    fetch(Urls.server + Urls.getuserstats, {
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
        .then((stats : Userstats) => {
            console.log('Stats loaded: ', stats);
            setUserStats(stats)
        })
        .catch(error => {
            console.error('Chyba:', error);
        });
    }
    
    const toRememberData: ToRememberServerResponse = [
        { Ul_zat: "y" },
        { L_bání: "Í" },
        { Vyl_zat: "y" },
        { Ul_tnout: "í" }
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{DownloadStats()}, [])
    
    return (
        <div id="statisticsPage">

            <h1 id="statisticsPageh1">Tvoje Statistiky</h1> <br />
            <div id="statsDetails">

                <div id="statsRow">
                    <SuccessRateStat percent={userStats?.SuccessRate ?? "Loading"}></SuccessRateStat>
                    <BestAndWorstStat BestCategory={userStats?.BestCategory ?? "Loading"} 
                    WorstCategory={userStats?.WorstCategory ?? "Loading"}></BestAndWorstStat>
                    <TimeSpentStat minutes={userStats?.DailyAvg ?? "Loading"}></TimeSpentStat>
                </div>
                
                <div className="break"></div>
                {/* <div id="statsRow">
                    <ShouldRemember data={userStats?.ShouldRemember ?? [{}]}></ShouldRemember>
                </div> */}
            </div>
        </div>
    )
}
