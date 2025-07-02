export function changeTitle(append){
    const curSel = window.getSelection().toString();    //get the highlight selection (or lack thereof)
    if(curSel != null && curSel != '')                  //check whether something is actually selected
        document.title = append ?                       //check whether we're appending or overwriting
            document.title + ' '  + curSel :            //append
            curSel;                                     //overwrite
}