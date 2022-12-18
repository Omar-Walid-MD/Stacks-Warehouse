import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Stack from "./Stack";
import OperationWindow from "./OperationWindow";
import "./App.css"
import i18next from "i18next";

function MainPage()
{
    const [tr,il8n] = useTranslation();

    const [stackData, setStackData] = useState([NewStack([],10)]);

    const [operationWindow,setOperationWindow] = useState();
    const [optionsWindow,setOptionsWindow] = useState(null);
    const [infoWindow,setInfoWindow] = useState(false);

    function NewStack(items=[],max=10,label="stack")
    {
        return {
            id: makeId(5),
            ref: null,
            items: items,
            max: max,
            label: label
          };
    }
  
    function PopStack(stackId)
    {
      setStackData(prev => prev.filter((stackInList)=> stackInList.id!==stackId))
    }
  
    function PushStack()
    {
      if(stackData.length<5)
      {
        let newStack = {
          id: makeId(5),
          ref: null,
          items: [],
          max: 10,
          label: "stack"
        };
        setStackData(prev => [...prev,newStack]);
      }
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
      if(operationWindow)
      {
        setOptionsWindow(null);
      }
    },[operationWindow]);

    useEffect(()=>{
      if(infoWindow)
      {
        window.onkeydown = function(event){console.log("yes"); if(event.key==="Escape") setInfoWindow(false)}
      }
      else
      {
        window.onkeydown = null;
      }
    },[infoWindow])

    return (
        <div className="page-container flex-center" lng={i18next.language} onKeyDown={function(event){if(event.key === "Escape")setOperationWindow(null);}}>
          <div className="outer-background"></div>
          <img className="page-background" src={require("./img/background.png")}/>
          <div className="page-inner-frame flex-center">
            <div className="page-column flex-column">
                <div className="page-header flex-center">
                  <div className="page-title">{tr("pageTitle")}</div>
                </div>
              <div className="stack-shelf flex-center">
                {
                  stackData.map((stack)=>
                  <Stack stack={stack} stackData={stackData} setStackData={setStackData} PopStack={PopStack} setOperationWindow={setOperationWindow} setOptionsWindow={setOptionsWindow} key={"stack-"+stack.id} />
                  )
                }
                {
                  stackData.length < 5 &&
                  <button className="stack-button add-button flex-center" onClick={function(){PushStack()}}>
                    <i className='bx bx-plus-circle'></i>
                  </button>
                }
              </div>
              {/* {
                  operation && operation.type === "sort" &&
                  <button onClick={function(){SimpleStackSort(stackData,setStackData,true)}}>Start Sort</button>
              } */}
            </div>
            <button className="info-open-button operation-window-panel-button flex-center" onClick={function(){setInfoWindow(true)}}><i className='bx bx-info-circle'></i></button>
          </div>
          <div className="page-footer flex-center">
            <p className="page-footer-credits flex-row">
              {tr("footer")}
              <a href="https://github.com/Omar-Walid-MD" target="_blank" className='bx bxl-github page-footer-github-link'></a>
            </p>
            <div className="page-footer-language flex-center">
              <i className='bx bx-globe'></i>
              <div className="page-footer-language-buttons-container flex-column">
                <button className="page-footer-language-button" onClick={function(){il8n.changeLanguage("ar")}}>{tr("lng.ar")}</button>
                <button className="page-footer-language-button" onClick={function(){il8n.changeLanguage("en")}}>{tr("lng.en")}</button>
              </div>
            </div>
          </div>
          {
            optionsWindow &&
            <OptionsWindow stack={optionsWindow} operation={operationWindow} setOptionsWindow={setOptionsWindow} setOperationWindow={setOperationWindow} />
          }
          {
            operationWindow &&
            <OperationWindow operation={operationWindow} setOperationWindow={setOperationWindow}  />
          }
        {
          infoWindow &&
          <div className="info-window-overlay window-overlay flex-center">
            <div className="info-window-container">
              <div className="info-window-content">

                <h1>{tr("pageTitle")}</h1>
              
                <h2>{tr("info.s1")}</h2>
                <div className="info-window-indent">
                  <p>{tr("info.s1-1")}</p>
                  <p>{tr("info.s1-2")}</p>
                  <p>{tr("info.s1-3")}</p>
                </div>
                <br></br>
                <h2>{tr("info.s2")}</h2>
                <div className="info-window-indent">
                  <h3>{tr("info.s2-1")}</h3>
                  <p className="info-window-indent">{tr("info.s2-2")}</p>
                  <h3>{tr("info.s2-3")}</h3>
                  <p className="info-window-indent">{tr("info.s2-4")}</p>
                  <h3>{tr("info.s2-5")}</h3>
                  <p className="info-window-indent">{tr("info.s2-6")}</p>
                  <h3>{tr("info.s2-7")}</h3>
                  <p className="info-window-indent">{tr("info.s2-8")}</p>
                  <h3>{tr("info.s2-9")}</h3>
                  <p className="info-window-indent">{tr("info.s2-10")}</p>
                  <h3>{tr("info.s2-11")}</h3>
                  <p className="info-window-indent">{tr("info.s2-12")}</p>
                </div>
                <br></br>
                <h2>{tr("info.s3")}</h2>
                <div className="info-window-indent">
                  <p>{tr("info.s3-1")}</p>
                  <ul>
                    <li>{tr("info.s3-2")}</li>
                    <li>{tr("info.s3-3")}</li>
                    <li><b>{tr("info.s3-4")}</b></li>
                    <li>{tr("info.s3-5")}</li>
                    <li>{tr("info.s3-6")}</li>
                    <li>{tr("info.s3-7")}</li>
                  </ul>

                  <h3>{tr("info.s3-8")}</h3>
                  <div className="info-window-indent">
                    <p>{tr("info.s3-9")}</p>
                    <p>{tr("info.s3-10")}</p>
                    <ul>
                      <li>{tr("info.s3-11")}</li>
                      <li>{tr("info.s3-12")}</li>
                      <li>{tr("info.s3-13")}</li>
                      <li>{tr("info.s3-14")}</li>
                    </ul>
                  </div>
                  <h3>{tr("info.s3-15")}</h3>
                  <div className="info-window-indent">
                  <p>{tr("info.s3-16")}</p>
                  <ul>
                    <li>{tr("info.s3-17")}</li>
                    <li>{tr("info.s3-18")}</li>
                    <li>{tr("info.s3-19")}</li>
                  </ul>
                  <p>{tr("info.s3-20")}</p>
                  <p>{tr("info.s3-21")}</p>
                  </div>
                </div>
              </div>
              <button htmlFor="info-button" className="info-window-close-button flex-center" onClick={function(){setInfoWindow(false)}}><i className='bx bx-x'></i></button>
            </div>
          </div>
         }
        </div>
      );
}




