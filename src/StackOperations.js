

function StackOperation(operation,stackData,setStackData,filters,withSteps,setIntervalId,setCurrentStep,setStepProgress)
{
    let stepInterval = 2000;
    let stepArray = [];

    let tempData = stackData;

    function rerender()
    {
        setStackData(tempData);
    }

    console.log(stackData);

    function pop(label)
    {
        let targetStack = tempData.filter((stackInList)=>stackInList.label===label)[0];
        
        targetStack = {
            ...targetStack,
            items: targetStack.items.slice(0,targetStack.items.length-1)
        }
        tempData = tempData.map((stackInList)=> stackInList.id===targetStack.id ? targetStack : stackInList);
    }

    function push(label,pushValue)
    {
        let targetStack = tempData.filter((stackInList)=>stackInList.label===label)[0];

        targetStack = {
            ...targetStack,
            items: [...targetStack.items,pushValue]
        }
        tempData = tempData.map((stackInList)=> stackInList.id===targetStack.id ? targetStack : stackInList);
    }

    function top(label)
    {
        let targetStack = tempData.filter((stackInList)=>stackInList.label===label)[0];
        return targetStack.items[targetStack.items.length-1];
    }

    function empty(label)
    {
        let targetStack = tempData.filter((stackInList)=>stackInList.label===label)[0];
        return targetStack.items.length === 0;
    }

    function addStep(step,desc)
    {
        if(withSteps) stepArray.push({
            step: step,
            desc: desc
        });
    }               

    function showSteps(seconds)
    {
        let i = 0;
        let size = stepArray.length;
        let interval = setInterval(() => {
            if(i===0)
            {
                setIntervalId(interval);
            }
            if(i<size)
            {
                eval(stepArray[i].step);
                setCurrentStep(stepArray[i].desc);
                setStepProgress((i+1)/size);
                i++;
                rerender();
            }
            else
            {
                console.log("Done");
                setCurrentStep({step:"done"});
                clearInterval(interval);
            }
            
        }, seconds);
    }

    function sortAsc()
    {
        while(!empty("input"))
        {
            addStep("push(\"temp\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["temp"]});

            push("temp",top("input"));
            pop("input");
    
    
            while(!empty("output") && top("output") > top("temp"))
            {
                addStep("push(\"input\",top(\"output\"));pop(\"output\");",
                top("output") > top("temp")
                ? {step:1,numbers:[top("output"),top("temp")],stacks:["input"]}
                : {step:0,numbers:[top("Ouput")],stacks:["input"]});

                push("input",top("output"));
                pop("output");
    
            }

            addStep("push(\"output\",top(\"temp\"));pop(\"temp\");",{step:0,numbers:[top("temp")],stacks:["output"]});
    
            push("output",top("temp"));
            pop("temp");
        }
    }

    function sortDesc()
    {
        while(!empty("input"))
        {
            addStep("push(\"temp\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["temp"]});

            push("temp",top("input"));
            pop("input");
    
            while(!empty("output") && top("output") < top("temp"))
            {
                addStep("push(\"input\",top(\"output\"));pop(\"output\");",
                top("output") < top("temp")
                ? {step:2,numbers:[top("output"),top("temp")],stacks:["input"]}
                : {step:0,numbers:[top("Ouput")],stacks:["input"]});

                push("input",top("output"));
                pop("output");
            }

            addStep("push(\"output\",top(\"temp\"));pop(\"temp\");",{step:0,numbers:[top("temp")],stacks:["output"]});

            push("output",top("temp"));
            pop("temp");    
        }
    }

    function move()
    {
        while(!empty("input"))
        {
            addStep("push(\"temp\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["temp"]});

            push("temp",top("input"));
            pop("input");
        }
        while(!empty("temp"))
        {
            addStep("push(\"output\",top(\"temp\"));pop(\"temp\");",{step:0,numbers:[top("temp")],stacks:["output"]});

            push("output",top("temp"));
            pop("temp");
        }
    }

    function reverse()
    {

        while(!empty("input"))
        {
            addStep("push(\"second\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["second"]});

            push("second",top("input"));
            pop("input");
        }
        while(!empty("second"))
        {
            addStep("push(\"third\",top(\"second\"));pop(\"second\");",{step:0,numbers:[top("second")],stacks:["third"]});

            push("third",top("second"));
            pop("second");
        }
        while(!empty("third"))
        {
            addStep("push(\"input\",top(\"third\"));pop(\"third\");",{step:0,numbers:[top("third")],stacks:["input"]});

            push("input",top("third"));
            pop("third");
        } 
    }

    function append()
    {
        while(!empty("variable"))
        {
            addStep("push(\"temp\",top(\"variable\"));pop(\"variable\");",{step:0,numbers:[top("variable")],stacks:["temp"]});

            push("temp",top("variable"));
            pop("variable");
        }
        while(!empty("temp"))
        {
            addStep("push(\"input\",top(\"temp\"));pop(\"temp\");",{step:0,numbers:[top("temp")],stacks:["input"]});

            push("input",top("temp"));
            pop("temp");
        }
    }

    function union()
    {
        while(!empty("variable"))
        {
            addStep("push(\"temp2\",top(\"variable\"));pop(\"variable\");",{step:0,numbers:[top("variable")],stacks:["temp2"]});

            push("temp2",top("variable"));
            pop("variable");

            while(!empty("input") && top("input")!==top("temp2"))
            {
                addStep("push(\"temp\",top(\"input\"));pop(\"input\");",
                top("input")!==top("temp2")
                ? {step:3,numbers:[top("input"),top("temp2")],stacks:["temp"]}
                : {step:0,numbers:[top("input")],stacks:["temp"]});

                push("temp",top("input"));
                pop("input");
            }

            if(!empty("input"))
            {
                addStep("push(\"output\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["output"]});

                push("output",top("input"));
                pop("input");
            }
            
            while(!empty("temp"))
            {
                addStep("push(\"input\",top(\"temp\"));pop(\"temp\");",{step:0,numbers:[top("temp")],stacks:["input"]});

                push("input",top("temp"));
                pop("temp");
            }

        }

        while(!empty("temp2"))
        {
            addStep("push(\"variable\",top(\"temp2\"));pop(\"temp2\");",{step:0,numbers:[top("temp2")],stacks:["variable"]});

            push("variable",top("temp2"));
            pop("temp2");
        }
    }

    function filter()
    {
        let filterCondition = "";

        for (let i = 0; i < filters.length; i++) {
            const f = filters[i];

            let bool = f.bool==="and" ? "&&" : f.bool==="or" ? "||" : ""
            filterCondition += bool + "x" + f.value;
            
        }

        console.log(filterCondition);

        while(!empty("input"))
        {
            addStep("push(\"temp\",top(\"input\"));pop(\"input\");",{step:0,numbers:[top("input")],stacks:["temp"]});

            push("temp",top("input"));
            pop("input");   
        }
        while(!empty("temp"))
        {
            let x = top("temp");

            if(eval(filterCondition))
            {
                addStep("push(\"output\",top(\"temp\"));pop(\"temp\");",{step:4,numbers:[top("temp")],stacks:["output"]});

                push("output",top("temp"));
            }
            else
            {
                addStep("push(\"input\",top(\"temp\"));pop(\"temp\");",{step:5,numbers:[top("temp")],stacks:["input"]});

                push("input",top("temp"));
            }
            pop("temp");
        }
    }

    operation.type==="sortAsc"
    ? sortAsc()
    : operation.type==="sortDesc"
    ? sortDesc()
    : operation.type==="move"
    ? move()
    : operation.type==="reverse"
    ? reverse()
    : operation.type==="append"
    ? append()
    : operation.type==="union"
    ? union()
    : operation.type==="filter"
    && filter();


    if(withSteps)
    {
        tempData = stackData;
        showSteps(stepInterval);
    }
    else rerender();

}

export default StackOperation;