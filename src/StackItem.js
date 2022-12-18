import { useEffect, useRef } from "react";

function StackItem({value,IsTop,topRef,DragEnd})
{
    const ItemRef = useRef();

    function AnimationEnd()
    {
        topRef && topRef.current.setAttribute("state","mounted");
    }

    // useEffect(()=>{
    //     console.log("mounted value: " + value);
    //     return () => {
    //         console.log("unmounted value: " + value);
    //     };
    // },[value]);

    return(
        <div className="stack-item flex-center" 
        draggable={IsTop}
        state={IsTop!=="false" ? "mounting" : "mounting"}
        // addedonce="false"
        onDragEnd={DragEnd}
        onAnimationEnd={AnimationEnd}
        ref={topRef}>
            <div className="stack-item-background"></div>
            {value}
        </div>
    )
}

export default StackItem;