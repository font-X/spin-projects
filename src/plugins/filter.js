const formatDate1 = (date) => {
    const dateObj = new Date(date)
    const y = dateObj.getFullYear()
    const M = (dateObj.getMonth() + 1).toString().padStart(2, 0)
    const d = dateObj.getDate().toString().padStart(2, 0)
    return `${y}-${M}-${d}`
}
let formatDate = (date) => { 
    const dateObj = new Date(date)
    const y = dateObj.getFullYear()
    const M = (dateObj.getMonth() + 1).toString().padStart(2, 0)
    const d = dateObj.getDate().toString().padStart(2, 0)
    const H = dateObj.getHours().toString().padStart(2, 0)
    const MM = dateObj.getMinutes().toString().padStart(2, 0)
    const SS = dateObj.getSeconds().toString().padStart(2, 0)
    return `${y}-${M}-${d} ${H}:${MM}:${SS}`
    // return year+"-"+month+"-"+date; 
} 

let ingUrl = (data) =>{
    let substr = data.match(/..(\S*).png/)
    let url = substr[0].slice(7)
    return url
}
let colorUrl = (data) =>{
    let substr = data.match(/..(\S*)"/)
    // let url = substr[0].substring(0,10)
    // return url
    return substr
}
export default {
    formatDate1,
    formatDate,
    ingUrl,
    colorUrl
}