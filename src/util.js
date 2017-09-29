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
    },
    throttle(fn, delay) {
        let last = 0, timer = null;
        return function () {
            let context = this, args = arguments;
            let now = new Date();
            if(now-last >= delay){
                last = new Date();
                fn.apply(context, args);                
            } else {
                clearTimeout(timer);
                timer = setTimeout( () => {
                    last = new Date();
                    fn.apply(context, args)
                }, delay)
            }
        }
    },
    random(min, max) {
        if(min > max){
            let temp = min; min = max; max = temp;
        }
        return min + Math.floor(Math.random(max-min));
    }
}