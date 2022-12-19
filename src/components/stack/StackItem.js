import { useEffect, useRef } from "react";

import "../../styles/Stack.css";

function StackItem({value,IsTop,topRef,DragEnd})
{

    function AnimationEnd()
    {
        topRef && topRef.current.setAttribute("state","mounted");
    }

    // useEffect(()=>{
    //     if(IsTop && topRef)
    //     {
    //         // topRef.current.onDragOver = function(event){event.preventDefault();event.dataTransfer.dropEffect = "copy";};
    //         // topRef.current.onDragEnter = function(event){event.preventDefault();};
    //         document.addEventListener("dragover", (event) => {
    //             event.preventDefault();
    //             event.dataTransfer.dropEffect = "copy";
    //         });
    //     }
    // },[topRef])

    return(
        <div className="stack-item flex-center" 
        draggable={IsTop}
        state={IsTop!=="false" ? "mounting" : "mounting"}
        onMouseUp={()=>{console.log("yes");}}
        onDragEnd={DragEnd}
        onAnimationEnd={AnimationEnd}
        ref={topRef}>
            <div className="stack-item-background"></div>
            {value}
        </div>
    )
}

export default StackItem;