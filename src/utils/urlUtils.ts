export const getUrlParams = () => {
    return window.location.search
        .substring(1)
        .split('&')
        .reduce(function(initial: { [key: string]: any; }, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
};
  
export const removeParamsFromUrl = () => {
    window.history.pushState('', document.title, window.location.pathname);
};