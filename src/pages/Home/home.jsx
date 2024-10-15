"use client"; 

import { useState } from "react"

export default function Home() {
    const [name, setName] = useState(1)
    return (<div>{name}</div>)
}