function OptionsWindow({stack,operation,setOptionsWindow,setOperationWindow})
{
  const [tr,il8n] = useTranslation();

  let startedOperation = false;

  function StackOperation(type)
  {
      let operationObject = {
          type: type,
          input: stack.items
      };

      if(type==="append"||type==="union")
      {
        operationObject.variable = "variable"
      }
      
      return operationObject;
  }

  function StartOperation(type)
  {
    startedOperation = true;
    setOperationWindow(StackOperation(type));
  }

  

  useEffect(()=>{

    window.onkeydown = function(event){if(event.key === "Escape") setOptionsWindow(null);};

    return function()
    {
      if(!startedOperation) window.onkeydown = null;
    }

},[]);

  return (
  <div className="window-overlay flex-center">
    <div className="options-window-container flex-column">
      <h1 className="options-window-title">{tr("stackOperations")}</h1>
      <div className="options-window-content flex-row">
        <div className="options-window-stack-preview">
          {
            <Stack stack={stack} lock={true}/>
          }
        </div>
        <div className="options-window-option-panel flex-column">

          <div className="options-window-option-panel-row flex-row">
            {tr("sort")}:
            <div className="buttons-row flex-row">
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("sortAsc")}}><i className='bx bx-sort-up'></i></button>
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("sortDesc")}}><i className='bx bx-sort-down'></i></button>
            </div>
          </div>

          <div className="options-window-option-panel-row flex-row">
            {tr("append")}:
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("append")}}><i className='bx bx-layer-plus'></i></button>
          </div>

          <div className="options-window-option-panel-row flex-row">
            {tr("move")}:
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("move")}}><i className='bx bxs-arrow-from-left'></i></button>
          </div>

          <div className="options-window-option-panel-row flex-row">
            {tr("reverse")}:
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("reverse")}}><i className='bx bx-sort-alt-2'></i></button>
          </div>

          <div className="options-window-option-panel-row flex-row">
            {tr("union")}:
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("union")}}><i className='bx bx-unite'></i></button>
          </div>

          <div className="options-window-option-panel-row flex-row">
            {tr("filter")}:
              <button className="operation-window-panel-button flex-center" onClick={function(){StartOperation("filter")}}><i className='bx bx-filter-alt'></i></button>
          </div>
        </div>
      </div>
      <button className="operation-window-close-button flex-center" onClick={function(){setOptionsWindow(null)}}><i className='bx bx-x'></i></button>
    </div>
  </div>)
}

export default MainPage;