export type TimeIntervalString = 'year' | 'month' | 'day' | 'hours' | 'minutes' | 'seconds'

export type TimeFormats = 'seconds' | 'minutes' | 'dayMonths' | 'months' | 'years'

export const getDateData = (date: Date): { [key in TimeIntervalString]: number } => {
	return {
		year: date.getFullYear(),
		month: date.getMonth(),
		day: date.getDate(),
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds()
	}
}
export const roundToNearestInterval = (timestamp: number, interval: number) => {
	const ms = interval * 1000
	return Math.round(timestamp / ms) * ms
}
export const shrinkDate = (date: Date, resolution: TimeIntervalString) => {
	const dateData = getDateData(date)
	const resolutions: TimeIntervalString[] = ['year', 'month', 'day', 'hours', 'minutes', 'seconds']
	const dateArray: [number, number, number, number, number, number] = [0, 0, 1, 0, 0, 0]
	for (let i = 0; i < resolutions.length; i++) {
		const res = resolutions[i]
		dateArray[i] = dateData[res]
		if (res === resolution) break
	}
	return new Date(...dateArray)
}
export const incrementDate = (date: Date, intervalType: TimeIntervalString, incrementValue: number) => {
	const newDate = new Date(date)
	const functionNames: { [key in TimeIntervalString]: string } = {
		year: 'FullYear',
		month: 'Month',
		day: 'Date',
		hours: 'Hours',
		minutes: 'Minutes',
		seconds: 'Seconds'
	}
	const functionName = functionNames[intervalType]
	const anyDate = newDate as any
	anyDate['set' + functionName](anyDate['get' + functionName]() + incrementValue)
	return anyDate as Date
}
export const findBreakpoints = (intervalType: TimeIntervalString, range: { beg: number; end: number }) => {
	const begDate = new Date(range.beg * 1000)
	const shrinked = shrinkDate(begDate, intervalType)
	let date = incrementDate(shrinked, intervalType, 1)
	const breakpoints: Date[] = []
	while (date.getTime() / 1000 < range.end) {
		breakpoints.push(date)
		date = incrementDate(date, intervalType, 1)
	}
	return breakpoints
}

export function ResizeSensor(element: any, callback: any)
{
    let zIndex = parseInt(getComputedStyle(element) as any);
    if(isNaN(zIndex)) { zIndex = 0; };
    zIndex--;

    let expand = document.createElement('div');
    expand.style.position = "absolute";
    expand.style.left = "0px";
    expand.style.top = "0px";
    expand.style.right = "0px";
    expand.style.bottom = "0px";
    expand.style.overflow = "hidden";
    expand.style.zIndex = zIndex.toString();
    expand.style.visibility = "hidden";

    let expandChild = document.createElement('div');
    expandChild.style.position = "absolute";
    expandChild.style.left = "0px";
    expandChild.style.top = "0px";
    expandChild.style.width = "10000000px";
    expandChild.style.height = "10000000px";
    expand.appendChild(expandChild);

    let shrink = document.createElement('div');
    shrink.style.position = "absolute";
    shrink.style.left = "0px";
    shrink.style.top = "0px";
    shrink.style.right = "0px";
    shrink.style.bottom = "0px";
    shrink.style.overflow = "hidden";
    shrink.style.zIndex = zIndex.toString();
    shrink.style.visibility = "hidden";

    let shrinkChild = document.createElement('div');
    shrinkChild.style.position = "absolute";
    shrinkChild.style.left = "0px";
    shrinkChild.style.top = "0px";
    shrinkChild.style.width = "200%";
    shrinkChild.style.height = "200%";
    shrink.appendChild(shrinkChild);

    element.appendChild(expand);
    element.appendChild(shrink);

    function setScroll()
    {
        expand.scrollLeft = 10000000;
        expand.scrollTop = 10000000;

        shrink.scrollLeft = 10000000;
        shrink.scrollTop = 10000000;
    };
    setScroll();

    let size = element.getBoundingClientRect();

    let currentWidth = size.width;
    let currentHeight = size.height;

    let onScroll = function()
    {
        let size = element.getBoundingClientRect();

        let newWidth = size.width;
        let newHeight = size.height;

        if(newWidth !== currentWidth || newHeight !== currentHeight)
        {
            currentWidth = newWidth;
            currentHeight = newHeight;

            callback();
        }

        setScroll();
    };

    expand.addEventListener('scroll', onScroll);
    shrink.addEventListener('scroll', onScroll);
};