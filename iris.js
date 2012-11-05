/**
 * iris 0.1.0 iris.js
 * zhangmhao@gmail.com
 */

 (function (window) {
    var document = window.document,
        navigator = window.navigator,
        location = window.location;
    if (!window.iris) {
        window.iris = {};
    }
    function isCompatible (other){
        if (other === false
            || !Array.prototype.push
            || !Object.hasOwnProperty
            || !document.createElement
            || !document.getElementsByTagName
            ) {
            return false;
        }
        return true;
    }
    window.iris.isCompatible = isCompatible;

    function $(){
        var elements = [],
            el,
            i;

        for(i = 0; i < arguments.length; i++) {
            el = arguments[i];
            if (typeof el === 'string') {
                el = document.getElementById(el);
            }
            //只有一个参数，马上返回
            if (arguments.length === 1) {
                return el;
            }
            elements.push(el);
        }
        return elements;
    }
    window.iris.$ = $;

    function addEvent(node, type, listener) {
        if (!isCompatible()) {
            return false;
        }
        if (!(node = $(node))) {
            return false;
        }
        if (node.addEventListener) {
            node.addEventListener(type, listener, false);
        } else if (node.attachEvent) {
            node['e' + type + listener] = listener;
            node[type + listener] = function () {
                node['e' + type + listener](window.event);
            };
            node.attachEvent('on' + type, node[type + listener]);
            return true;
        }
        //两者皆无返回false
        return false;
    }
    window.iris.addEvent = addEvent;

    function removeEvent(node, type, listener) {
        if (!(node = $(node))) {
            return false;
        }
        if (node.removeEventListener) {
            node.removeEventListener(type, listener, false);
            return true;
        } else if (node.detachEvent) {
            node.detachEvent('on' + type, node[type + listener]);
            node[type + listener] = null;
            return true;
        }
        return false;
    }
    window.iris.removeEvent = removeEvent;

    function getElementsByClassName(className, tag, parent) {
        parent = parent || document;
        if (!(parent = $(parent))) {
            return false;
        }
        className = className.replace(/\-/g,'\\-');
        tag = tag || '*';
        var allTags = (tag === '*' && parent.all) ? parent.all :
                parent.getElementsByTagName(tag),
            matchingElements = [],
            regex = new RegExp('(^|\\s)' + className + '(\\s|$)'),
            i, el;
        for (i = 0; i < allTags.length; i+=1) {
            el = allTags[i];
            if (regex.test(el.className)) {
                matchingElements.push(el);
            }
        }
        return matchingElements;
    }
    window.iris.getElementsByClassName =  getElementsByClassName;

    function toggleDisplay(node, value) {}
    window.iris.toggleDisplay = toggleDisplay;

    function insertAfter (node, referenceNode) {
        return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
    }
    window.iris.insertAfter = insertAfter;

    function removeChildren(parent) {
        while(parent.firstChild) {
            console.log('i');
            parent.firstChild.parentNode.removeChild(parent.firstChild);
        }
        return parent;
    }
    window.iris.removeChildren = removeChildren;

    function prependChildren (parent, newChild) {
        if (parent.firstChild) {
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            parent.appendChild(newChild);
        }
        return parent;
    }
    window.iris.prependChildren = prependChildren;
 })(window);