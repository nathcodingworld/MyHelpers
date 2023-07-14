
/**
 * Keeper v0.1.0
 * My Helpers
 * Nathaniel Morales
 */

class Keeper {
    transfer = {}
    database = {}
    // storage = {}
    constructor({name, main, follow, clear} = { name: 'keeperdata', main: false, follow: false, clear: false }) { 
        if(main) window.onbeforeunload = () => localStorage.setItem(name, JSON.stringify(this.transfer)) 
        if(follow) this.transfer = JSON.parse(localStorage.getItem(name) || '{}')  
        if(clear) localStorage.removeItem(name)
    }
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
    makeSpace(name, data) {
        this.database[name] = data 
        return [this.database[name], setData => setData(this.database[name])]
    }
    keep(data, name){
        this.transfer[name] = data 
        return [this.transfer[name], setData => setData(this.transfer[name])]
    } 
    load (name) {
        const transfer = this.transfer[name]
        return [transfer, setData => setData(transfer)] 
    }
    send(name, location, search = "") {
        const params = new URLSearchParams(search); 
        const addsearch = (searchname) => {
            if(params.has(searchname)) params.delete(searchname)
            const data = encodeURIComponent(JSON.stringify(this.transfer[searchname] || ''))
            params.append(searchname, data)
        }
        if(name instanceof Array) {
            for (let i = 0; i < name.length; i++) addsearch(name[i]) 
        } else addsearch(name)

        window.location.assign(location+'?'+params.toString())
    }
    recieve(name) {
        const search = window.location.search
        const keepdata = JSON.parse(decodeURIComponent(new URLSearchParams(search).get(name)))
        if(keepdata) this.transfer[name] = keepdata
        return [this.transfer[name], setData => setData(this.transfer[name])]  
    }
    // store (name, elements = []) {
    //     const storage = this.storage[name]
    //     if(!storage) storage = elements
    // }
 
}