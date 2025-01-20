'use client'

import { useEffect } from "react"
import ClickerMix from "../Components/ClickerMix"
import "./style.css"

export default function Ctyrletymix() {

    // useEffect(()=>{console.log("Check if user is logges in")}, [])

    if (false) { //TODO display error if user aint logged in
        return (
            <>

            </>
        )
    }
    else {
        return (
            <>
             <ClickerMix></ClickerMix>
             {/* <a href="/mixesoverview" id="othertestsresults">Výsledky ostatních pokusů</a> */}
             </>
        )
    }
}
