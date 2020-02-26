function getDefaultOpts(e){"use strict";var r={omitExtraWLInCodeBlocks:{defaultValue:!1,describe:"Omit the default extra whiteline added to code blocks",type:"boolean"},noHeaderId:{defaultValue:!1,describe:"Turn on/off generated header id",type:"boolean"},prefixHeaderId:{defaultValue:!1,describe:"Specify a prefix to generated header ids",type:"string"},headerLevelStart:{defaultValue:!1,describe:"The header blocks level start",type:"integer"},parseImgDimensions:{defaultValue:!1,describe:"Turn on/off image dimension parsing",type:"boolean"},simplifiedAutoLink:{defaultValue:!1,describe:"Turn on/off GFM autolink style",type:"boolean"},literalMidWordUnderscores:{defaultValue:!1,describe:"Parse midword underscores as literal underscores",type:"boolean"},strikethrough:{defaultValue:!1,describe:"Turn on/off strikethrough support",type:"boolean"},tables:{defaultValue:!1,describe:"Turn on/off tables support",type:"boolean"},tablesHeaderId:{defaultValue:!1,describe:"Add an id to table headers",type:"boolean"},ghCodeBlocks:{defaultValue:!0,describe:"Turn on/off GFM fenced code blocks support",type:"boolean"},tasklists:{defaultValue:!1,describe:"Turn on/off GFM tasklist support",type:"boolean"},smoothLivePreview:{defaultValue:!1,describe:"Prevents weird effects in live previews due to incomplete input",type:"boolean"},smartIndentationFix:{defaultValue:!1,description:"Tries to smartly fix identation in es6 strings",type:"boolean"}};if(e===!1)return JSON.parse(JSON.stringify(r));var t={};for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n].defaultValue);return t}function validate(e,r){"use strict";var t=r?"Error in "+r+" extension->":"Error in unnamed extension",n={valid:!0,error:""};showdown.helper.isArray(e)||(e=[e]);for(var s=0;s<e.length;++s){var o=t+" sub-extension "+s+": ",a=e[s];if("object"!=typeof a)return n.valid=!1,n.error=o+"must be an object, but "+typeof a+" given",n;if(!showdown.helper.isString(a.type))return n.valid=!1,n.error=o+'property "type" must be a string, but '+typeof a.type+" given",n;var i=a.type=a.type.toLowerCase();if("language"===i&&(i=a.type="lang"),"html"===i&&(i=a.type="output"),"lang"!==i&&"output"!==i&&"listener"!==i)return n.valid=!1,n.error=o+"type "+i+' is not recognized. Valid values: "lang/language", "output/html" or "listener"',n;if("listener"===i){if(showdown.helper.isUndefined(a.listeners))return n.valid=!1,n.error=o+'. Extensions of type "listener" must have a property called "listeners"',n}else if(showdown.helper.isUndefined(a.filter)&&showdown.helper.isUndefined(a.regex))return n.valid=!1,n.error=o+i+' extensions must define either a "regex" property or a "filter" method',n;if(a.listeners){if("object"!=typeof a.listeners)return n.valid=!1,n.error=o+'"listeners" property must be an object but '+typeof a.listeners+" given",n;for(var c in a.listeners)if(a.listeners.hasOwnProperty(c)&&"function"!=typeof a.listeners[c])return n.valid=!1,n.error=o+'"listeners" property must be an hash of [event name]: [callback]. listeners.'+c+" must be a function but "+typeof a.listeners[c]+" given",n}if(a.filter){if("function"!=typeof a.filter)return n.valid=!1,n.error=o+'"filter" must be a function, but '+typeof a.filter+" given",n}else if(a.regex){if(showdown.helper.isString(a.regex)&&(a.regex=new RegExp(a.regex,"g")),!a.regex instanceof RegExp)return n.valid=!1,n.error=o+'"regex" property must either be a string or a RegExp object, but '+typeof a.regex+" given",n;if(showdown.helper.isUndefined(a.replace))return n.valid=!1,n.error=o+'"regex" extensions must implement a replace string or function',n}}return n}function escapeCharactersCallback(e,r){"use strict";var t=r.charCodeAt(0);return"~E"+t+"E"}var showdown={},parsers={},extensions={},globalOptions=getDefaultOpts(!0),flavor={github:{omitExtraWLInCodeBlocks:!0,prefixHeaderId:"user-content-",simplifiedAutoLink:!0,literalMidWordUnderscores:!0,strikethrough:!0,tables:!0,tablesHeaderId:!0,ghCodeBlocks:!0,tasklists:!0},vanilla:getDefaultOpts(!0)};showdown.helper={},showdown.extensions={},showdown.setOption=function(e,r){"use strict";return globalOptions[e]=r,this},showdown.getOption=function(e){"use strict";return globalOptions[e]},showdown.getOptions=function(){"use strict";return globalOptions},showdown.resetOptions=function(){"use strict";globalOptions=getDefaultOpts(!0)},showdown.setFlavor=function(e){"use strict";if(flavor.hasOwnProperty(e)){var r=flavor[e];for(var t in r)r.hasOwnProperty(t)&&(globalOptions[t]=r[t])}},showdown.getDefaultOptions=function(e){"use strict";return getDefaultOpts(e)},showdown.subParser=function(e,r){"use strict";if(showdown.helper.isString(e)){if("undefined"==typeof r){if(parsers.hasOwnProperty(e))return parsers[e];throw Error("SubParser named "+e+" not registered!")}parsers[e]=r}},showdown.extension=function(e,r){"use strict";if(!showdown.helper.isString(e))throw Error("Extension 'name' must be a string");if(e=showdown.helper.stdExtName(e),showdown.helper.isUndefined(r)){if(!extensions.hasOwnProperty(e))throw Error("Extension named "+e+" is not registered!");return extensions[e]}"function"==typeof r&&(r=r()),showdown.helper.isArray(r)||(r=[r]);var t=validate(r,e);if(!t.valid)throw Error(t.error);extensions[e]=r},showdown.getAllExtensions=function(){"use strict";return extensions},showdown.removeExtension=function(e){"use strict";delete extensions[e]},showdown.resetExtensions=function(){"use strict";extensions={}},showdown.validateExtension=function(e){"use strict";var r=validate(e,null);return r.valid?!0:(console.warn(r.error),!1)},showdown.hasOwnProperty("helper")||(showdown.helper={}),showdown.helper.isString=function(e){"use strict";return"string"==typeof e||e instanceof String},showdown.helper.isFunction=function(e){"use strict";var r={};return e&&"[object Function]"===r.toString.call(e)},showdown.helper.forEach=function(e,r){"use strict";if("function"==typeof e.forEach)e.forEach(r);else for(var t=0;t<e.length;t++)r(e[t],t,e)},showdown.helper.isArray=function(e){"use strict";return e.constructor===Array},showdown.helper.isUndefined=function(e){"use strict";return"undefined"==typeof e},showdown.helper.stdExtName=function(e){"use strict";return e.replace(/[_-]||\s/g,"").toLowerCase()},showdown.helper.escapeCharactersCallback=escapeCharactersCallback,showdown.helper.escapeCharacters=function(e,r,t){"use strict";var n="(["+r.replace(/([\[\]\\])/g,"\\$1")+"])";t&&(n="\\\\"+n);var s=new RegExp(n,"g");return e=e.replace(s,escapeCharactersCallback)};var rgxFindMatchPos=function(e,r,t,n){"use strict";var s,o,a,i,c,l=n||"",u=l.indexOf("g")>-1,h=new RegExp(r+"|"+t,"g"+l.replace(/g/g,"")),d=new RegExp(r,l.replace(/g/g,"")),p=[];do for(s=0;a=h.exec(e);)if(d.test(a[0]))s++||(o=h.lastIndex,i=o-a[0].length);else if(s&&!--s){c=a.index+a[0].length;var w={left:{start:i,end:o},match:{start:o,end:a.index},right:{start:a.index,end:c},wholeMatch:{start:i,end:c}};if(p.push(w),!u)return p}while(s&&(h.lastIndex=o));return p};showdown.helper.matchRecursiveRegExp=function(e,r,t,n){"use strict";for(var s=rgxFindMatchPos(e,r,t,n),o=[],a=0;a<s.length;++a)o.push([e.slice(s[a].wholeMatch.start,s[a].wholeMatch.end),e.slice(s[a].match.start,s[a].match.end),e.slice(s[a].left.start,s[a].left.end),e.slice(s[a].right.start,s[a].right.end)]);return o},showdown.helper.replaceRecursiveRegExp=function(e,r,t,n,s){"use strict";if(!showdown.helper.isFunction(r)){var o=r;r=function(){return o}}var a=rgxFindMatchPos(e,t,n,s),i=e,c=a.length;if(c>0){var l=[];0!==a[0].wholeMatch.start&&l.push(e.slice(0,a[0].wholeMatch.start));for(var u=0;c>u;++u)l.push(r(e.slice(a[u].wholeMatch.start,a[u].wholeMatch.end),e.slice(a[u].match.start,a[u].match.end),e.slice(a[u].left.start,a[u].left.end),e.slice(a[u].right.start,a[u].right.end))),c-1>u&&l.push(e.slice(a[u].wholeMatch.end,a[u+1].wholeMatch.start));a[c-1].wholeMatch.end<e.length&&l.push(e.slice(a[c-1].wholeMatch.end)),i=l.join("")}return i},showdown.helper.isUndefined(console)&&(console={warn:function(e){"use strict";alert(e)},log:function(e){"use strict";alert(e)},error:function(e){"use strict";throw e}}),showdown.Converter=function(e){"use strict";function r(){e=e||{};for(var r in globalOptions)globalOptions.hasOwnProperty(r)&&(a[r]=globalOptions[r]);if("object"!=typeof e)throw Error("Converter expects the passed parameter to be an object, but "+typeof e+" was passed instead.");for(var n in e)e.hasOwnProperty(n)&&(a[n]=e[n]);a.extensions&&showdown.helper.forEach(a.extensions,t)}function t(e,r){if(r=r||null,showdown.helper.isString(e)){if(e=showdown.helper.stdExtName(e),r=e,showdown.extensions[e])return console.warn("DEPRECATION WARNING: "+e+" is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"),void n(showdown.extensions[e],e);if(showdown.helper.isUndefined(extensions[e]))throw Error('Extension "'+e+'" could not be loaded. It was either not found or is not a valid extension.');e=extensions[e]}"function"==typeof e&&(e=e()),showdown.helper.isArray(e)||(e=[e]);var t=validate(e,r);if(!t.valid)throw Error(t.error);for(var o=0;o<e.length;++o){switch(e[o].type){case"lang":i.push(e[o]);break;case"output":c.push(e[o])}if(e[o].hasOwnProperty(l))for(var a in e[o].listeners)e[o].listeners.hasOwnProperty(a)&&s(a,e[o].listeners[a])}}function n(e,r){"function"==typeof e&&(e=e(new showdown.Converter)),showdown.helper.isArray(e)||(e=[e]);var t=validate(e,r);if(!t.valid)throw Error(t.error);for(var n=0;n<e.length;++n)switch(e[n].type){case"lang":i.push(e[n]);break;case"output":c.push(e[n]);break;default:throw Error("Extension loader error: Type unrecognized!!!")}}function s(e,r){if(!showdown.helper.isString(e))throw Error("Invalid argument in converter.listen() method: name must be a string, but "+typeof e+" given");if("function"!=typeof r)throw Error("Invalid argument in converter.listen() method: callback must be a function, but "+typeof r+" given");l.hasOwnProperty(e)||(l[e]=[]),l[e].push(r)}function o(e){var r=e.match(/^\s*/)[0].length,t=new RegExp("^\\s{0,"+r+"}","gm");return e.replace(t,"")}var a={},i=[],c=[],l={};r(),this._dispatch=function(e,r,t,n){if(l.hasOwnProperty(e))for(var s=0;s<l[e].length;++s){var o=l[e][s](e,r,this,t,n);o&&"undefined"!=typeof o&&(r=o)}return r},this.listen=function(e,r){return s(e,r),this},this.makeHtml=function(e){if(!e)return e;var r={gHtmlBlocks:[],gHtmlMdBlocks:[],gHtmlSpans:[],gUrls:{},gTitles:{},gDimensions:{},gListLevel:0,hashLinkCounts:{},langExtensions:i,outputModifiers:c,converter:this,ghCodeBlocks:[]};return e=e.replace(/~/g,"~T"),e=e.replace(/\$/g,"~D"),e=e.replace(/\r\n/g,"\n"),e=e.replace(/\r/g,"\n"),a.smartIndentationFix&&(e=o(e)),e=e,e=showdown.subParser("detab")(e,a,r),e=showdown.subParser("stripBlankLines")(e,a,r),showdown.helper.forEach(i,function(t){e=showdown.subParser("runExtension")(t,e,a,r)}),e=showdown.subParser("hashPreCodeTags")(e,a,r),e=showdown.subParser("githubCodeBlocks")(e,a,r),e=showdown.subParser("hashHTMLBlocks")(e,a,r),e=showdown.subParser("hashHTMLSpans")(e,a,r),e=showdown.subParser("stripLinkDefinitions")(e,a,r),e=showdown.subParser("blockGamut")(e,a,r),e=showdown.subParser("unhashHTMLSpans")(e,a,r),e=showdown.subParser("unescapeSpecialChars")(e,a,r),e=e.replace(/~D/g,"$$"),e=e.replace(/~T/g,"~"),showdown.helper.forEach(c,function(t){e=showdown.subParser("runExtension")(t,e,a,r)}),e},this.setOption=function(e,r){a[e]=r},this.getOption=function(e){return a[e]},this.getOptions=function(){return a},this.addExtension=function(e,r){r=r||null,t(e,r)},this.useExtension=function(e){t(e)},this.setFlavor=function(e){if(flavor.hasOwnProperty(e)){var r=flavor[e];for(var t in r)r.hasOwnProperty(t)&&(a[t]=r[t])}},this.removeExtension=function(e){showdown.helper.isArray(e)||(e=[e]);for(var r=0;r<e.length;++r){for(var t=e[r],n=0;n<i.length;++n)i[n]===t&&i[n].splice(n,1);for(var s=0;s<c.length;++n)c[s]===t&&c[s].splice(n,1)}},this.getAllExtensions=function(){return{language:i,output:c}}},showdown.subParser("anchors",function(e,r,t){"use strict";e=t.converter._dispatch("anchors.before",e,r,t);var n=function(e,r,n,s,o,a,i,c){showdown.helper.isUndefined(c)&&(c=""),e=r;var l=n,u=s.toLowerCase(),h=o,d=c;if(!h)if(u||(u=l.toLowerCase().replace(/ ?\n/g," ")),h="#"+u,showdown.helper.isUndefined(t.gUrls[u])){if(!(e.search(/\(\s*\)$/m)>-1))return e;h=""}else h=t.gUrls[u],showdown.helper.isUndefined(t.gTitles[u])||(d=t.gTitles[u]);h=showdown.helper.escapeCharacters(h,"*_",!1);var p='<a href="'+h+'"';return""!==d&&null!==d&&(d=d.replace(/"/g,"&quot;"),d=showdown.helper.escapeCharacters(d,"*_",!1),p+=' title="'+d+'"'),p+=">"+l+"</a>"};return e=e.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)][ ]?(?:\n[ ]*)?\[(.*?)])()()()()/g,n),e=e.replace(/(\[((?:\[[^\]]*]|[^\[\]])*)]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,n),e=e.replace(/(\[([^\[\]]+)])()()()()()/g,n),e=t.converter._dispatch("anchors.after",e,r,t)}),showdown.subParser("autoLinks",function(e,r,t){"use strict";function n(e,r){var t=r;return/^www\./i.test(r)&&(r=r.replace(/^www\./i,"http://www.")),'<a href="'+r+'">'+t+"</a>"}function s(e,r){var t=showdown.subParser("unescapeSpecialChars")(r);return showdown.subParser("encodeEmailAddress")(t)}e=t.converter._dispatch("autoLinks.before",e,r,t);var o=/\b(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+)(?=\s|$)(?!["<>])/gi,a=/<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)>/gi,i=/(?:^|[ \n\t])([A-Za-z0-9!#$%&'*+-\/=?^_`\{|}~\.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?:$|[ \n\t])/gi,c=/<(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi;return e=e.replace(a,n),e=e.replace(c,s),r.simplifiedAutoLink&&(e=e.replace(o,n),e=e.replace(i,s)),e=t.converter._dispatch("autoLinks.after",e,r,t)}),showdown.subParser("blockGamut",function(e,r,t){"use strict";e=t.converter._dispatch("blockGamut.before",e,r,t),e=showdown.subParser("blockQuotes")(e,r,t),e=showdown.subParser("headers")(e,r,t);var n=showdown.subParser("hashBlock")("<hr />",r,t);return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,n),e=e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,n),e=e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm,n),e=showdown.subParser("lists")(e,r,t),e=showdown.subParser("codeBlocks")(e,r,t),e=showdown.subParser("tables")(e,r,t),e=showdown.subParser("hashHTMLBlocks")(e,r,t),e=showdown.subParser("paragraphs")(e,r,t),e=t.converter._dispatch("blockGamut.after",e,r,t)}),showdown.subParser("blockQuotes",function(e,r,t){"use strict";return e=t.converter._dispatch("blockQuotes.before",e,r,t),e=e.replace(/((^[ \t]{0,3}>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,n){var s=n;return s=s.replace(/^[ \t]*>[ \t]?/gm,"~0"),s=s.replace(/~0/g,""),s=s.replace(/^[ \t]+$/gm,""),s=showdown.subParser("githubCodeBlocks")(s,r,t),s=showdown.subParser("blockGamut")(s,r,t),s=s.replace(/(^|\n)/g,"$1  "),s=s.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,r){var t=r;return t=t.replace(/^  /gm,"~0"),t=t.replace(/~0/g,"")}),showdown.subParser("hashBlock")("<blockquote>\n"+s+"\n</blockquote>",r,t)}),e=t.converter._dispatch("blockQuotes.after",e,r,t)}),showdown.subParser("codeBlocks",function(e,r,t){"use strict";e=t.converter._dispatch("codeBlocks.before",e,r,t),e+="~0";var n=/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g;return e=e.replace(n,function(e,n,s){var o=n,a=s,i="\n";return o=showdown.subParser("outdent")(o),o=showdown.subParser("encodeCode")(o),o=showdown.subParser("detab")(o),o=o.replace(/^\n+/g,""),o=o.replace(/\n+$/g,""),r.omitExtraWLInCodeBlocks&&(i=""),o="<pre><code>"+o+i+"</code></pre>",showdown.subParser("hashBlock")(o,r,t)+a}),e=e.replace(/~0/,""),e=t.converter._dispatch("codeBlocks.after",e,r,t)}),showdown.subParser("codeSpans",function(e,r,t){"use strict";return e=t.converter._dispatch("codeSpans.before",e,r,t),"undefined"==typeof e&&(e=""),e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,r,t,n){var s=n;return s=s.replace(/^([ \t]*)/g,""),s=s.replace(/[ \t]*$/g,""),s=showdown.subParser("encodeCode")(s),r+"<code>"+s+"</code>"}),e=t.converter._dispatch("codeSpans.after",e,r,t)}),showdown.subParser("detab",function(e){"use strict";return e=e.replace(/\t(?=\t)/g,"    "),e=e.replace(/\t/g,"~A~B"),e=e.replace(/~B(.+?)~A/g,function(e,r){for(var t=r,n=4-t.length%4,s=0;n>s;s++)t+=" ";return t}),e=e.replace(/~A/g,"    "),e=e.replace(/~B/g,"")}),showdown.subParser("encodeAmpsAndAngles",function(e){"use strict";return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;")}),showdown.subParser("encodeBackslashEscapes",function(e){"use strict";return e=e.replace(/\\(\\)/g,showdown.helper.escapeCharactersCallback),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,showdown.helper.escapeCharactersCallback)}),showdown.subParser("encodeCode",function(e){"use strict";return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=showdown.helper.escapeCharacters(e,"*_{}[]\\",!1)}),showdown.subParser("encodeEmailAddress",function(e){"use strict";var r=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+e.charCodeAt(0).toString(16)+";"},function(e){return e}];return e="mailto:"+e,e=e.replace(/./g,function(e){if("@"===e)e=r[Math.floor(2*Math.random())](e);else if(":"!==e){var t=Math.random();e=t>.9?r[2](e):t>.45?r[1](e):r[0](e)}return e}),e='<a href="'+e+'">'+e+"</a>",e=e.replace(/">.+:/g,'">')}),showdown.subParser("escapeSpecialCharsWithinTagAttributes",function(e){"use strict";var r=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return e=e.replace(r,function(e){var r=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return r=showdown.helper.escapeCharacters(r,"\\`*_",!1)})}),showdown.subParser("githubCodeBlocks",function(e,r,t){"use strict";return r.ghCodeBlocks?(e=t.converter._dispatch("githubCodeBlocks.before",e,r,t),e+="~0",e=e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(e,n,s){var o=r.omitExtraWLInCodeBlocks?"":"\n";return s=showdown.subParser("encodeCode")(s),s=showdown.subParser("detab")(s),s=s.replace(/^\n+/g,""),s=s.replace(/\n+$/g,""),s="<pre><code"+(n?' class="'+n+" language-"+n+'"':"")+">"+s+o+"</code></pre>",s=showdown.subParser("hashBlock")(s,r,t),"\n\n~G"+(t.ghCodeBlocks.push({text:e,codeblock:s})-1)+"G\n\n"}),e=e.replace(/~0/,""),t.converter._dispatch("githubCodeBlocks.after",e,r,t)):e}),showdown.subParser("hashBlock",function(e,r,t){"use strict";return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(t.gHtmlBlocks.push(e)-1)+"K\n\n"}),showdown.subParser("hashElement",function(e,r,t){"use strict";return function(e,r){var n=r;return n=n.replace(/\n\n/g,"\n"),n=n.replace(/^\n/,""),n=n.replace(/\n+$/g,""),n="\n\n~K"+(t.gHtmlBlocks.push(n)-1)+"K\n\n"}}),showdown.subParser("hashHTMLBlocks",function(e,r,t){"use strict";for(var n=["pre","div","h1","h2","h3","h4","h5","h6","blockquote","table","dl","ol","ul","script","noscript","form","fieldset","iframe","math","style","section","header","footer","nav","article","aside","address","audio","canvas","figure","hgroup","output","video","p"],s=function(e,r,n,s){var o=e;return-1!==n.search(/\bmarkdown\b/)&&(o=n+t.converter.makeHtml(r)+s),"\n\n~K"+(t.gHtmlBlocks.push(o)-1)+"K\n\n"},o=0;o<n.length;++o)e=showdown.helper.replaceRecursiveRegExp(e,s,"^(?: |\\t){0,3}<"+n[o]+"\\b[^>]*>","</"+n[o]+">","gim");return e=e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,showdown.subParser("hashElement")(e,r,t)),e=e.replace(/(<!--[\s\S]*?-->)/g,showdown.subParser("hashElement")(e,r,t)),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,showdown.subParser("hashElement")(e,r,t))}),showdown.subParser("hashHTMLSpans",function(e,r,t){"use strict";for(var n=showdown.helper.matchRecursiveRegExp(e,"<code\\b[^>]*>","</code>","gi"),s=0;s<n.length;++s)e=e.replace(n[s][0],"~L"+(t.gHtmlSpans.push(n[s][0])-1)+"L");return e}),showdown.subParser("unhashHTMLSpans",function(e,r,t){"use strict";for(var n=0;n<t.gHtmlSpans.length;++n)e=e.replace("~L"+n+"L",t.gHtmlSpans[n]);return e}),showdown.subParser("hashPreCodeTags",function(e,r,t){"use strict";var n=function(e,r,n,s){var o=n+showdown.subParser("encodeCode")(r)+s;return"\n\n~G"+(t.ghCodeBlocks.push({text:e,codeblock:o})-1)+"G\n\n"};return e=showdown.helper.replaceRecursiveRegExp(e,n,"^(?: |\\t){0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>","^(?: |\\t){0,3}</code>\\s*</pre>","gim")}),showdown.subParser("headers",function(e,r,t){"use strict";function n(e){var r,n=e.replace(/[^\w]/g,"").toLowerCase();return t.hashLinkCounts[n]?r=n+"-"+t.hashLinkCounts[n]++:(r=n,t.hashLinkCounts[n]=1),s===!0&&(s="section"),showdown.helper.isString(s)?s+r:r}e=t.converter._dispatch("headers.before",e,r,t);var s=r.prefixHeaderId,o=isNaN(parseInt(r.headerLevelStart))?1:parseInt(r.headerLevelStart),a=r.smoothLivePreview?/^(.+)[ \t]*\n={2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n=+[ \t]*\n+/gm,i=r.smoothLivePreview?/^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm:/^(.+)[ \t]*\n-+[ \t]*\n+/gm;return e=e.replace(a,function(e,s){var a=showdown.subParser("spanGamut")(s,r,t),i=r.noHeaderId?"":' id="'+n(s)+'"',c=o,l="<h"+c+i+">"+a+"</h"+c+">";return showdown.subParser("hashBlock")(l,r,t)}),e=e.replace(i,function(e,s){var a=showdown.subParser("spanGamut")(s,r,t),i=r.noHeaderId?"":' id="'+n(s)+'"',c=o+1,l="<h"+c+i+">"+a+"</h"+c+">";return showdown.subParser("hashBlock")(l,r,t)}),e=e.replace(/^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm,function(e,s,a){var i=showdown.subParser("spanGamut")(a,r,t),c=r.noHeaderId?"":' id="'+n(a)+'"',l=o-1+s.length,u="<h"+l+c+">"+i+"</h"+l+">";return showdown.subParser("hashBlock")(u,r,t)}),e=t.converter._dispatch("headers.after",e,r,t)}),showdown.subParser("images",function(e,r,t){"use strict";function n(e,r,n,s,o,a,i,c){var l=t.gUrls,u=t.gTitles,h=t.gDimensions;if(n=n.toLowerCase(),c||(c=""),""===s||null===s){if((""===n||null===n)&&(n=r.toLowerCase().replace(/ ?\n/g," ")),s="#"+n,showdown.helper.isUndefined(l[n]))return e;s=l[n],showdown.helper.isUndefined(u[n])||(c=u[n]),showdown.helper.isUndefined(h[n])||(o=h[n].width,a=h[n].height)}r=r.replace(/"/g,"&quot;"),r=showdown.helper.escapeCharacters(r,"*_",!1),s=showdown.helper.escapeCharacters(s,"*_",!1);var d='<img src="'+s+'" alt="'+r+'"';return c&&(c=c.replace(/"/g,"&quot;"),c=showdown.helper.escapeCharacters(c,"*_",!1),d+=' title="'+c+'"'),o&&a&&(o="*"===o?"auto":o,a="*"===a?"auto":a,d+=' width="'+o+'"',d+=' height="'+a+'"'),d+=" />"}e=t.converter._dispatch("images.before",e,r,t);var s=/!\[(.*?)]\s?\([ \t]*()<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(['"])(.*?)\6[ \t]*)?\)/g,o=/!\[([^\]]*?)] ?(?:\n *)?\[(.*?)]()()()()()/g;return e=e.replace(o,n),e=e.replace(s,n),e=t.converter._dispatch("images.after",e,r,t)}),showdown.subParser("italicsAndBold",function(e,r,t){"use strict";return e=t.converter._dispatch("italicsAndBold.before",e,r,t),r.literalMidWordUnderscores?(e=e.replace(/(^|\s|>|\b)__(?=\S)([\s\S]+?)__(?=\b|<|\s|$)/gm,"$1<strong>$2</strong>"),e=e.replace(/(^|\s|>|\b)_(?=\S)([\s\S]+?)_(?=\b|<|\s|$)/gm,"$1<em>$2</em>"),e=e.replace(/(\*\*)(?=\S)([^\r]*?\S[*]*)\1/g,"<strong>$2</strong>"),e=e.replace(/(\*)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")):(e=e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),e=e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>")),e=t.converter._dispatch("italicsAndBold.after",e,r,t)}),showdown.subParser("lists",function(e,r,t){"use strict";function n(e,n){t.gListLevel++,e=e.replace(/\n{2,}$/,"\n"),e+="~0";var s=/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,o=/\n[ \t]*\n(?!~0)/.test(e);return e=e.replace(s,function(e,n,s,a,i,c,l){l=l&&""!==l.trim();var u=showdown.subParser("outdent")(i,r,t),h="";return c&&r.tasklists&&(h=' class="task-list-item" style="list-style-type: none;"',u=u.replace(/^[ \t]*\[(x|X| )?]/m,function(){var e='<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';return l&&(e+=" checked"),e+=">"})),n||u.search(/\n{2,}/)>-1?(u=showdown.subParser("githubCodeBlocks")(u,r,t),u=showdown.subParser("blockGamut")(u,r,t)):(u=showdown.subParser("lists")(u,r,t),u=u.replace(/\n$/,""),u=o?showdown.subParser("paragraphs")(u,r,t):showdown.subParser("spanGamut")(u,r,t)),u="\n<li"+h+">"+u+"</li>\n"}),e=e.replace(/~0/g,""),t.gListLevel--,n&&(e=e.replace(/\s+$/,"")),e}function s(e,r,t){var s="ul"===r?/^ {0,2}\d+\.[ \t]/gm:/^ {0,2}[*+-][ \t]/gm,o=[],a="";if(-1!==e.search(s)){!function c(e){var o=e.search(s);-1!==o?(a+="\n\n<"+r+">"+n(e.slice(0,o),!!t)+"</"+r+">\n\n",r="ul"===r?"ol":"ul",s="ul"===r?/^ {0,2}\d+\.[ \t]/gm:/^ {0,2}[*+-][ \t]/gm,c(e.slice(o))):a+="\n\n<"+r+">"+n(e,!!t)+"</"+r+">\n\n"}(e);for(var i=0;i<o.length;++i);}else a="\n\n<"+r+">"+n(e,!!t)+"</"+r+">\n\n";return a}e=t.converter._dispatch("lists.before",e,r,t),e+="~0";var o=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return t.gListLevel?e=e.replace(o,function(e,r,t){var n=t.search(/[*+-]/g)>-1?"ul":"ol";return s(r,n,!0)}):(o=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,e=e.replace(o,function(e,r,t,n){var o=n.search(/[*+-]/g)>-1?"ul":"ol";return s(t,o)})),e=e.replace(/~0/,""),e=t.converter._dispatch("lists.after",e,r,t)}),showdown.subParser("outdent",function(e){"use strict";return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,"")}),showdown.subParser("paragraphs",function(e,r,t){"use strict";e=t.converter._dispatch("paragraphs.before",e,r,t),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");for(var n=e.split(/\n{2,}/g),s=[],o=n.length,a=0;o>a;a++){var i=n[a];i.search(/~(K|G)(\d+)\1/g)>=0?s.push(i):(i=showdown.subParser("spanGamut")(i,r,t),i=i.replace(/^([ \t]*)/g,"<p>"),i+="</p>",s.push(i))}for(o=s.length,a=0;o>a;a++){for(var c="",l=s[a],u=!1;l.search(/~(K|G)(\d+)\1/)>=0;){var h=RegExp.$1,d=RegExp.$2;c="K"===h?t.gHtmlBlocks[d]:u?showdown.subParser("encodeCode")(t.ghCodeBlocks[d].text):t.ghCodeBlocks[d].codeblock,c=c.replace(/\$/g,"$$$$"),l=l.replace(/(\n\n)?~(K|G)\d+\2(\n\n)?/,c),/^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l)&&(u=!0)}s[a]=l}return e=s.join("\n\n"),e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,""),t.converter._dispatch("paragraphs.after",e,r,t)}),showdown.subParser("runExtension",function(e,r,t,n){"use strict";if(e.filter)r=e.filter(r,n.converter,t);else if(e.regex){var s=e.regex;!s instanceof RegExp&&(s=new RegExp(s,"g")),r=r.replace(s,e.replace)}return r}),showdown.subParser("spanGamut",function(e,r,t){"use strict";return e=t.converter._dispatch("spanGamut.before",e,r,t),e=showdown.subParser("codeSpans")(e,r,t),e=showdown.subParser("escapeSpecialCharsWithinTagAttributes")(e,r,t),e=showdown.subParser("encodeBackslashEscapes")(e,r,t),e=showdown.subParser("images")(e,r,t),e=showdown.subParser("anchors")(e,r,t),e=showdown.subParser("autoLinks")(e,r,t),e=showdown.subParser("encodeAmpsAndAngles")(e,r,t),e=showdown.subParser("italicsAndBold")(e,r,t),e=showdown.subParser("strikethrough")(e,r,t),e=e.replace(/  +\n/g," <br />\n"),e=t.converter._dispatch("spanGamut.after",e,r,t)}),showdown.subParser("strikethrough",function(e,r,t){"use strict";return r.strikethrough&&(e=t.converter._dispatch("strikethrough.before",e,r,t),e=e.replace(/(?:~T){2}([\s\S]+?)(?:~T){2}/g,"<del>$1</del>"),e=t.converter._dispatch("strikethrough.after",e,r,t)),e}),showdown.subParser("stripBlankLines",function(e){"use strict";return e.replace(/^[ \t]+$/gm,"")}),showdown.subParser("stripLinkDefinitions",function(e,r,t){"use strict";var n=/^ {0,3}\[(.+)]:[ \t]*\n?[ \t]*<?(\S+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=~0))/gm;return e+="~0",e=e.replace(n,function(e,n,s,o,a,i,c){return n=n.toLowerCase(),t.gUrls[n]=showdown.subParser("encodeAmpsAndAngles")(s),i?i+c:(c&&(t.gTitles[n]=c.replace(/"|'/g,"&quot;")),r.parseImgDimensions&&o&&a&&(t.gDimensions[n]={width:o,height:a}),"")}),e=e.replace(/~0/,"")}),showdown.subParser("tables",function(e,r,t){"use strict";function n(e){return/^:[ \t]*--*$/.test(e)?' style="text-align:left;"':/^--*[ \t]*:[ \t]*$/.test(e)?' style="text-align:right;"':/^:[ \t]*--*[ \t]*:$/.test(e)?' style="text-align:center;"':""}function s(e,n){var s="";return e=e.trim(),r.tableHeaderId&&(s=' id="'+e.replace(/ /g,"_").toLowerCase()+'"'),e=showdown.subParser("spanGamut")(e,r,t),"<th"+s+n+">"+e+"</th>\n"}function o(e,n){var s=showdown.subParser("spanGamut")(e,r,t);return"<td"+n+">"+s+"</td>\n"}function a(e,r){for(var t="<table>\n<thead>\n<tr>\n",n=e.length,s=0;n>s;++s)t+=e[s];for(t+="</tr>\n</thead>\n<tbody>\n",s=0;s<r.length;++s){t+="<tr>\n";for(var o=0;n>o;++o)t+=r[s][o];t+="</tr>\n"}return t+="</tbody>\n</table>\n"}if(!r.tables)return e;var i=/^[ \t]{0,3}\|?.+\|.+\n[ \t]{0,3}\|?[ \t]*:?[ \t]*(?:-|=){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:-|=){2,}[\s\S]+?(?:\n\n|~0)/gm;return e=t.converter._dispatch("tables.before",e,r,t),e=e.replace(i,function(e){var r,t=e.split("\n");for(r=0;r<t.length;++r)/^[ \t]{0,3}\|/.test(t[r])&&(t[r]=t[r].replace(/^[ \t]{0,3}\|/,"")),/\|[ \t]*$/.test(t[r])&&(t[r]=t[r].replace(/\|[ \t]*$/,""));var i=t[0].split("|").map(function(e){return e.trim()}),c=t[1].split("|").map(function(e){return e.trim()}),l=[],u=[],h=[],d=[];for(t.shift(),t.shift(),r=0;r<t.length;++r)""!==t[r].trim()&&l.push(t[r].split("|").map(function(e){return e.trim()}));if(i.length<c.length)return e;for(r=0;r<c.length;++r)h.push(n(c[r]));for(r=0;r<i.length;++r)showdown.helper.isUndefined(h[r])&&(h[r]=""),u.push(s(i[r],h[r]));for(r=0;r<l.length;++r){for(var p=[],w=0;w<u.length;++w)showdown.helper.isUndefined(l[r][w]),p.push(o(l[r][w],h[w]));d.push(p)}return a(u,d)}),e=t.converter._dispatch("tables.after",e,r,t)}),showdown.subParser("unescapeSpecialChars",function(e){"use strict";return e=e.replace(/~E(\d+)E/g,function(e,r){var t=parseInt(r);return String.fromCharCode(t)})}),module.exports=showdown;