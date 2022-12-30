import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Stack from "./stack/Stack";
import OperationWindow from "./windows/OperationWindow";
import OptionsWindow from "./windows/OptionsWindow";
import InfoWindow from "./windows/InfoWindow";
import i18next from "i18next";

import "../styles/MainPage.css"

//App Page
function MainPage()
{
    const [tr,il8n] = useTranslation();

    const [stackData, setStackData] = useState([NewStack([],10)]);

    const [operation,setOperation] = useState();
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

    //Closes Options Window when opening Operations Window
    useEffect(()=>{
      if(operation)
      {
        setOptionsWindow(null);
      }
    },[operation]);

    //Setting the drag cursor
    useEffect(()=>{

      document.addEventListener("dragover", (event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = "link";
      });

    },[])

    return (
        <div className="page-container flex-center" lng={i18next.language} onKeyDown={function(event){if(event.key === "Escape")setOperation(null);}}>
          <div className="outer-background"></div>
          <div className="page-inner-frame flex-center">
            <img className="page-background-img" src={require("../img/background.png")}/>
            <div className="page-column flex-column">
              <div className="page-header flex-center">
                <div className="page-title">{tr("pageTitle")}</div>
              </div>
              <div className="stack-shelf flex-center">
                {
                  stackData.map((stack)=>
                  <Stack stack={stack} stackData={stackData} setStackData={setStackData} PopStack={PopStack} setOperation={setOperation} setOptionsWindow={setOptionsWindow} key={"stack-"+stack.id} />
                  )
                }
                {
                  stackData.length < 5 &&
                  <button className="stack-button add-button flex-center" onClick={function(){PushStack()}}>
                    <i className='bx bx-plus-circle'></i>
                  </button>
                }
              </div>
            </div>
            <button className="info-open-button operation-window-panel-button flex-center" onClick={function(){setInfoWindow(true)}}><i className='bx bx-info-circle'></i></button>
          </div>
          <div className="page-footer flex-center">
            <p className="page-footer-credits flex-row">
              {tr("footer")}
              <a href="https://github.com/Omar-Walid-MD" target="_blank" rel="noreferrer" className='bx bxl-github page-footer-github-link'></a>
            </p>
            <div className="page-footer-language flex-center">
              <i className='bx bx-globe'></i>
              <div className="page-footer-language-buttons-container flex-column">
                <button className="page-footer-language-button" onClick={function(){il8n.changeLanguage("ar")}}>العربية</button>
                <button className="page-footer-language-button" onClick={function(){il8n.changeLanguage("en")}}>English</button>
              </div>
            </div>
          </div>
          {
            optionsWindow &&
            <OptionsWindow stack={optionsWindow} operation={operation} setOptionsWindow={setOptionsWindow} setOperation={setOperation} />
          }
          {
            operation &&
            <OperationWindow operation={operation} setOperation={setOperation}  />
          }
          {
            infoWindow &&
            <InfoWindow setInfoWindow={setInfoWindow} />
          }
        </div>
      );
}

export default MainPage;