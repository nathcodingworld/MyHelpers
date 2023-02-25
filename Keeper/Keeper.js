
/**
 * Keeper v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */

class Keeper {
    addressesFiller (param, arg) {
        const selects = document.querySelector(param.element)  
        if(selects) {
            selects.innerHTML = `<option selected value>Select ${param.name}</option>`
            param.request.RECORDS.forEach(reg=> {
                if(param.responce(reg, arg)){
                    const options = document.createElement("option")
                    options.value = param.responce(reg, arg).val
                    options.innerText = param.responce(reg, arg).text
                    selects.append(options)
                }
            })
            if(param.next) selects.addEventListener("change", (e) => {
                fillers(param.next,  e.target.value)
            } ) 
        }
    }
}