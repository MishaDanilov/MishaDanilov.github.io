function kyrs(){
    for(let i = 0;i<localStorage.getItem("sk");i++){
        for(let j = 0;j<=localStorage.getItem("sb");j++){
            localStorage.setItem(`a${i}${j}`,localStorage.getItem(`T${i}${j}`));
        }
    }
    for(let j = 0;j<=localStorage.getItem("sb");j++){
        localStorage.setItem(`b${j}`,localStorage.getItem(`f${j}`));
    }
    let key = 0;
    let oll_negativ = true;
    let kanon_checking = true;

    outer: while(true){
        key++;
        let index_sb;
        let min_sb = [];
        let index_sr;
        let min_sr = [];
        // выбор метода решения
        let metod_opor;
        let metod_optimal;
        let metod_kanon;
        
        // метод metod_optimal
        for(let i = 0;i<localStorage.getItem("sb");i++){
            if(localStorage.getItem(`b${i}`)<0){
                metod_opor = false
                metod_optimal = true
                metod_kanon = false
            }
        }
        // метод metod_optimal


        // метод metod_opor
        for(let i = 0;i<localStorage.getItem("sk");i++){
            if(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)<0){
                metod_opor = true
                metod_optimal = false
                metod_kanon = false
            }
        }
        // метод metod_opor


        // метод metod_kanon
        let kanon_nab = 0;
        let kanon_bool = false;
        for(let i = 0;i<localStorage.getItem("sk");i++){
            if(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)>=0){
                kanon_nab++
            }
            if(localStorage.getItem(`y${i}`)==0){
                kanon_bool = true;
            }
        }
        
        if(kanon_nab==localStorage.getItem("sk")&&kanon_bool){
            metod_opor = false
            metod_optimal = false
            metod_kanon = true
        }
        // метод metod_kanon
        
        
        if(metod_optimal){
            // поиск оптимального эллемента
            let check_x = 0
            for(let i = 0;i<localStorage.getItem("sb");i++){
                if(localStorage.getItem(`x${i}`)==0){continue;}
                min_sb.push(localStorage.getItem(`b${i}`));
                const negative = min_sb.filter(n => n < 0);
                negative.sort((a, b) => a - b);
                let min = negative[0]; // наименьшее из отрицательных
                if(localStorage.getItem(`b${i}`)==min){index_sb = i}
            }
            for(let j = 0;j<localStorage.getItem("sk");j++){
                localStorage.setItem(`co${j}`,Number(localStorage.getItem(`a${j}${localStorage.getItem("sb")}`))/Number(localStorage.getItem(`a${j}${index_sb}`)));
                if(localStorage.getItem(`co${j}`)<0||localStorage.getItem(`co${j}`)==Infinity){check_x++}
                min_sr.push(localStorage.getItem(`co${j}`));
                const positiv = min_sr.filter(n => (n > 0));
                positiv.sort((a, b) => a - b);
                let min = positiv[0]; // наименьшее из положительных
                if(localStorage.getItem(`co${j}`)==min){index_sr = j}
            }
            if(check_x==localStorage.getItem("sk")){
                oll_negativ = false;
                CenterBoss.innerHTML = '';
                span.classList = 'glyphicon glyphicon-remove'
                span.style.color = 'red'
                answer.style = "border-left-color: IndianRed;"
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Нет решения</footer>`
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Симплексные отношения меньше нуля</footer>`
                break outer;
            }
            optimal = localStorage.getItem(`a${index_sr}${index_sb}`);
            let kapa1 = localStorage.getItem(`x${index_sb}`);
            let kapa2 = localStorage.getItem(`y${index_sr}`);
            localStorage.setItem(`y${index_sr}`,kapa1);
            localStorage.setItem(`x${index_sb}`,kapa2);
            // поиск оптимального эллемента
        }
        if(metod_opor){
            // поиск оптимального эллемента
            net:for(let i = 0;i<localStorage.getItem("sk");i++){
                if(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)<0){
                    for(let j = 0;j<localStorage.getItem("sb");j++){
                        if(localStorage.getItem(`x${j}`)==0){continue;}
                        if(localStorage.getItem(`a${i}${j}`)<0){
                            index_sb=j;
                            break net;
                        }
                    }
                }
            }
            for(let j = 0;j<localStorage.getItem("sk");j++){
                localStorage.setItem(`co${j}`,Number(localStorage.getItem(`a${j}${localStorage.getItem("sb")}`))/Number(localStorage.getItem(`a${j}${index_sb}`)));
                min_sr.push(localStorage.getItem(`co${j}`));
                const positiv = min_sr.filter(n => n > 0);
                positiv.sort((a, b) => a - b);
                let min = positiv[0]; // наименьшее из положительных
                if(localStorage.getItem(`co${j}`)==min){index_sr = j}
            }
            optimal = localStorage.getItem(`a${index_sr}${index_sb}`);
            let kapa1 = localStorage.getItem(`x${index_sb}`);
            let kapa2 = localStorage.getItem(`y${index_sr}`);
            localStorage.setItem(`y${index_sr}`,kapa1);
            localStorage.setItem(`x${index_sb}`,kapa2);
            // поиск оптимального эллемента
            if(optimal==undefined){
                CenterBoss.innerHTML = '';
                span.classList = 'glyphicon glyphicon-remove'
                span.style.color = 'red'
                answer.style = "border-left-color: IndianRed;"
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Нет решения</footer>`
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Не удалось выбрать разрешающий элемент</footer>`
                break outer;
            }
        }
        if(metod_kanon){
            let check_kanon = 0;
            // поиск оптимального эллемента
            net:for(let i = 0;i<localStorage.getItem("sk");i++){
                if(localStorage.getItem(`y${i}`)==0){
                    for(let j = 0;j<localStorage.getItem("sb");j++){
                        if(localStorage.getItem(`x${j}`)==0){continue;}
                        if(localStorage.getItem(`a${i}${j}`)>0){
                            index_sb=j;
                            break net;
                        }
                        if(localStorage.getItem(`a${i}${j}`)==0){
                            check_kanon++
                        }
                    }
                }
            }
            if(check_kanon==localStorage.getItem("sb")){
                CenterBoss.innerHTML = '';
                span.classList = 'glyphicon glyphicon-remove'
                span.style.color = 'red'
                answer.style = "border-left-color: IndianRed;"
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Нет решения</footer>`
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Встретилась нулевая строка, где все нули, кроме свободного члена</footer>`
                break outer;
            }
            for(let j = 0;j<localStorage.getItem("sk");j++){
                localStorage.setItem(`co${j}`,Number(localStorage.getItem(`a${j}${localStorage.getItem("sb")}`))/Number(localStorage.getItem(`a${j}${index_sb}`)));
                min_sr.push(localStorage.getItem(`co${j}`));
                const positiv = min_sr.filter(n => n > 0);
                positiv.sort((a, b) => a - b);
                let min = positiv[0]; // наименьшее из положительных
                if(localStorage.getItem(`co${j}`)==min){index_sr = j}
            }
            optimal = localStorage.getItem(`a${index_sr}${index_sb}`);
            let kapa1 = localStorage.getItem(`x${index_sb}`);
            let kapa2 = localStorage.getItem(`y${index_sr}`);
            localStorage.setItem(`y${index_sr}`,kapa1);
            localStorage.setItem(`x${index_sb}`,kapa2);
            // поиск оптимального эллемента
            if(optimal==undefined){
                CenterBoss.innerHTML = '';
                span.classList = 'glyphicon glyphicon-remove'
                span.style.color = 'red'
                answer.style = "border-left-color: IndianRed;"
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Нет решения</footer>`
                answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">Не удалось выбрать разрешающий элемент</footer>`
                break outer;
            }
        }

       
        //расчёт новой таблицы
        let newTB =[];
        let temp;
        for(let i = 0;i<localStorage.getItem("sk");i++){
            for(let j = 0;j<=localStorage.getItem("sb");j++){
                temp = (localStorage.getItem(`a${i}${j}`)*optimal-localStorage.getItem(`a${index_sr}${j}`)*localStorage.getItem(`a${i}${index_sb}`))/optimal;
                localStorage.setItem(`TM${i}${j}`,temp);//temp.toFixed(2)
            }
        }
        for(let j = 0;j<=localStorage.getItem("sb");j++){
            temp = localStorage.getItem(`a${index_sr}${j}`)/optimal;
            localStorage.setItem(`TM${index_sr}${j}`,temp);//temp.toFixed(2)
        }
        for(let i = 0;i<localStorage.getItem("sk");i++){
            temp = -1*localStorage.getItem(`a${i}${index_sb}`)/optimal;
            localStorage.setItem(`TM${i}${index_sb}`,temp);//temp.toFixed(2)
        }

        localStorage.setItem(`TM${index_sr}${index_sb}`,(1/optimal));//optimal.toFixed(2)

        for(let j = 0;j<=localStorage.getItem("sb");j++){
            temp = (localStorage.getItem(`b${j}`)*optimal-localStorage.getItem(`a${index_sr}${j}`)*localStorage.getItem(`b${index_sb}`))/optimal;
            localStorage.setItem(`TMF${j}`,temp);//temp.toFixed(2)
        }
        
        localStorage.setItem(`TMF${index_sb}`,(-1*localStorage.getItem(`b${index_sb}`)/optimal))//(-1*localStorage.getItem(`b${index_sb}`)/optimal).toFixed(2)

        for(let i = 0;i<localStorage.getItem("sk");i++){
            for(let j = 0;j<=localStorage.getItem("sb");j++){
                localStorage.setItem(`a${i}${j}`,localStorage.getItem(`TM${i}${j}`));
            }
        }
        for(let j = 0;j<=localStorage.getItem("sb");j++){
            localStorage.setItem(`b${j}`,localStorage.getItem(`TMF${j}`));
        }


        // проверка на положительность
        let drive = 0;
        let drive1 = 0;
        let boll = 0;
        let check_integer = 0;
        let bool_integer = false;
        for(let i = 0;i<localStorage.getItem("sk");i++){
            if(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)>=0){
                drive++
            }
            if(drive == localStorage.getItem("sk")){boll++}
        }
        for(let i = 0;i<localStorage.getItem("sb");i++){
            if(localStorage.getItem(`b${i}`)>=0||localStorage.getItem(`x${i}`)==0){drive1++}
            if(drive1 == localStorage.getItem("sb")){boll++}
        }
        for(let i = 0;i<localStorage.getItem("sk");i++){
            if(localStorage.getItem(`y${i}`)==0){
                kanon_checking = false;
                break;
            }
            else{kanon_checking = true;}
        }

        let getError = 0;
        for(let i = 0;i<localStorage.getItem("sk");i++){
            if(localStorage.getItem(`y${i}`).substr(0, 1)==`x`){
                getError += Math.abs(Math.round(Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)))-Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)))      
            }                                                                   //ПРОВЕРКА ПОГРЕШНОСТИ 
        }
        if(getError <0.00001){        
            bool_integer = true;                                        //ПРОВЕРКА ПОГРЕШНОСТИ 
        }
        // проверка на положительность

        //метод   ГОМОРИ 
        let array_integer = [];
        let index_integer;
        if(boll==2&&kanon_checking&&bool_integer==false){
            for(let i = 0;i<localStorage.getItem("sk");i++){
                if(localStorage.getItem(`y${i}`).substr(0, 1)==`x`){
                    array_integer.push(Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`))-Math.floor(Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`))));   
                    const max_drob = array_integer.filter(n => (n >= 0));
                    max_drob.sort((a, b) => a - b);
                    let min_integer = max_drob[max_drob.length-1];
                    if(Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`))-Math.floor(Number(localStorage.getItem(`a${i}${localStorage.getItem("sb")}`)))==min_integer){index_integer = i}
                }
            }
            localStorage.setItem('sk',Number(localStorage.getItem("sk"))+1);
            localStorage.setItem(`y${localStorage.getItem("sk")-1}`,`y${localStorage.getItem("sk")}`);
            for(let j = 0;j<=localStorage.getItem("sb");j++){                                                          //ДОБАВЛЕНИЕ НОВОЙ СТРОКИ В ТАБЛИЦУ
                temp = localStorage.getItem(`a${index_integer}${j}`)-Math.floor(localStorage.getItem(`a${index_integer}${j}`))
                localStorage.setItem(`a${localStorage.getItem("sk")-1}${j}`,-temp);
            }
        }
        //метод   ГОМОРИ 


        if(boll==2&&kanon_checking&&bool_integer){
            if(localStorage.getItem('limit')=='min'){
                localStorage.setItem(`b${localStorage.getItem('sb')}`,-1*localStorage.getItem(`b${localStorage.getItem('sb')}`))
            }
            
            break outer;
        }
    }
    if(optimal!=undefined&&oll_negativ){
        // if(localStorage.getItem("flag")=="kyrs"){
            for(let i = 0;i<localStorage.getItem('sk');i++){
                if(localStorage.getItem(`y${i}`).substr(0, 1)==`x`){
                    if(localStorage.getItem(`y${i}`).substr(0, 2)==`x1`){
                        answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">${`Количество транспората вида T1`+" = "+Math.ceil(localStorage.getItem(`a${i}${localStorage.getItem('sb')}`))}</footer>`
                    }
                    if(localStorage.getItem(`y${i}`).substr(0, 2)==`x2`){
                        answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">${`Количество транспората вида T2`+" = "+Math.ceil(localStorage.getItem(`a${i}${localStorage.getItem('sb')}`))}</footer>`
                    }
                }
            }
            for(let i = 0;i<localStorage.getItem('sb');i++){
                if(localStorage.getItem(`x${i}`).substr(0, 1)==`x`){
                    if(localStorage.getItem(`x${i}`).substr(0, 2)==`x1`){
                        answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">${`Количество транспората вида T1`+" = 0"}</footer>`
                    }
                    if(localStorage.getItem(`x${i}`).substr(0, 2)==`x2`){
                        answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">${`Количество транспората вида T2`+" = 0"}</footer>`
                    }
                }
            }
            answer.innerHTML += `<footer style="color: rgb(230, 240, 240);">${"Минимальные затраты = "+Math.ceil(localStorage.getItem(`b${localStorage.getItem('sb')}`))}</footer>`
    }
}