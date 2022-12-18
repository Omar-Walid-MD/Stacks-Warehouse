import {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import StackItem from "./StackItem";

function Stack({stack, stackData, setStackData,PopStack,lock,setOperationWindow,setOptionsWindow})
{

    const [tr,il8n] = useTranslation();

    const [pushValue,setPushValue] = useState("");

    const [stackLabel,setStackLabel] = useState(tr("stackNames."+stack.label));

    const topItemRef = useRef();

    // const [stackMax,setStackMax] = useState(stack.max);

    const stackRef = useRef();

    const [buttonLock,setButtonLock] = useState(false);

    function lockButtons()
    {
        console.log("locked");
        setButtonLock(true);
        setTimeout(() => {
            console.log("unlocked");
            setButtonLock(false);
        }, 100);
    }

    function handlePushValue(event)
    {
        setPushValue(event.target.value);
    }

    function handleStackLabel(event)
    {
        setStackLabel(event.target.value);
    }

    function handleStackMax(event)
    {
        if(event.target.value >= stack.items.length)
        {
            let updatedStack = {
                ...stack,
                max: event.target.value
            }
    
            setStackData(prev => prev.map((stackInList) => stackInList.id===updatedStack.id ? updatedStack : stackInList));
        }

    }

    function GetStackItems()
    {
        // console.log(stackData);
        return stack ? stack.items : [];
    }

    function push(targetId,pushValue)
    {
        let targetStack = stackData.filter((stackInList)=> stackInList.id===targetId)[0];
        
        if(targetStack.items.length<targetStack.max && pushValue)
        {

            let updatedStack = {
                ...targetStack,
                items: [...targetStack.items, parseFloat(pushValue)],
            }
            
            setStackData(prev => prev.map((stackInList) => stackInList.id===updatedStack.id ? updatedStack : stackInList));
            setPushValue("");

        }


        // console.log(stackData);
    }

    function pop()
    {
        if(GetStackItems().length>0)
        {
            let updatedStack = {
                ...stack,
                items: stack.items.slice(0,stack.items.length-1)
            };

            // console.log(getComputedStyle(topItemRef.current).animationDuration.slice(0,-1));
            topItemRef.current.setAttribute("state","unmounted");
            
            setTimeout(() => {

                console.log("unmounted");

                if(GetStackItems().length>0)
                setStackData(prev => prev.map((stackInList)=> stackInList.id===updatedStack.id ? updatedStack : stackInList));
                
            }, getComputedStyle(topItemRef.current).animationDuration.slice(0,-1)*1000-50); //50 ms margin to avoid glitching due to slight mismatch between transitionEnd and setTimeout
        }

        

    }

    function PushByEnter(event, targetId)
    {
        if(event.which===13 && event.target.value!=="") push(targetId,event.target.value)
    }

    function top()
    {
        return stack.items[stack.items.length-1] || 0;
    }

    function IsTop(index)
    {
        return index===GetStackItems().length-1 ? true : false;
    }

    function DragEnd(event)
    {
        for (let i = 0; i < stackData.length; i++) {
            const stackInList = stackData[i];
            // console.log(stackInList.ref);
            // console.log(IsOverlapping(event,stackInList.ref.getBoundingClientRect()));
            console.log("Event: " + event.pageX);
            console.log(stackInList.ref.getBoundingClientRect()); 
            if(IsOverlapping(event,stackInList.ref.getBoundingClientRect())&&stackInList.id!==stack.id&&stackInList.items.length<stackInList.max)
            {
                // console.log("should push");
                let topVal = top();
                push(stackInList.id,topVal);
                pop();
                return;
            }
            
        }

    }

    function IsOverlapping(event,rect)
    {
        return (event.pageX > rect.left &&
                event.pageX < rect.right &&
                event.pageY > rect.top &&
                event.pageY < rect.bottom);
    }

    function makeId(length)
    {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
    }

    useEffect(()=>{
        if(!stack.ref && stackData)
        {
            let updatedStack = {
                ...stack,
                ref: stackRef.current
            }
            setStackData(stackData.map((stackInList)=> stackInList===stack ? updatedStack : stackInList));
        }
    },[stackData]);

    // console.log(stack && stack);

    return (
        <div className="stack-container flex-center" ref={stackRef} id={stack && stack.id}>
            <div className="stack-handle"></div>
            <div className="stack-background" style={{backgroundPosition: "0 " + (320 - 320/10*stack.max) + "px"}}></div>
            <div className="stack-base"></div>
            <div className="stack-size-slider-container flex-center">
                <div className="stack-size-slider-label" style={{top: 5 + (320 - 320/10*stack.max) + "px"}}>{stack.max}</div>
                {
                    !lock &&
                    <input className="stack-size-slider" type="range" min="1" max="10" step="1" value={stack.max} onChange={handleStackMax} />
                }
            </div>
            <input className="stack-label" maxLength={12} readOnly={lock ? true : false} value={stackLabel} onChange={handleStackLabel} />
            <div className="stack-content">
            {
                GetStackItems().slice().map((n,index)=>
                <StackItem value={n} IsTop={!lock ? IsTop(index) : "false"} topRef={IsTop(index) ? topItemRef : null} key={"stack-item-"+index} DragEnd={!lock ? DragEnd : undefined} />
                )
            }
            </div>
            {
                (!lock || stackLabel===tr("stackNames."+lock.variable)) &&
                <div className="stack-top-buttons flex-column">
                    <input className="stack-push-input" type="number" placeholder={tr("pushValue")} value={pushValue} onChange={handlePushValue} onKeyDown={function(event){PushByEnter(event,stack.id)}} />
                    <div className="flex-row">
                        <button className="stack-button push-button flex-center" onClick={function(){if(!buttonLock){push(stack.id,pushValue);lockButtons();}}}><i className='bx bx-down-arrow-circle'></i></button>
                        <button className="stack-button pop-button flex-center" onClick={function(){if(!buttonLock){pop(stack.id);lockButtons();}}}><i className='bx bx-up-arrow-circle' ></i></button>
                    </div>
                </div>
            }
            {
                !lock &&
                <div className="stack-bottom-buttons flex-row">
                {
                    stack.items.length > 0 &&
                    <button className="stack-button flex-center" onClick={function(){setOptionsWindow(stack)}}><i className='bx bx-abacus'></i></button>
                }
                {
                    stackData.length > 1 &&
                    <button className="stack-button delete-button flex-center" onClick={function(){PopStack(stack.id)}}>
                        <i className='bx bx-x-circle'></i>
                    </button>
                }
                </div>
            }
            <div>
                
            </div>
        </div>
    )
}

export default Stack;