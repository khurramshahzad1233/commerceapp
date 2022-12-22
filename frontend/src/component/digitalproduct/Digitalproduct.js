import React,{Fragment} from 'react'
import "./Digitalproduct.css"
import { jsPDF } from "jspdf";



const Digitalproduct = (e) => {
    function downloadproduct(){
       
        let doc=new jsPDF("portrait","px","a4",false)
        doc.addImage("https://i.ibb.co/Pg8Tddc/downloadfile.png","PNG",0,0,417,653)
        doc.save("downloadfile.pdf")
        
    }
  return (
    <Fragment>
        <div>Digitalproduct</div>
    <div className="digitalproductdetail">
        step 1: first convert your pdf file to png file
        search in google
        <p>
            now you need to host that png file somewher in your server
        </p>
        <p>
            now search "imgbb" website in google and create your account there
        </p>
        <p>
            now upload your png file in "imgbb" website and copy "html full linked"
        </p>
        <p>
            now install jsPDF in your frontend react app
        </p>
        <p>
            <button onClick={(e)=>downloadproduct()}>Downloadable Product</button>
        
        </p>
        </div></Fragment>
    
  )
}

export default Digitalproduct