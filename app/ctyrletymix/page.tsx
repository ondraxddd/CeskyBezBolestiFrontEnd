'use client'

import { useEffect } from "react"
import ClickerMix from "../Components/ClickerMix"

export default function Ctyrletymix() {

    // useEffect(()=>{console.log("Check if user is logges in")}, [])

    if (false) { // make a rule to display error if user aint logged in
        return (
            <>

            </>
        )
    }
    else {
        return (
            <>
                <ClickerMix></ClickerMix>
            </>
        )
    }
}
