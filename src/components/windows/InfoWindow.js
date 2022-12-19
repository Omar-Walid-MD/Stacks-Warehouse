import { useTranslation } from "react-i18next";
import { useEffect} from "react";

import "../../styles/Windows.css";

function InfoWindow({setInfoWindow})
{
    const [tr,il8n] = useTranslation();

    useEffect(()=>{
    
        window.onkeydown = function(event){if(event.key==="Escape") setInfoWindow(false)}
        
        return function(){window.onkeydown = null;}
        
      },[])

    return (
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
    )
}

export default InfoWindow;