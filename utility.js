'user strict';

let ajax = (actionUrl, type, data) => {
    return new Promise(function (resolve, reject) {
        let ajaxSetting = {
            url: actionUrl,
            type: type,
            data: data,
            success: function (result) {
                resolve(result);
            },
            error: function (error) {
                reject(error);
            }
        };
        $.ajax(ajaxSetting);
    });
},
    eventHelper = {},
    cookieHelper = {},
    strHelper = {},
    dateHelper = {};

// -----------------cookieHelper-----------------

eventHelper.addHandler = function (element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = handler;
    }
};

eventHelper.removeHandler = function (element, type, handler) {
    if (element.removeEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.attachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
};

eventHelper.getEvent = function (event) {
    return event ? event : window.event;
}

eventHelper.getTarget = function (event) {
    return event.target || window.srcElement;
}

eventHelper.preventDefault = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false
    }
}

eventHelper.stopPropagation = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.cancelBubble = true;
    }
}

// -----------------cookieHelper-----------------

cookieHelper.setCookie = function (name, value) {
    // var Days = 30;
    // var exp = new Date();
    // exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    document.cookie = name + '=' + escape(value);
};

cookieHelper.getCookie = function (name) {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr === document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
};

cookieHelper.delCookie = function (name) {
    let exp = new Date(), cval = cookieHelper.getCookie(name);
    exp.setTime(exp.getTime() - 1);
    if (cval !== null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
    }
};

// -----------------strHelper-----------------
strHelper.trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, '');
};

// ----------------dateHelper-----------------
function completionNumber(number) {
    return number < 10 ? '0' + number : number;
}

dateHelper.formatDate = (date) => {
    let year = date.getFullYear(), month = completionNumber(date.getMonth() + 1), day = completionNumber(date.getDate());
    return `${year}-${month}-${day}`;
};

dateHelper.formatMonth = (date) => {
    let year = date.getFullYear(), month = completionNumber(date.getMonth() + 1);
    return `${year}-${month}`;
};

export {
    ajax,
    cookieHelper,
    strHelper,
    dateHelper
};