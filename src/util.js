export default {
	slideTo(el) {
		let actualTop = el.offsetTop,
            current = el.offsetParent;
        while(current != null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        document.body.scrollTop = actualTop-100;
	},
    formatDate(time, str) {
        if(time != null){
            const date = new Date(time)
            return date.getFullYear() + str + (date.getMonth() + 1) + str + date.getDate() 
        }
    }
}