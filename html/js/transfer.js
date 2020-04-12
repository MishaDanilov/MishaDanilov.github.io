function transfer(){
    localStorage.setItem("osn1",osn1.value);
    localStorage.setItem("osn2",osn2.value);
    localStorage.setItem("osn3",osn3.value);

    localStorage.setItem("p11",p11.value);
    localStorage.setItem("p12",p12.value);
    localStorage.setItem("p13",p13.value);

    localStorage.setItem("p21",p21.value);
    localStorage.setItem("p22",p22.value);
    localStorage.setItem("p23",p23.value);

    localStorage.setItem("p31",p31.value);
    localStorage.setItem("p32",p32.value);
    localStorage.setItem("p33",p33.value);
}
// document.cookie = transfer().OSN1;

function input(){
    localStorage.clear();
    localStorage.setItem("sb",select2.value);
    localStorage.setItem("sk",select1.value);
    for(let i = 0;i<localStorage.getItem("sk");i++){
        for(let j = 0;j<=localStorage.getItem("sb");j++){
            localStorage.setItem(`${i}${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" id="${i}${j}"></td>`);
        }
    }
    for(let j = 0;j<=localStorage.getItem("sb");j++){
        localStorage.setItem(`F${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" id="F${j}"></td>`);
    }
}

function resh(){
    for(let i = 0;i<localStorage.getItem("sk");i++){
        if(document.getElementById(`select${i}`).options.selectedIndex==1){
            for(let j = 0;j<=localStorage.getItem("sb");j++){
                localStorage.setItem(`T${i}${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" value="${-1*document.getElementById(`${i}${j}`).value}" id="T${i}${j}" disabled></td>`);
            }
        }
        else{
            for(let j = 0;j<=localStorage.getItem("sb");j++){
                localStorage.setItem(`T${i}${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" value="${document.getElementById(`${i}${j}`).value}" id="T${i}${j}" disabled></td>`);
            } 
        }
    }
    for(let j = 0;j<=localStorage.getItem("sb");j++){
        if(document.getElementById(`select`).options.selectedIndex==1){
            if(j==localStorage.getItem("sb")){
                localStorage.setItem(`f${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" value="${document.getElementById(`F${j}`).value}" id="f${j}" disabled></td>`);
            }
            else{localStorage.setItem(`f${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" value="${-1*document.getElementById(`F${j}`).value}" id="f${j}" disabled></td>`);}
        }
        if(document.getElementById(`select`).options.selectedIndex==0){
            localStorage.setItem(`f${j}`,`<td><input style="width:100%; text-align: center;" type="text" size="4" value="${document.getElementById(`F${j}`).value}" id="f${j}" disabled></td>`);
        }
    }
    for(let j = 0;j<localStorage.getItem("sb");j++){
        localStorage.setItem(`x${j}`,`x${j+1}`)
    }
    for(let j = 0;j<localStorage.getItem("sk");j++){
        if(document.getElementById(`select${j}`).options.selectedIndex==2){
            localStorage.setItem(`y${j}`,`0`)
        }
        else{localStorage.setItem(`y${j}`,`y${j+1}`)}
    }
    if(document.getElementById(`select`).options.selectedIndex==0){
        localStorage.setItem('limit','min')
    }
    if(document.getElementById(`select`).options.selectedIndex==1){
        localStorage.setItem('limit','max')
    }
}
