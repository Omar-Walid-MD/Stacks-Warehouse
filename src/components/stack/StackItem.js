import { useEffect, useRef } from "react";

import "../../styles/Stack.css";

function StackItem({value,IsTop,topRef,DragEnd})
{

    function AnimationEnd()
    {
        topRef && topRef.current.setAttribute("state","mounted");
    }

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