import './AllCards.css'
import React, { useEffect, useState } from "react";
import { BsSuitSpadeFill, BsSuitDiamondFill, BsSuitClubFill, BsSuitHeartFill} from 'react-icons/bs'
import { message } from "antd";

// ! QUESTION 
// ! create UI to draw and display random 5 cards from deck of 52 cards and remove particular card on click

const AllCards=()=>{

    const [MainDrawCards, setMainDrawCards]=useState([])
    const [DisplayCard, setDisplayCard]=useState([])

    useEffect(()=>{
        let cardNumbers= ['2','3','4','5','6','7','8','9','0','A','K','Q','J']
        let cardTypes=['H','S','D','C']
        // 0 in above array is 10
        let newArr=[]
        for(let typ of cardTypes){
            for(let num of cardNumbers){
                newArr.push(num+typ)
            }
        }
        let suffleArr=newArr.sort(()=>Math.random()-0.5)
        setMainDrawCards(suffleArr)
        // ! OR
        // let cardNumbers= ['2','3','4','5','6','7','8','9','0','A','K','Q','J']
        // // 0 in above array is 10
        // let newArr=[]
        // let newObj={
        //     heart:cardNumbers.map(e=>e+'H'),
        //     spade:cardNumbers.map(e=>e+'S'),
        //     diamond:cardNumbers.map(e=>e+'D'),
        //     club:cardNumbers.map(e=>e+'C')
        // }
        // newArr.push(...newObj.heart,...newObj.spade,...newObj.diamond,...newObj.club)
        // let suffleArr=newArr.sort(()=>Math.random()-0.5)
        // setMainDrawCards(suffleArr)
    },[])

    let carClassFun=(e)=>{
        if(e[1]==='H'||e[1]==='D') return 'redCard'
        else return 'blackCard'
    }
    
    let pushFiveFunc=()=>{
        if(DisplayCard.length>50){
            message.warning('all 52 cards drawn from the deck')
        }else{
            let pushCard=[]
            pushCard.push(...MainDrawCards)
            let sliceArr=pushCard.slice(0,5)
            let remainingCards=MainDrawCards.filter(e=>!sliceArr.includes(e))
            setMainDrawCards(remainingCards)
            setDisplayCard([ ...sliceArr,...DisplayCard])
        }
    }

    let removeCardFunc=(e)=>{
        let pushToMain=[]
        pushToMain.push(e)
        let newArr=[ ...pushToMain,...MainDrawCards]
        let suffleArr=newArr.sort(()=>Math.random()-0.5)
        setMainDrawCards(suffleArr)
        let removeCards=DisplayCard.filter(ele=>ele!==e)
        setDisplayCard(removeCards)
        if(DisplayCard.length===1){
            message.warning('cards are empty, please draw cards')
        }
    }

    return(
        <div id="mainDisplayDiv">
            <section>
                <article>
                    <main className="drawCardDiv">
                        <button onClick={pushFiveFunc}>Draw card</button>
                    </main>
                    <main className="displayCardsDiv">
                        {DisplayCard.map((e,i)=>{
                            return(
                                <div key={i} className="individualCard" onClick={()=>removeCardFunc(e)}>
                                    <div className={carClassFun(e)}>
                                        <aside>
                                            {
                                            e[0]=='0'? '10' : e[0]
                                            }
                                        </aside>
                                        <aside className="figureOfCard">
                                            {
                                            (e[1]==='H' ? <BsSuitHeartFill/> :
                                            e[1]==='D' ? <BsSuitDiamondFill/> :
                                            e[1]==='S' ? <BsSuitSpadeFill/> :
                                            e[1]==='C' ? <BsSuitClubFill/> : '')
                                            }
                                        </aside>
                                    </div>
                                </div>
                            )
                        })}
                    </main>
                </article>
            </section>
        </div>
    )

}

export default AllCards