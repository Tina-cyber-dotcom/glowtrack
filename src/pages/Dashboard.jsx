import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 

export default function Dashboard() { 
    const navigate = useNavigate(); 
    const quotes = [ 
        { text: "Small steps every day are still steps.", author: "Maya L." }, 
        { text: "Consistency beats intensity.", author: "—" }, 
        { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Z." }, 
        { text: "Progress, not perfection.", author: "—" }, 
        { text: "One healthy choice can change your whole day.", author: "—" }, 
    ]; 
    const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length; 
    const [quoteIndex, setQuoteIndex] = useState(dayIndex); 
    const [activeTab, setActiveTab] = useState("exercise"); 

    useEffect(() => { 
        const timer = setInterval(() => { 
            const idx = Math.floor(Date.now() / 86400000) % quotes.length; 
            setQuoteIndex(idx); 
        }, 60 * 1000); 
        return () => clearInterval(timer); 
    }, []); 

    const darkText = "#C2185B"; 

    const handleTabClick = (tab) => { 
        if (tab === "exercise") { 
            navigate("/exercise"); 
        } else { 
            setActiveTab(tab); 
        } 
    }; 

    return ( 
        <div className="min-h-screen flex flex-col items-center p-4 bg-[#FFF8E7]"> 
            <h1 style={{ fontFamily: "'Pacifico', cursive" }} className="text-4xl mt-6 text-[#C2185B] text-center"> 
                Welcome back, Babe 
            </h1> 

            <div className="mt-6 text-center px-4"> 
                <p className="text-[#C2185B] italic text-lg">“{quotes[quoteIndex].text}”</p> 
                <p className="mt-2 text-[#C2185B] text-sm">— {quotes[quoteIndex].author}</p> 
                <div className="mt-2 text-[#C2185B] text-xs font-semibold">Grow Glowing</div> 
            </div> 

            <div className="flex-1 mt-6 w-full max-w-3xl px-4"> 
                <div className="rounded-xl p-4 min-h-[200px] bg-white/60 flex items-center justify-center"> 
                    <span>Tab Content: {activeTab}</span> 
                </div> 
            </div> 

            <div className="w-full max-w-3xl mb-6 flex justify-center"> 
                <div className="flex justify-between items-center w-full bg-white/40 backdrop-blur-md rounded-3xl px-6 py-2 shadow-lg"> 
                    
                    {/* Left Tabs */}
                    {["exercise", "nutrition"].map((tab) => ( 
                        <button 
                            key={tab} 
                            onClick={() => handleTabClick(tab)} 
                            className={`flex flex-col items-center text-sm ${activeTab === tab ? "font-bold" : "opacity-80"}`} 
                            style={{ color: darkText }} 
                        > 
                            <span className="text-2xl">{tab === "exercise" ? "🏋‍♂" : "🍽"}</span> 
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                        </button> 
                    ))} 

                    {/* Center + Button */}
                    <button className="w-16 h-16 bg-[#F7B9C6] rounded-full text-white text-3xl -mt-6 shadow-lg flex items-center justify-center"> 
                        + 
                    </button> 

                    {/* Right Tabs */}
                    {["progress", "mood", "water"].map((tab) => ( 
                        <button 
                            key={tab} 
                            onClick={() => handleTabClick(tab)} 
                            className={`flex flex-col items-center text-sm ${activeTab === tab ? "font-bold" : "opacity-80"}`} 
                            style={{ color: darkText }} 
                        > 
                            <span className="text-2xl"> 
                                {tab === "progress" ? "📈" : tab === "mood" ? "🙂" : "💧"} 
                            </span> 
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                        </button> 
                    ))} 

                </div> 
            </div> 
        </div> 
    ); 
}
