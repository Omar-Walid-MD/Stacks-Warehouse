import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Stack from "../stack/Stack";
import StackOperation from "../stack/StackOperations";

import "../../styles/Windows.css";

//Operation Window where operation is carried out on stack
function OperationWindow({operation, setOperation})
{
    const [tr,il8n] = useTranslation();

    const [stackData,setStackData] = useState();

    const [playState,setPlayState] = useState("ready");

    const [intervalId,setIntervalId] = useState();

    const [currentStep,setCurrentStep] = useState("");

    const [stepProgress,setStepProgress] = useState(0);

    const resetButton = useRef();

    const [varItems,setVarItems] = useState([]);

    const [newFilter,setNewFilter] = useState("");
    const [newFilterBool,setNewFilterBool] = useState("and");

    const [filters,setFilters] = useState([]);

    function PrepareStacks(operationType)
    {
        if(operationType==="sortAsc" || operationType==="sortDesc")
        {
            return [
                NewStack(operation.input,10,"input"),
                NewStack([],10,"output"),
                NewStack([],1,"temp")
            ];
        }
        else if(operationType==="move" || operationType==="filter")
        {
            return [
                NewStack(operation.input,10,"input"),
                NewStack([],10,"output"),
                NewStack([],10,"temp")
            ];
        }
        else if(operationType==="reverse")
        {
            return [
                NewStack(operation.input,10,"input"),
                NewStack([],10,"second"),
                NewStack([],10,"third")
            ];
        }
        else if(operationType==="append")
        {
            return [
                NewStack(operation.input,10,"input"),
                NewStack([],10,"temp"),
                NewStack(varItems,10,"variable")
            ];
        }
        else if(operationType==="union")
        {
            return [
                NewStack(operation.input,10,"input"),
                NewStack(varItems,10,"variable"),
                NewStack([],10,"temp"),
                NewStack([],10,"temp2"),
                NewStack([],10,"output"),
            ]
        }
    }

    function OperationTitle(operation)
    {
        return tr(operation.type);
    }

    function NewStack(items=[],max=10,label="Stack")
    {
        return {
            id: makeId(5),
            ref: null,
            items: items,
            max: max,
            label: label
          };
    }

    function ResetStacks()
    {
        setStackData(PrepareStacks(operation.type));
        setPlayState("ready");
        setCurrentStep();
        clearInterval(intervalId);
    }

    function handleVarItems(stackData)
    {
        let variableStack = stackData.filter((stackInList)=>stackInList.label===operation.variable)[0];
        setVarItems(variableStack.items);
        console.log(variableStack);
    }


    function StepText(currentStep)
    {
        if(currentStep)
        {
            if(currentStep.step===0)
            {
                return `${tr("step-0.0")} (${currentStep.numbers[0]}) ${tr("step-0.1")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step===1)
            {
                return `${tr("step-1.0")} (${currentStep.numbers[0]}) ${tr("step-1.1")} (${currentStep.numbers[1]}) ${tr("step-1.2")} (${currentStep.numbers[0]}) ${tr("step-1.3")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step===2)
            {
                return `${tr("step-2.0")} (${currentStep.numbers[0]}) ${tr("step-2.1")} (${currentStep.numbers[1]}) ${tr("step-2.2")} (${currentStep.numbers[0]}) ${tr("step-2.3")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step===3)
            {
                return `${tr("step-3.0")} (${currentStep.numbers[0]}) ${tr("step-3.1")} (${currentStep.numbers[1]}) ${tr("step-3.2")} (${currentStep.numbers[0]}) ${tr("step-3.3")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step===4)
            {
                return `${tr("step-4.0")} (${currentStep.numbers[0]}) ${tr("step-4.1")} (${currentStep.numbers[0]}) ${tr("step-4.2")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step===5)
            {
                return `${tr("step-5.0")} (${currentStep.numbers[0]}) ${tr("step-5.1")} (${currentStep.numbers[0]}) ${tr("step-5.2")} "${tr("stackNames."+currentStep.stacks[0])}"`;
            }
            else if(currentStep.step==="done")
            {
                return tr("step-done");
            }
        }
    }

    function handleNewFilter(event)
    {
        setNewFilter(event.target.value);
    }

    function toggleFilterBool(filterBool)
    {
        if(!filterBool || filterBool==="and")
        {
            setNewFilterBool("or");
        }
        else if(filterBool==="or")
        {
            setNewFilterBool("and");
        }
    }

    function CheckFilter(filterValue)
    {
        let conditionBools = ["==","!=",">",">=","<","<="];

        let f = false
        for (let i = 0; i < conditionBools.length; i++) {
            const b = conditionBools[i];

            if(filterValue.includes(b)) f = true;
        }
        if(!f) return false;

        try
        {
            let x = 0;
            eval("x"+filterValue);
        }
        catch (EvalError)
        {
            return false;
        }
        return true;
    }

    function AddFilter(filterValue,filterBool,filters)
    {
        let newFilter = {
            id: makeId(5),
            value: filterValue,
            bool: filters.length > 0 ? filterBool : ""
        }
        if(filters.length <= 4 && filterValue!=="" && CheckFilter(filterValue))
        {
            setFilters(prev => [...prev,newFilter]);
            setNewFilter("");
        }
    }
   
    function RemoveFilter(filterId)
    {
        setFilters(prev => prev.filter((filter)=>filter.id!==filterId));
    }

    //Applies changes to variable stack if avaialable
    useEffect(()=>{
       stackData && operation.variable && playState==="ready" && handleVarItems(stackData);
    },[stackData])


    useEffect(()=>{
        setStackData(PrepareStacks(operation.type));
    },[]);


    //Closes window by pressing Escape and removes the event listener when component unmounts
    useEffect(()=>{

        window.onkeydown = function(event){if(event.key === "Escape"){resetButton.current.click();setOperation(null);}};

        return function()
        {
            window.onkeydown = null;
        }

    },[]);


    function makeId(length)
    {
        let result = "";
        let chars = "123456789";
        for (var i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 9)];
        }
        return result;
    }

    return (
        <div className="window-overlay flex-center">
            <div className="operation-window-container flex-center">
                <img className="page-background-img" src={require("../../img/background.png")}/>
                <div className="page-column flex-column">
                    <div className="operation-window-header flex-column">
                        <div className="page-title">{OperationTitle(operation)}</div>
                        <div className="step-label">{StepText(currentStep)}</div>
                        {
                            stepProgress > 0 && currentStep &&
                            <div className="step-progress-bar">
                                <div className="step-progress" style={{width: stepProgress*100 + "%"}}></div>
                            </div>
                        }
                    </div>
                    <div className="stack-shelf flex-center">
                    {
                        stackData && stackData.map((stack)=>
                        <Stack stack={stack} stackData={stackData} setStackData={setStackData} lock={operation ? playState!=="ready" ? {...operation,variable: null} : operation : operation} key={"stack-"+stack.id} />
                        )
                    }
                    </div>
                </div>
                <div className="operation-window-panel">
                    <div className="operation-window-panel-label flex-column">{tr("operationPanel")}</div>
                    <div className="operation-window-panel-button-group flex-row">
                        <button className="operation-window-panel-button flex-center" disabled={playState==="done" || operation.variable && varItems.length===0} onClick={function(){StackOperation(operation,stackData,setStackData,filters,false); setPlayState("done");  }}><i className='bx bx-play-circle'></i><p className="button-label">{tr("operationPlay")}</p></button>
                        <button className="operation-window-panel-button flex-center" disabled={playState==="done" || operation.variable && varItems.length===0} onClick={function(){StackOperation(operation,stackData,setStackData,filters,true,setIntervalId,setCurrentStep,setStepProgress); setPlayState("done");  }}><i className='bx bx-slideshow'></i><p className="button-label">{tr("operationShowSteps")}</p></button>
                        <button className="operation-window-panel-button flex-center" disabled={playState!=="done"} onClick={ResetStacks} ref={resetButton}><i className='bx bx-reset'></i><p className="button-label">{tr("operationReset")}</p></button>
                    </div>
                </div>
                {
                    operation.type==="filter" &&
                    <div className="operation-filter-panel">
                        {
                            playState==="ready" &&
                            <div className="operation-filter-input-container flex-row">
                                {
                                    filters.length > 0 &&
                                    <button className="operation-filter-bool-option operation-filter-button flex-center" onClick={function(){toggleFilterBool(newFilterBool)}}>{tr(newFilterBool+"Filter")}</button>

                                }
                                <input className="operation-filter-input" type="text" placeholder={tr("addFilter")} maxLength="7" value={newFilter} onChange={handleNewFilter} onKeyDown={function(event){if(event.which===13)AddFilter(event.target.value,newFilterBool,filters)}} />
                                <button className="operation-filter-add operation-filter-button" onClick={function(){AddFilter(newFilter,newFilterBool,filters)}}><i className='bx bx-plus'></i></button>
                            </div>
                        }
                        {
                            filters.length > 0 &&
                            <div className="operation-filter-panel-filters">
                            {
                                filters.map((filter)=>
                                <div className="operation-filter-container flex-row"><div className="operation-filter-text">
                                    <div className="operation-filter-value flex-center">
                                        {filter.bool && tr(filter.bool+"Filter")} x{filter.value}
                                    </div>
                                </div>
                                {
                                    playState==="ready" &&
                                    <button className="operation-filter-delete operation-filter-button flex-center" onClick={function(){RemoveFilter(filter.id)}}><i className='bx bx-x'></i></button>
                                }
                                </div>
                                )
                            }
                            </div>
                        }
                    </div>
                }
                <button className="operation-window-close-button flex-center" onClick={function(){resetButton.current.click();setOperation(null)}}><i className='bx bx-x'></i></button>
            </div>
        </div>
    )
}

export default OperationWindow;