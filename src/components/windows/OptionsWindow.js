import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import Stack from "../stack/Stack";

import "../../styles/Windows.css";

function OptionsWindow({stack,setOperation,setOptionsWindow})
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
    setOperation(StackOperation(type));
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

export default OptionsWindow;