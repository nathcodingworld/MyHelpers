
/**
 * Keeper v0.1.0
 * My Helpers
 * Nathaniel Morales
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
    getData() {
        const search = window.location.search
        const keepdata = new URLSearchParams(search).get('keepdata') 
        const data = decodeURIComponent(keepdata)
         console.log(JSON.parse(data));
    }
    setLocations(anchor, locs = undefined) { 
        const sethref = (a) => { 
            let datas = {}  
            if(locs) locs.split(':').forEach(loc=> datas[loc] = this.storage[loc]) 
            const data = encodeURIComponent(JSON.stringify(locs ? datas : this.storage))
            const params = new URLSearchParams(a.search); 
            if(params.has('keepdata')) params.delete('keepdata')
            params.append("keepdata", data); 
            a.href = a.pathname + '?' + params.toString()
        }
        if(anchor instanceof HTMLAnchorElement) sethref(anchor)
        else if(anchor instanceof String) document.querySelectorAll(anchor).forEach(el=> sethref(el) )
        else window.location.search = 'keepdata='+data 
    } 
    setPath(ints) {
        const [key, name] = ints.split(':')
        const obj = this.storage[key]
        if(obj) for (const k in obj) {
            if (Object.hasOwnProperty.call(obj, k)) {
                const el = obj[k];
                
            }
        }
    }
}