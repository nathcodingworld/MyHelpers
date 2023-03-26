
/**
 * Keeper v0.1.0
 * Helpers Module
 * by Nathaniel Morales
 */

class Keeper {
    storage = {}
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
    makeSpace(name, data = []) {
        this.storage[name] = data
        return this
    }
    getLocations() {
        const search = window.location.search
        const keepdata = new URLSearchParams(search).get('keepdata') 
        const data = decodeURIComponent(keepdata)
         console.log(JSON.parse(data));
    }
    setLocations(anchor, locs = undefined) { 
        const sethref = (anchor) => { 
            let datas = {}  
            if(locs) locs.split(':').forEach(loc=> datas[loc] = this.storage[loc])
            console.log(datas, datas.length);
            const data = encodeURIComponent(JSON.stringify(locs ? datas : this.storage))
            const params = new URLSearchParams(anchor.search); 
            if(params.has('keepdata')) params.delete('keepdata')
            params.append("keepdata", data); 
            anchor.href = anchor.pathname + '?' + params.toString()
        }
        if(anchor instanceof HTMLAnchorElement) sethref(anchor)
        else if(anchor instanceof String) document.querySelectorAll(anchor).forEach(el=> sethref(el) )
        else window.location.search = 'keepdata='+data 
    } 
}