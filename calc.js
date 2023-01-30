

let res=""
let op=[]
const max_op=31
const max_res=17

//fill op screen
function fill_op(){
    for(let i=0; i<max_op; i++){
        if(op[i]!=undefined) document.getElementsByClassName("op_item")[i].innerHTML=op[i]
        else document.getElementsByClassName("op_item")[i].innerHTML=""
    }
}

//fill res screen
function fill_res(){
    if(res.length!=0){
        let j=max_res-1
        for(let i=res.length-1; i>=0; i--, j--) document.getElementsByClassName("res_item")[j].innerHTML=res[i]
        for(let i=0; i<max_res-res.length; i++) document.getElementsByClassName("res_item")[i].innerHTML=""
    }
    else{
        for(let i=0; i<max_res-1; i++) document.getElementsByClassName("res_item")[i].innerHTML=""
        document.getElementsByClassName("res_item")[max_res-1].innerHTML="0"
    } 
}

//display characters
function disp(chr){
    if(op.length<max_op){
        op.push(chr)
        fill_op()
    }
    else{
        res=" REACH MAX DIGIT "
        fill_res()
    }
}

//compute arith expr
function eval(expr){
    //check for + or - outside any brackets
    let br=0
    for(let i=0; i<expr.length; i++){
        if(expr[i]==="(") br++
        else if(expr[i]===")") br--
        else if((expr[i]==="-"||expr[i]==="+")&&i!=0&&br==0) return eval(expr.slice(0,i))+eval(expr.slice(i,expr.length))
    }
    //check for * or / outside any brackets
    br=0
    for(let i=0; i<expr.length; i++){
        if(expr[i]==="(") br++
        else if(expr[i]===")") br--
        else if(expr[i]==="/"&&br==0) return eval(expr.slice(0,i))/eval(expr.slice(i+1,expr.length))        
        else if(expr[i]==="*"&&br==0) return eval(expr.slice(0,i))*eval(expr.slice(i+1,expr.length)) 
    }
    //check if the expr begins by a sign - or +
    if(/^\-{1}/.test(expr)) return -eval(expr.slice(1, expr.length))
    if(/^\+{1}/.test(expr)) return eval(expr.slice(1, expr.length))
    //check if the expression is between bracket
    if(expr[0]==="("&&expr[expr.length-1]===")") return eval(expr.slice(1,expr.length-1)) 
    //check if the expression is a number
    if(/^[0-9]+(\.[0-9]+)?$/.test(expr)) return parseFloat(expr)
    //if no match throw error
    throw "syntax error"
}

//init op screen
for(let i=0; i<max_op; i++){
    const el=document.createElement("div")
    el.setAttribute("class", "op_item")
    document.getElementsByClassName("op")[0].appendChild(el)
}

//init res screen
for(let i=0; i<max_res; i++){
    const el=document.createElement("div")
    el.setAttribute("class", "res_item")
    document.getElementsByClassName("result")[0].appendChild(el)
}
document.getElementsByClassName("res_item")[max_res-1].innerHTML="0"

//virtual keyboard handler
document.addEventListener("click", (event)=>{
    const cl=event.target.getAttribute("class")
    if(cl==="disp_chr") disp(event.target.innerHTML)
    else if(cl==="del"){
        op.pop()
        fill_op()
    }
    else if(cl==="ac"){
        op=[]
        res=""
        fill_res()
        fill_op()
    }
    else if(cl==="equal"){
        if(op.length!=0){
            try{
                const r=eval(op.join(""))
                if(Math.abs(r)>99999999999999999) res="REACH MAX NUM  "
                else res=r.toString().slice(0,17)
                if(document.getElementsByClassName("no_hist")[0].getAttribute("status")==="visible"){
                    document.getElementsByClassName("no_hist")[0].setAttribute("status","hidden")
                    document.getElementsByClassName("content")[0].setAttribute("style","z-index:1")
                    const el = document.createElement("div")
                    el.setAttribute("class","hist_item")
                    el.innerHTML=op.join("")
                    document.getElementsByClassName("content")[0].appendChild(el)
                }
                else{
                    const el = document.createElement("div")
                    el.setAttribute("class","hist_item")
                    el.innerHTML=op.join("")
                    document.getElementsByClassName("content")[0].appendChild(el)
                }
                fill_res()
                op=[]
            }
            catch(err){
                res="SYNTAX ERROR  "
                fill_res()
                op=[]
            }
        }
    }
    else if(cl==="clear"){
        document.getElementsByClassName("content")[0].innerHTML=""
        document.getElementsByClassName("content")[0].setAttribute("style","z-index:-1")
        document.getElementsByClassName("no_hist")[0].setAttribute("status","visible")
    }
    else if(cl==="hist_item"){
        op=[]
        fill_op()
        let item=event.target.innerHTML
        for(let i=0; i<item.length; i++) op.push(item[i])
        fill_op()
    }
})

//hard keyboard handler
document.addEventListener("keyup", (event)=>{
    const val=event.key
    if(/^[0-9()+./*-]$/.test(val)) disp(val)
    else if(val==="Backspace"){
        op.pop()
        fill_op()
    }
    else if(val==="Enter"){
        if(op.length!=0){
            try{
                const r=eval(op.join(""))
                if(Math.abs(r)>99999999999999999) res="REACH MAX NUM  "
                else res=r.toString().slice(0,17)
                if(document.getElementsByClassName("no_hist")[0].getAttribute("status")==="visible"){
                    document.getElementsByClassName("no_hist")[0].setAttribute("status","hidden")
                    document.getElementsByClassName("content")[0].setAttribute("style","z-index:1")
                    const el = document.createElement("div")
                    el.setAttribute("class","hist_item")
                    el.innerHTML=op.join("")
                    document.getElementsByClassName("content")[0].appendChild(el)
                }
                else{
                    const el = document.createElement("div")
                    el.setAttribute("class","hist_item")
                    el.innerHTML=op.join("")
                    document.getElementsByClassName("content")[0].appendChild(el)
                }
                fill_res()
                op=[]
            }
            catch(err){
                res="  SYNTAX ERROR  "
                fill_res()
                op=[]
            }
        }
    }
})






