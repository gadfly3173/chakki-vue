/* eslint-disable */
/* PrismJS 1.23.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+apacheconf+asciidoc+aspnet+bash+basic+c+csharp+cpp+cmake+dart+diff+django+ftl+git+go+http+java+javadoc+javadoclike+javastacktrace+json+json5+jsonp+jsstacktrace+js-templates+kotlin+latex+lua+makefile+markdown+markup-templating+matlab+mongodb+nginx+php+plsql+powershell+properties+python+rest+ruby+sass+scss+solution-file+sql+t4-templating+t4-cs+t4-vb+vbnet+vim+visual-basic+xml-doc+yaml */
var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function(u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      e = {},
      M = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof W
              ? new W(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ')
          },
          type: function(e) {
            return Object.prototype.toString.call(e).slice(8, -1)
          },
          objId: function(e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++n }), e.__id
          },
          clone: function t(e, r) {
            var a, n
            switch (((r = r || {}), M.util.type(e))) {
              case 'Object':
                if (((n = M.util.objId(e)), r[n])) return r[n]
                for (var i in ((a = {}), (r[n] = a), e)) e.hasOwnProperty(i) && (a[i] = t(e[i], r))
                return a
              case 'Array':
                return (
                  (n = M.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function(e, n) {
                        a[n] = t(e, r)
                      }),
                      a)
                )
              default:
                return e
            }
          },
          getLanguage: function(e) {
            for (; e && !c.test(e.className); ) e = e.parentElement
            return e ? (e.className.match(c) || [, 'none'])[1].toLowerCase() : 'none'
          },
          currentScript: function() {
            if ('undefined' == typeof document) return null
            if ('currentScript' in document) return document.currentScript
            try {
              throw new Error()
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1]
              if (n) {
                var t = document.getElementsByTagName('script')
                for (var r in t) if (t[r].src == n) return t[r]
              }
              return null
            }
          },
          isActive: function(e, n, t) {
            for (var r = 'no-' + n; e; ) {
              var a = e.classList
              if (a.contains(n)) return !0
              if (a.contains(r)) return !1
              e = e.parentElement
            }
            return !!t
          },
        },
        languages: {
          plain: e,
          plaintext: e,
          text: e,
          txt: e,
          extend: function(e, n) {
            var t = M.util.clone(M.languages[e])
            for (var r in n) t[r] = n[r]
            return t
          },
          insertBefore: function(t, e, n, r) {
            var a = (r = r || M.languages)[t],
              i = {}
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                if (l == e) for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o])
                n.hasOwnProperty(l) || (i[l] = a[l])
              }
            var s = r[t]
            return (
              (r[t] = i),
              M.languages.DFS(M.languages, function(e, n) {
                n === s && e != t && (this[e] = i)
              }),
              i
            )
          },
          DFS: function e(n, t, r, a) {
            a = a || {}
            var i = M.util.objId
            for (var l in n)
              if (n.hasOwnProperty(l)) {
                t.call(n, l, n[l], r || l)
                var o = n[l],
                  s = M.util.type(o)
                'Object' !== s || a[i(o)]
                  ? 'Array' !== s || a[i(o)] || ((a[i(o)] = !0), e(o, t, l, a))
                  : ((a[i(o)] = !0), e(o, t, null, a))
              }
          },
        },
        plugins: {},
        highlightAll: function(e, n) {
          M.highlightAllUnder(document, e, n)
        },
        highlightAllUnder: function(e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          }
          M.hooks.run('before-highlightall', r),
            (r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector))),
            M.hooks.run('before-all-elements-highlight', r)
          for (var a, i = 0; (a = r.elements[i++]); ) M.highlightElement(a, !0 === n, r.callback)
        },
        highlightElement: function(e, n, t) {
          var r = M.util.getLanguage(e),
            a = M.languages[r]
          e.className = e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r
          var i = e.parentElement
          i &&
            'pre' === i.nodeName.toLowerCase() &&
            (i.className = i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r)
          var l = { element: e, language: r, grammar: a, code: e.textContent }
          function o(e) {
            ;(l.highlightedCode = e),
              M.hooks.run('before-insert', l),
              (l.element.innerHTML = l.highlightedCode),
              M.hooks.run('after-highlight', l),
              M.hooks.run('complete', l),
              t && t.call(l.element)
          }
          if ((M.hooks.run('before-sanity-check', l), !l.code))
            return M.hooks.run('complete', l), void (t && t.call(l.element))
          if ((M.hooks.run('before-highlight', l), l.grammar))
            if (n && u.Worker) {
              var s = new Worker(M.filename)
              ;(s.onmessage = function(e) {
                o(e.data)
              }),
                s.postMessage(JSON.stringify({ language: l.language, code: l.code, immediateClose: !0 }))
            } else o(M.highlight(l.code, l.grammar, l.language))
          else o(M.util.encode(l.code))
        },
        highlight: function(e, n, t) {
          var r = { code: e, grammar: n, language: t }
          return (
            M.hooks.run('before-tokenize', r),
            (r.tokens = M.tokenize(r.code, r.grammar)),
            M.hooks.run('after-tokenize', r),
            W.stringify(M.util.encode(r.tokens), r.language)
          )
        },
        tokenize: function(e, n) {
          var t = n.rest
          if (t) {
            for (var r in t) n[r] = t[r]
            delete n.rest
          }
          var a = new i()
          return (
            I(a, a.head, e),
            (function e(n, t, r, a, i, l) {
              for (var o in r)
                if (r.hasOwnProperty(o) && r[o]) {
                  var s = r[o]
                  s = Array.isArray(s) ? s : [s]
                  for (var u = 0; u < s.length; ++u) {
                    if (l && l.cause == o + ',' + u) return
                    var c = s[u],
                      g = c.inside,
                      f = !!c.lookbehind,
                      h = !!c.greedy,
                      d = c.alias
                    if (h && !c.pattern.global) {
                      var v = c.pattern.toString().match(/[imsuy]*$/)[0]
                      c.pattern = RegExp(c.pattern.source, v + 'g')
                    }
                    for (
                      var p = c.pattern || c, m = a.next, y = i;
                      m !== t.tail && !(l && y >= l.reach);
                      y += m.value.length, m = m.next
                    ) {
                      var k = m.value
                      if (t.length > n.length) return
                      if (!(k instanceof W)) {
                        var b,
                          x = 1
                        if (h) {
                          if (!(b = z(p, y, n, f))) break
                          var w = b.index,
                            A = b.index + b[0].length,
                            P = y
                          for (P += m.value.length; P <= w; ) (m = m.next), (P += m.value.length)
                          if (((P -= m.value.length), (y = P), m.value instanceof W)) continue
                          for (var S = m; S !== t.tail && (P < A || 'string' == typeof S.value); S = S.next)
                            x++, (P += S.value.length)
                          x--, (k = n.slice(y, P)), (b.index -= y)
                        } else if (!(b = z(p, 0, k, f))) continue
                        var w = b.index,
                          E = b[0],
                          O = k.slice(0, w),
                          L = k.slice(w + E.length),
                          N = y + k.length
                        l && N > l.reach && (l.reach = N)
                        var j = m.prev
                        O && ((j = I(t, j, O)), (y += O.length)), q(t, j, x)
                        var C = new W(o, g ? M.tokenize(E, g) : E, d, E)
                        if (((m = I(t, j, C)), L && I(t, m, L), 1 < x)) {
                          var _ = { cause: o + ',' + u, reach: N }
                          e(n, t, r, m.prev, y, _), l && _.reach > l.reach && (l.reach = _.reach)
                        }
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function(e) {
              var n = [],
                t = e.head.next
              for (; t !== e.tail; ) n.push(t.value), (t = t.next)
              return n
            })(a)
          )
        },
        hooks: {
          all: {},
          add: function(e, n) {
            var t = M.hooks.all
            ;(t[e] = t[e] || []), t[e].push(n)
          },
          run: function(e, n) {
            var t = M.hooks.all[e]
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n)
          },
        },
        Token: W,
      }
    function W(e, n, t, r) {
      ;(this.type = e), (this.content = n), (this.alias = t), (this.length = 0 | (r || '').length)
    }
    function z(e, n, t, r) {
      e.lastIndex = n
      var a = e.exec(t)
      if (a && r && a[1]) {
        var i = a[1].length
        ;(a.index += i), (a[0] = a[0].slice(i))
      }
      return a
    }
    function i() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null }
      ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
    }
    function I(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r }
      return (n.next = a), (r.prev = a), e.length++, a
    }
    function q(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
      ;((n.next = r).prev = n), (e.length -= a)
    }
    if (
      ((u.Prism = M),
      (W.stringify = function n(e, t) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) {
          var r = ''
          return (
            e.forEach(function(e) {
              r += n(e, t)
            }),
            r
          )
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: 'span',
            classes: ['token', e.type],
            attributes: {},
            language: t,
          },
          i = e.alias
        i && (Array.isArray(i) ? Array.prototype.push.apply(a.classes, i) : a.classes.push(i)), M.hooks.run('wrap', a)
        var l = ''
        for (var o in a.attributes) l += ' ' + o + '="' + (a.attributes[o] || '').replace(/"/g, '&quot;') + '"'
        return '<' + a.tag + ' class="' + a.classes.join(' ') + '"' + l + '>' + a.content + '</' + a.tag + '>'
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (M.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function(e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose
                u.postMessage(M.highlight(r, M.languages[t], t)), a && u.close()
              },
              !1,
            )),
        M
      )
    var t = M.util.currentScript()
    function r() {
      M.manual || M.highlightAll()
    }
    if ((t && ((M.filename = t.src), t.hasAttribute('data-manual') && (M.manual = !0)), !M.manual)) {
      var a = document.readyState
      'loading' === a || ('interactive' === a && t && t.defer)
        ? document.addEventListener('DOMContentLoaded', r)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(r)
        : window.setTimeout(r, 16)
    }
    return M
  })(_self)
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': { pattern: /(\[)[\s\S]+(?=\]>$)/, lookbehind: !0, greedy: !0, inside: null },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: { punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/] },
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: [{ pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' }, /&#x?[\da-f]{1,8};/i],
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside = Prism.languages.markup),
  Prism.hooks.add('wrap', function(a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function(a, e) {
      var s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      var t = { 'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s } }
      t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      var n = {}
      ;(n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function() {
              return a
            },
          ),
          'i',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore('markup', 'cdata', n)
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function(a, e) {
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp('(^|["\'\\s])(?:' + a + ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))', 'i'),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, 'language-' + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
            },
          },
        },
      })
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml)
!(function(s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector',
        },
        keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: !0 },
      },
    },
    url: {
      pattern: RegExp('\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)', 'i'),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' },
      },
    },
    selector: RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + e.source + ')*(?=\\s*\\{)'),
    string: { pattern: e, greedy: !0 },
    property: /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  var t = s.languages.markup
  t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)catch\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        'regex-source': {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: 'language-regex',
          inside: Prism.languages.regex,
        },
        'regex-flags': /[a-z]+$/,
        'regex-delimiter': /^\/|\/$/,
      },
    },
    'function-variable': {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function',
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined('script', 'javascript'),
    Prism.languages.markup.tag.addAttribute(
      'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
      'javascript',
    )),
  (Prism.languages.js = Prism.languages.javascript)
Prism.languages.apacheconf = {
  comment: /#.*/,
  'directive-inline': {
    pattern: /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
    lookbehind: !0,
    alias: 'property',
  },
  'directive-block': {
    pattern: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b.*>/i,
    inside: {
      'directive-block': { pattern: /^<\/?\w+/, inside: { punctuation: /^<\/?/ }, alias: 'tag' },
      'directive-block-parameter': {
        pattern: /.*[^>]/,
        inside: {
          punctuation: /:/,
          string: { pattern: /("|').*\1/, inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ } },
        },
        alias: 'attr-value',
      },
      punctuation: />/,
    },
    alias: 'tag',
  },
  'directive-flags': { pattern: /\[(?:[\w=],?)+\]/, alias: 'keyword' },
  string: { pattern: /("|').*\1/, inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ } },
  variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
  regex: /\^?.*\$|\^.*\$?/,
}
!(function(t) {
  var n = {
      pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\[\]\\]|\\.)*\]|[^\[\]\\"'$`]|\\.)*\]/m,
      lookbehind: !0,
      inside: {
        quoted: { pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/, inside: { punctuation: /^[$`]|[$`]$/ } },
        interpreted: { pattern: /'(?:[^'\\]|\\.)*'/, inside: { punctuation: /^'|'$/ } },
        string: /"(?:[^"\\]|\\.)*"/,
        variable: /\w+(?==)/,
        punctuation: /^\[|\]$|,/,
        operator: /=/,
        'attr-value': /(?!^\s+$).+/,
      },
    },
    a = (t.languages.asciidoc = {
      'comment-block': { pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m, alias: 'comment' },
      table: {
        pattern: /^\|={3,}(?:(?:\r?\n|\r(?!\n)).*)*?(?:\r?\n|\r)\|={3,}$/m,
        inside: {
          specifiers: {
            pattern: /(?!\|)(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*])?(?:[<^>](?:\.[<^>])?|\.[<^>])?[a-z]*)(?=\|)/,
            alias: 'attr-value',
          },
          punctuation: { pattern: /(^|[^\\])[|!]=*/, lookbehind: !0 },
        },
      },
      'passthrough-block': {
        pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^\++|\++$/ },
      },
      'literal-block': {
        pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/ },
      },
      'other-block': {
        pattern: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/ },
      },
      'list-punctuation': {
        pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
        lookbehind: !0,
        alias: 'punctuation',
      },
      'list-label': { pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im, lookbehind: !0, alias: 'symbol' },
      'indented-block': { pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/, lookbehind: !0 },
      comment: /^\/\/.*/m,
      title: {
        pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
        alias: 'important',
        inside: { punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/ },
      },
      'attribute-entry': { pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m, alias: 'tag' },
      attributes: n,
      hr: { pattern: /^'{3,}$/m, alias: 'punctuation' },
      'page-break': { pattern: /^<{3,}$/m, alias: 'punctuation' },
      admonition: { pattern: /^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m, alias: 'keyword' },
      callout: [
        { pattern: /(^[ \t]*)<?\d*>/m, lookbehind: !0, alias: 'symbol' },
        { pattern: /<\d+>/, alias: 'symbol' },
      ],
      macro: {
        pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
        inside: {
          function: /^[a-z\d-]+(?=:)/,
          punctuation: /^::?/,
          attributes: { pattern: /(?:\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/, inside: n.inside },
        },
      },
      inline: {
        pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
        lookbehind: !0,
        inside: {
          attributes: n,
          url: {
            pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
            inside: { punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/ },
          },
          'attribute-ref': {
            pattern: /^\{.+\}$/,
            inside: {
              variable: { pattern: /(^\{)[a-z\d,+_-]+/, lookbehind: !0 },
              operator: /^[=?!#%@$]|!(?=[:}])/,
              punctuation: /^\{|\}$|::?/,
            },
          },
          italic: { pattern: /^(['_])[\s\S]+\1$/, inside: { punctuation: /^(?:''?|__?)|(?:''?|__?)$/ } },
          bold: { pattern: /^\*[\s\S]+\*$/, inside: { punctuation: /^\*\*?|\*\*?$/ } },
          punctuation: /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/,
        },
      },
      replacement: { pattern: /\((?:C|TM|R)\)/, alias: 'builtin' },
      entity: /&#?[\da-z]{1,8};/i,
      'line-continuation': { pattern: /(^| )\+$/m, lookbehind: !0, alias: 'punctuation' },
    })
  function i(t) {
    for (var n = {}, i = 0, e = (t = t.split(' ')).length; i < e; i++) n[t[i]] = a[t[i]]
    return n
  }
  ;(n.inside.interpreted.inside.rest = i('macro inline replacement entity')),
    (a['passthrough-block'].inside.rest = i('macro')),
    (a['literal-block'].inside.rest = i('callout')),
    (a.table.inside.rest = i(
      'comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation',
    )),
    (a['other-block'].inside.rest = i(
      'table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation',
    )),
    (a.title.inside.rest = i('macro inline replacement entity')),
    t.hooks.add('wrap', function(t) {
      'entity' === t.type && (t.attributes.title = t.content.replace(/&amp;/, '&'))
    }),
    (t.languages.adoc = t.languages.asciidoc)
})(Prism)
!(function(s) {
  function a(e, s) {
    return e.replace(/<<(\d+)>>/g, function(e, n) {
      return '(?:' + s[+n] + ')'
    })
  }
  function t(e, n, s) {
    return RegExp(a(e, n), s || '')
  }
  function e(e, n) {
    for (var s = 0; s < n; s++)
      e = e.replace(/<<self>>/g, function() {
        return '(?:' + e + ')'
      })
    return e.replace(/<<self>>/g, '[^\\s\\S]')
  }
  var n = 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
    i = 'class enum interface struct',
    r =
      'add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where',
    o =
      'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
  function l(e) {
    return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b'
  }
  var d = l(i),
    p = RegExp(l(n + ' ' + i + ' ' + r + ' ' + o)),
    c = l(i + ' ' + r + ' ' + o),
    u = l(n + ' ' + i + ' ' + o),
    g = e('<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>', 2),
    b = e('\\((?:[^()]|<<self>>)*\\)', 2),
    h = '@?\\b[A-Za-z_]\\w*\\b',
    f = a('<<0>>(?:\\s*<<1>>)?', [h, g]),
    m = a('(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*', [c, f]),
    k = '\\[\\s*(?:,\\s*)*\\]',
    y = a('<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?', [m, k]),
    w = a('(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?', [
      a('\\(<<0>>+(?:,<<0>>+)+\\)', [a('[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>', [g, b, k])]),
      m,
      k,
    ]),
    v = { keyword: p, punctuation: /[<>()?,.:[\]]/ },
    x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
    $ = '"(?:\\\\.|[^\\\\"\r\n])*"'
  ;(s.languages.csharp = s.languages.extend('clike', {
    string: [
      { pattern: t('(^|[^$\\\\])<<0>>', ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']), lookbehind: !0, greedy: !0 },
      { pattern: t('(^|[^@$\\\\])<<0>>', [$]), lookbehind: !0, greedy: !0 },
      { pattern: RegExp(x), greedy: !0, alias: 'character' },
    ],
    'class-name': [
      { pattern: t('(\\busing\\s+static\\s+)<<0>>(?=\\s*;)', [m]), lookbehind: !0, inside: v },
      { pattern: t('(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)', [h, w]), lookbehind: !0, inside: v },
      { pattern: t('(\\busing\\s+)<<0>>(?=\\s*=)', [h]), lookbehind: !0 },
      { pattern: t('(\\b<<0>>\\s+)<<1>>', [d, f]), lookbehind: !0, inside: v },
      { pattern: t('(\\bcatch\\s*\\(\\s*)<<0>>', [m]), lookbehind: !0, inside: v },
      { pattern: t('(\\bwhere\\s+)<<0>>', [h]), lookbehind: !0 },
      { pattern: t('(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>', [y]), lookbehind: !0, inside: v },
      { pattern: t('\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))', [w, u, h]), inside: v },
    ],
    keyword: p,
    number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/,
  })),
    s.languages.insertBefore('csharp', 'number', { range: { pattern: /\.\./, alias: 'operator' } }),
    s.languages.insertBefore('csharp', 'punctuation', {
      'named-parameter': { pattern: t('([(,]\\s*)<<0>>(?=\\s*:)', [h]), lookbehind: !0, alias: 'punctuation' },
    }),
    s.languages.insertBefore('csharp', 'class-name', {
      namespace: {
        pattern: t('(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])', [h]),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      'type-expression': {
        pattern: t('(\\b(?:default|typeof|sizeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))', [b]),
        lookbehind: !0,
        alias: 'class-name',
        inside: v,
      },
      'return-type': {
        pattern: t('<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))', [w, m]),
        inside: v,
        alias: 'class-name',
      },
      'constructor-invocation': {
        pattern: t('(\\bnew\\s+)<<0>>(?=\\s*[[({])', [w]),
        lookbehind: !0,
        inside: v,
        alias: 'class-name',
      },
      'generic-method': {
        pattern: t('<<0>>\\s*<<1>>(?=\\s*\\()', [h, g]),
        inside: { function: t('^<<0>>', [h]), generic: { pattern: RegExp(g), alias: 'class-name', inside: v } },
      },
      'type-list': {
        pattern: t(
          '\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))',
          [d, f, h, w, p.source],
        ),
        lookbehind: !0,
        inside: { keyword: p, 'class-name': { pattern: RegExp(w), greedy: !0, inside: v }, punctuation: /,/ },
      },
      preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: 'property',
        inside: {
          directive: {
            pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: 'keyword',
          },
        },
      },
    })
  var _ = $ + '|' + x,
    B = a('/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>', [_]),
    E = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
    R = '\\b(?:assembly|event|field|method|module|param|property|return|type)\\b',
    P = a('<<0>>(?:\\s*\\(<<1>>*\\))?', [m, E])
  s.languages.insertBefore('csharp', 'class-name', {
    attribute: {
      pattern: t('((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])', [R, P]),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: t('^<<0>>(?=\\s*:)', [R]), alias: 'keyword' },
        'attribute-arguments': { pattern: t('\\(<<0>>*\\)', [E]), inside: s.languages.csharp },
        'class-name': { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/,
      },
    },
  })
  var z = ':[^}\r\n]+',
    S = e(a('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [B]), 2),
    j = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [S, z]),
    A = e(a('[^"\'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)', [_]), 2),
    F = a('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [A, z])
  function U(e, n) {
    return {
      interpolation: {
        pattern: t('((?:^|[^{])(?:\\{\\{)*)<<0>>', [e]),
        lookbehind: !0,
        inside: {
          'format-string': {
            pattern: t('(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)', [n, z]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
          },
          punctuation: /^\{|\}$/,
          expression: { pattern: /[\s\S]+/, alias: 'language-csharp', inside: s.languages.csharp },
        },
      },
      string: /[\s\S]+/,
    }
  }
  s.languages.insertBefore('csharp', 'string', {
    'interpolation-string': [
      {
        pattern: t('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [j]),
        lookbehind: !0,
        greedy: !0,
        inside: U(j, S),
      },
      {
        pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [F]),
        lookbehind: !0,
        greedy: !0,
        inside: U(F, A),
      },
    ],
  })
})(Prism),
  (Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp)
;(Prism.languages.aspnet = Prism.languages.extend('markup', {
  'page-directive': {
    pattern: /<%\s*@.*%>/i,
    alias: 'tag',
    inside: {
      'page-directive': {
        pattern: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
        alias: 'tag',
      },
      rest: Prism.languages.markup.tag.inside,
    },
  },
  directive: {
    pattern: /<%.*%>/i,
    alias: 'tag',
    inside: { directive: { pattern: /<%\s*?[$=%#:]{0,2}|%>/i, alias: 'tag' }, rest: Prism.languages.csharp },
  },
})),
  (Prism.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
  Prism.languages.insertBefore(
    'inside',
    'punctuation',
    { directive: Prism.languages.aspnet.directive },
    Prism.languages.aspnet.tag.inside['attr-value'],
  ),
  Prism.languages.insertBefore('aspnet', 'comment', {
    'asp-comment': { pattern: /<%--[\s\S]*?--%>/, alias: ['asp', 'comment'] },
  }),
  Prism.languages.insertBefore('aspnet', Prism.languages.javascript ? 'script' : 'tag', {
    'asp-script': {
      pattern: /(<script(?=.*runat=['"]?server['"]?)[^>]*>)[\s\S]*?(?=<\/script>)/i,
      lookbehind: !0,
      alias: ['asp', 'script'],
      inside: Prism.languages.csharp || {},
    },
  })
!(function(e) {
  var t =
      '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b',
    n = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: !0, alias: 'punctuation', inside: null },
    a = {
      bash: n,
      environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 }, /^\$\(\(/],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/,
          },
        },
        { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: !0, inside: { variable: /^\$\(|^`|\)$|`$/ } },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: { pattern: RegExp('(\\{)' + t), lookbehind: !0, alias: 'constant' },
          },
        },
        /\$(?:\w+|[#?*!@$])/,
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    }
  ;(e.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    'function-name': [
      { pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: !0, alias: 'function' },
      { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' },
    ],
    'for-or-select': { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: 'variable', lookbehind: !0 },
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
      inside: { environment: { pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t), lookbehind: !0, alias: 'constant' } },
      alias: 'variable',
      lookbehind: !0,
    },
    string: [
      { pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: !0, greedy: !0, inside: a },
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        inside: { bash: n },
      },
      {
        pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
        lookbehind: !0,
        greedy: !0,
        inside: a,
      },
    ],
    environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
    variable: a.variable,
    function: {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    keyword: {
      pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
      lookbehind: !0,
    },
    builtin: {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
      lookbehind: !0,
      alias: 'class-name',
    },
    boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/, lookbehind: !0 },
    'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
    operator: {
      pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
      inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
  }),
    (n.inside = e.languages.bash)
  for (
    var s = [
        'comment',
        'function-name',
        'for-or-select',
        'assign-left',
        'string',
        'environment',
        'function',
        'keyword',
        'builtin',
        'boolean',
        'file-descriptor',
        'operator',
        'punctuation',
        'number',
      ],
      i = a.variable[1].inside,
      o = 0;
    o < s.length;
    o++
  )
    i[s[o]] = e.languages.bash[s[o]]
  e.languages.shell = e.languages.bash
})(Prism)
Prism.languages.basic = {
  comment: { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
  string: { pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i, greedy: !0 },
  number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
  keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
  function: /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
  operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
  punctuation: /[,;:()]/,
}
;(Prism.languages.c = Prism.languages.extend('clike', {
  comment: { pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0,
  },
  keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
  function: /[a-z_]\w*(?=\s*\()/i,
  number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
})),
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern: /(^\s*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
      inside: {
        string: [{ pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 }, Prism.languages.c.string],
        comment: Prism.languages.c.comment,
        'macro-name': [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          { pattern: /(^#\s*define\s+)\w+\b(?=\()/i, lookbehind: !0, alias: 'function' },
        ],
        directive: { pattern: /^(#\s*)[a-z]+/, lookbehind: !0, alias: 'keyword' },
        'directive-hash': /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c },
      },
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
  }),
  delete Prism.languages.c.boolean
!(function(e) {
  var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    n = '\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b'.replace(/<keyword>/g, function() {
      return t.source
    })
  ;(e.languages.cpp = e.languages.extend('c', {
    'class-name': [
      {
        pattern: RegExp(
          '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(/<keyword>/g, function() {
            return t.source
          }),
        ),
        lookbehind: !0,
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
    ],
    keyword: t,
    number: {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0,
    },
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/,
  })),
    e.languages.insertBefore('cpp', 'string', {
      module: {
        pattern: RegExp(
          '(\\b(?:module|import)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            '<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>'.replace(/<mod-name>/g, function() {
              return n
            }) +
            ')',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ },
      },
      'raw-string': { pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/, alias: 'string', greedy: !0 },
    }),
    e.languages.insertBefore('cpp', 'class-name', {
      'base-clause': {
        pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend('cpp', {}),
      },
    }),
    e.languages.insertBefore(
      'inside',
      'operator',
      { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp['base-clause'],
    )
})(Prism)
Prism.languages.cmake = {
  comment: /#.*/,
  string: {
    pattern: /"(?:[^\\"]|\\.)*"/,
    greedy: !0,
    inside: {
      interpolation: { pattern: /\${(?:[^{}$]|\${[^{}$]*})*}/, inside: { punctuation: /\${|}/, variable: /\w+/ } },
    },
  },
  variable: /\b(?:CMAKE_\w+|\w+_(?:VERSION(?:_MAJOR|_MINOR|_PATCH|_TWEAK)?|(?:BINARY|SOURCE)_DIR|DESCRIPTION|HOMEPAGE_URL|ROOT)|(?:CTEST_CUSTOM_(?:MAXIMUM_(?:(?:FAIL|PASS)ED_TEST_OUTPUT_SIZE|NUMBER_OF_(?:ERROR|WARNING)S)|ERROR_(?:P(?:OST|RE)_CONTEXT|EXCEPTION|MATCH)|P(?:OST|RE)_MEMCHECK|WARNING_(?:EXCEPTION|MATCH)|(?:MEMCHECK|TESTS)_IGNORE|P(?:OST|RE)_TEST|COVERAGE_EXCLUDE)|ANDROID|APPLE|BORLAND|BUILD_SHARED_LIBS|CACHE|CPACK_(?:ABSOLUTE_DESTINATION_FILES|COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY|ERROR_ON_ABSOLUTE_INSTALL_DESTINATION|INCLUDE_TOPLEVEL_DIRECTORY|INSTALL_DEFAULT_DIRECTORY_PERMISSIONS|INSTALL_SCRIPT|PACKAGING_INSTALL_PREFIX|SET_DESTDIR|WARN_ON_ABSOLUTE_INSTALL_DESTINATION)|CTEST_(?:BINARY_DIRECTORY|BUILD_COMMAND|BUILD_NAME|BZR_COMMAND|BZR_UPDATE_OPTIONS|CHANGE_ID|CHECKOUT_COMMAND|CONFIGURATION_TYPE|CONFIGURE_COMMAND|COVERAGE_COMMAND|COVERAGE_EXTRA_FLAGS|CURL_OPTIONS|CUSTOM_(?:COVERAGE_EXCLUDE|ERROR_EXCEPTION|ERROR_MATCH|ERROR_POST_CONTEXT|ERROR_PRE_CONTEXT|MAXIMUM_FAILED_TEST_OUTPUT_SIZE|MAXIMUM_NUMBER_OF_(?:ERRORS|WARNINGS)|MAXIMUM_PASSED_TEST_OUTPUT_SIZE|MEMCHECK_IGNORE|POST_MEMCHECK|POST_TEST|PRE_MEMCHECK|PRE_TEST|TESTS_IGNORE|WARNING_EXCEPTION|WARNING_MATCH)|CVS_CHECKOUT|CVS_COMMAND|CVS_UPDATE_OPTIONS|DROP_LOCATION|DROP_METHOD|DROP_SITE|DROP_SITE_CDASH|DROP_SITE_PASSWORD|DROP_SITE_USER|EXTRA_COVERAGE_GLOB|GIT_COMMAND|GIT_INIT_SUBMODULES|GIT_UPDATE_CUSTOM|GIT_UPDATE_OPTIONS|HG_COMMAND|HG_UPDATE_OPTIONS|LABELS_FOR_SUBPROJECTS|MEMORYCHECK_(?:COMMAND|COMMAND_OPTIONS|SANITIZER_OPTIONS|SUPPRESSIONS_FILE|TYPE)|NIGHTLY_START_TIME|P4_CLIENT|P4_COMMAND|P4_OPTIONS|P4_UPDATE_OPTIONS|RUN_CURRENT_SCRIPT|SCP_COMMAND|SITE|SOURCE_DIRECTORY|SUBMIT_URL|SVN_COMMAND|SVN_OPTIONS|SVN_UPDATE_OPTIONS|TEST_LOAD|TEST_TIMEOUT|TRIGGER_SITE|UPDATE_COMMAND|UPDATE_OPTIONS|UPDATE_VERSION_ONLY|USE_LAUNCHERS)|CYGWIN|ENV|EXECUTABLE_OUTPUT_PATH|GHS-MULTI|IOS|LIBRARY_OUTPUT_PATH|MINGW|MSVC(?:10|11|12|14|60|70|71|80|90|_IDE|_TOOLSET_VERSION|_VERSION)?|MSYS|PROJECT_(?:BINARY_DIR|DESCRIPTION|HOMEPAGE_URL|NAME|SOURCE_DIR|VERSION|VERSION_(?:MAJOR|MINOR|PATCH|TWEAK))|UNIX|WIN32|WINCE|WINDOWS_PHONE|WINDOWS_STORE|XCODE|XCODE_VERSION))\b/,
  property: /\b(?:cxx_\w+|(?:ARCHIVE_OUTPUT_(?:DIRECTORY|NAME)|COMPILE_DEFINITIONS|COMPILE_PDB_NAME|COMPILE_PDB_OUTPUT_DIRECTORY|EXCLUDE_FROM_DEFAULT_BUILD|IMPORTED_(?:IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_LANGUAGES|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|NO_SONAME|OBJECTS|SONAME)|INTERPROCEDURAL_OPTIMIZATION|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|MAP_IMPORTED_CONFIG|OSX_ARCHITECTURES|OUTPUT_NAME|PDB_NAME|PDB_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|STATIC_LIBRARY_FLAGS|VS_CSHARP|VS_DOTNET_REFERENCEPROP|VS_DOTNET_REFERENCE|VS_GLOBAL_SECTION_POST|VS_GLOBAL_SECTION_PRE|VS_GLOBAL|XCODE_ATTRIBUTE)_\w+|\w+_(?:CLANG_TIDY|COMPILER_LAUNCHER|CPPCHECK|CPPLINT|INCLUDE_WHAT_YOU_USE|OUTPUT_NAME|POSTFIX|VISIBILITY_PRESET)|ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALIASED_TARGET|ALLOW_DUPLICATE_CUSTOM_TARGETS|ANDROID_(?:ANT_ADDITIONAL_OPTIONS|API|API_MIN|ARCH|ASSETS_DIRECTORIES|GUI|JAR_DEPENDENCIES|NATIVE_LIB_DEPENDENCIES|NATIVE_LIB_DIRECTORIES|PROCESS_MAX|PROGUARD|PROGUARD_CONFIG_PATH|SECURE_PROPS_PATH|SKIP_ANT_STEP|STL_TYPE)|ARCHIVE_OUTPUT_DIRECTORY|ARCHIVE_OUTPUT_NAME|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|AUTOGEN_(?:BUILD_DIR|ORIGIN_DEPENDS|PARALLEL|SOURCE_GROUP|TARGETS_FOLDER|TARGET_DEPENDS)|AUTOMOC|AUTOMOC_(?:COMPILER_PREDEFINES|DEPEND_FILTERS|EXECUTABLE|MACRO_NAMES|MOC_OPTIONS|SOURCE_GROUP|TARGETS_FOLDER)|AUTORCC|AUTORCC_EXECUTABLE|AUTORCC_OPTIONS|AUTORCC_SOURCE_GROUP|AUTOUIC|AUTOUIC_EXECUTABLE|AUTOUIC_OPTIONS|AUTOUIC_SEARCH_PATHS|BINARY_DIR|BUILDSYSTEM_TARGETS|BUILD_RPATH|BUILD_RPATH_USE_ORIGIN|BUILD_WITH_INSTALL_NAME_DIR|BUILD_WITH_INSTALL_RPATH|BUNDLE|BUNDLE_EXTENSION|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMMON_LANGUAGE_RUNTIME|COMPATIBLE_INTERFACE_(?:BOOL|NUMBER_MAX|NUMBER_MIN|STRING)|COMPILE_(?:DEFINITIONS|FEATURES|FLAGS|OPTIONS|PDB_NAME|PDB_OUTPUT_DIRECTORY)|COST|CPACK_DESKTOP_SHORTCUTS|CPACK_NEVER_OVERWRITE|CPACK_PERMANENT|CPACK_STARTUP_SHORTCUTS|CPACK_START_MENU_SHORTCUTS|CPACK_WIX_ACL|CROSSCOMPILING_EMULATOR|CUDA_EXTENSIONS|CUDA_PTX_COMPILATION|CUDA_RESOLVE_DEVICE_SYMBOLS|CUDA_SEPARABLE_COMPILATION|CUDA_STANDARD|CUDA_STANDARD_REQUIRED|CXX_EXTENSIONS|CXX_STANDARD|CXX_STANDARD_REQUIRED|C_EXTENSIONS|C_STANDARD|C_STANDARD_REQUIRED|DEBUG_CONFIGURATIONS|DEBUG_POSTFIX|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DEPLOYMENT_ADDITIONAL_FILES|DEPLOYMENT_REMOTE_DIRECTORY|DISABLED|DISABLED_FEATURES|ECLIPSE_EXTRA_CPROJECT_CONTENTS|ECLIPSE_EXTRA_NATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXCLUDE_FROM_DEFAULT_BUILD|EXPORT_NAME|EXPORT_PROPERTIES|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB32_PATHS|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_LIBX32_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FIXTURES_CLEANUP|FIXTURES_REQUIRED|FIXTURES_SETUP|FOLDER|FRAMEWORK|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GENERATOR_IS_MULTI_CONFIG|GHS_INTEGRITY_APP|GHS_NO_SOURCE_GROUP_FILE|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|GNUtoMS|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(?:COMMON_LANGUAGE_RUNTIME|CONFIGURATIONS|GLOBAL|IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_(?:LANGUAGES|LIBRARIES|MULTIPLICITY)|LOCATION|NO_SONAME|OBJECTS|SONAME)|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE_(?:AUTOUIC_OPTIONS|COMPILE_DEFINITIONS|COMPILE_FEATURES|COMPILE_OPTIONS|INCLUDE_DIRECTORIES|LINK_DEPENDS|LINK_DIRECTORIES|LINK_LIBRARIES|LINK_OPTIONS|POSITION_INDEPENDENT_CODE|SOURCES|SYSTEM_INCLUDE_DIRECTORIES)|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|IOS_INSTALL_COMBINED|JOB_POOLS|JOB_POOL_COMPILE|JOB_POOL_LINK|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINKER_LANGUAGE|LINK_(?:DEPENDS|DEPENDS_NO_SHARED|DIRECTORIES|FLAGS|INTERFACE_LIBRARIES|INTERFACE_MULTIPLICITY|LIBRARIES|OPTIONS|SEARCH_END_STATIC|SEARCH_START_STATIC|WHAT_YOU_USE)|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACOSX_RPATH|MACROS|MANUALLY_ADDED_DEPENDENCIES|MEASUREMENT|MODIFIED|NAME|NO_SONAME|NO_SYSTEM_FROM_IMPORTED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|PDB_NAME|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|POST_INSTALL_SCRIPT|PREDEFINED_TARGETS_FOLDER|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROCESSOR_AFFINITY|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RESOURCE_LOCK|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|RUN_SERIAL|SKIP_AUTOGEN|SKIP_AUTOMOC|SKIP_AUTORCC|SKIP_AUTOUIC|SKIP_BUILD_RPATH|SKIP_RETURN_CODE|SOURCES|SOURCE_DIR|SOVERSION|STATIC_LIBRARY_FLAGS|STATIC_LIBRARY_OPTIONS|STRINGS|SUBDIRECTORIES|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_MESSAGES|TARGET_SUPPORTS_SHARED_LIBS|TESTS|TEST_INCLUDE_FILE|TEST_INCLUDE_FILES|TIMEOUT|TIMEOUT_AFTER_MATCH|TYPE|USE_FOLDERS|VALUE|VARIABLES|VERSION|VISIBILITY_INLINES_HIDDEN|VS_(?:CONFIGURATION_TYPE|COPY_TO_OUT_DIR|DEBUGGER_(?:COMMAND|COMMAND_ARGUMENTS|ENVIRONMENT|WORKING_DIRECTORY)|DEPLOYMENT_CONTENT|DEPLOYMENT_LOCATION|DOTNET_REFERENCES|DOTNET_REFERENCES_COPY_LOCAL|GLOBAL_KEYWORD|GLOBAL_PROJECT_TYPES|GLOBAL_ROOTNAMESPACE|INCLUDE_IN_VSIX|IOT_STARTUP_TASK|KEYWORD|RESOURCE_GENERATOR|SCC_AUXPATH|SCC_LOCALPATH|SCC_PROJECTNAME|SCC_PROVIDER|SDK_REFERENCES|SHADER_(?:DISABLE_OPTIMIZATIONS|ENABLE_DEBUG|ENTRYPOINT|FLAGS|MODEL|OBJECT_FILE_NAME|OUTPUT_HEADER_FILE|TYPE|VARIABLE_NAME)|STARTUP_PROJECT|TOOL_OVERRIDE|USER_PROPS|WINRT_COMPONENT|WINRT_EXTENSIONS|WINRT_REFERENCES|XAML_TYPE)|WILL_FAIL|WIN32_EXECUTABLE|WINDOWS_EXPORT_ALL_SYMBOLS|WORKING_DIRECTORY|WRAP_EXCLUDE|XCODE_(?:EMIT_EFFECTIVE_PLATFORM_NAME|EXPLICIT_FILE_TYPE|FILE_ATTRIBUTES|LAST_KNOWN_FILE_TYPE|PRODUCT_TYPE|SCHEME_(?:ADDRESS_SANITIZER|ADDRESS_SANITIZER_USE_AFTER_RETURN|ARGUMENTS|DISABLE_MAIN_THREAD_CHECKER|DYNAMIC_LIBRARY_LOADS|DYNAMIC_LINKER_API_USAGE|ENVIRONMENT|EXECUTABLE|GUARD_MALLOC|MAIN_THREAD_CHECKER_STOP|MALLOC_GUARD_EDGES|MALLOC_SCRIBBLE|MALLOC_STACK|THREAD_SANITIZER(?:_STOP)?|UNDEFINED_BEHAVIOUR_SANITIZER(?:_STOP)?|ZOMBIE_OBJECTS))|XCTEST)\b/,
  keyword: /\b(?:add_compile_definitions|add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_link_options|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_parse_arguments|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_build|ctest_configure|ctest_coverage|ctest_empty_binary_directory|ctest_memcheck|ctest_read_custom_files|ctest_run_script|ctest_sleep|ctest_start|ctest_submit|ctest_test|ctest_update|ctest_upload|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_guard|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_compile_definitions|target_compile_features|target_compile_options|target_include_directories|target_link_directories|target_link_libraries|target_link_options|target_sources|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)(?=\s*\()\b/,
  boolean: /\b(?:ON|OFF|TRUE|FALSE)\b/,
  namespace: /\b(?:PROPERTIES|SHARED|PRIVATE|STATIC|PUBLIC|INTERFACE|TARGET_OBJECTS)\b/,
  operator: /\b(?:NOT|AND|OR|MATCHES|LESS|GREATER|EQUAL|STRLESS|STRGREATER|STREQUAL|VERSION_LESS|VERSION_EQUAL|VERSION_GREATER|DEFINED)\b/,
  inserted: { pattern: /\b\w+::\w+\b/, alias: 'class-name' },
  number: /\b\d+(?:\.\d+)*\b/,
  function: /\b[a-z_]\w*(?=\s*\()\b/i,
  punctuation: /[()>}]|\$[<{]/,
}
;(Prism.languages.dart = Prism.languages.extend('clike', {
  string: [
    { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
    { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  ],
  keyword: [
    /\b(?:async|sync|yield)\*/,
    /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extension|external|extends|factory|final|finally|for|Function|get|hide|if|implements|interface|import|in|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/,
  ],
  operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
})),
  Prism.languages.insertBefore('dart', 'function', { metadata: { pattern: /@\w+/, alias: 'symbol' } })
!(function(i) {
  i.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m] }
  var r = {
    'deleted-sign': '-',
    'deleted-arrow': '<',
    'inserted-sign': '+',
    'inserted-arrow': '>',
    unchanged: ' ',
    diff: '!',
  }
  Object.keys(r).forEach(function(e) {
    var n = r[e],
      a = []
    ;/^\w+$/.test(e) || a.push(/\w+/.exec(e)[0]),
      'diff' === e && a.push('bold'),
      (i.languages.diff[e] = {
        pattern: RegExp('^(?:[' + n + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
        alias: a,
        inside: {
          line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
          prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(e)[0] },
        },
      })
  }),
    Object.defineProperty(i.languages.diff, 'PREFIXES', { value: r })
})(Prism)
!(function(h) {
  function v(e, n) {
    return '___' + e.toUpperCase() + n + '___'
  }
  Object.defineProperties((h.languages['markup-templating'] = {}), {
    buildPlaceholders: {
      value: function(a, r, e, o) {
        if (a.language === r) {
          var c = (a.tokenStack = [])
          ;(a.code = a.code.replace(e, function(e) {
            if ('function' == typeof o && !o(e)) return e
            for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); ) ++t
            return (c[t] = e), n
          })),
            (a.grammar = h.languages.markup)
        }
      },
    },
    tokenizePlaceholders: {
      value: function(p, k) {
        if (p.language === k && p.tokenStack) {
          p.grammar = h.languages[k]
          var m = 0,
            d = Object.keys(p.tokenStack)
          !(function e(n) {
            for (var t = 0; t < n.length && !(m >= d.length); t++) {
              var a = n[t]
              if ('string' == typeof a || (a.content && 'string' == typeof a.content)) {
                var r = d[m],
                  o = p.tokenStack[r],
                  c = 'string' == typeof a ? a : a.content,
                  i = v(k, r),
                  u = c.indexOf(i)
                if (-1 < u) {
                  ++m
                  var g = c.substring(0, u),
                    l = new h.Token(k, h.tokenize(o, p.grammar), 'language-' + k, o),
                    s = c.substring(u + i.length),
                    f = []
                  g && f.push.apply(f, e([g])),
                    f.push(l),
                    s && f.push.apply(f, e([s])),
                    'string' == typeof a ? n.splice.apply(n, [t, 1].concat(f)) : (a.content = f)
                }
              } else a.content && e(a.content)
            }
            return n
          })(p.tokens)
        }
      },
    },
  })
})(Prism)
!(function(e) {
  e.languages.django = {
    comment: /^{#[\s\S]*?#}$/,
    tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: 'keyword' },
    delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: 'punctuation' },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: 'function' },
    test: { pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/, lookbehind: !0, alias: 'function' },
    function: /\b[a-z_]\w+(?=\s*\()/i,
    keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
    operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    number: /\b\d+(?:\.\d+)?\b/,
    boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
    variable: /\b\w+?\b/,
    punctuation: /[{}[\](),.:;]/,
  }
  var n = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
    o = e.languages['markup-templating']
  e.hooks.add('before-tokenize', function(e) {
    o.buildPlaceholders(e, 'django', n)
  }),
    e.hooks.add('after-tokenize', function(e) {
      o.tokenizePlaceholders(e, 'django')
    }),
    (e.languages.jinja2 = e.languages.django),
    e.hooks.add('before-tokenize', function(e) {
      o.buildPlaceholders(e, 'jinja2', n)
    }),
    e.hooks.add('after-tokenize', function(e) {
      o.tokenizePlaceholders(e, 'jinja2')
    })
})(Prism)
!(function(n) {
  for (
    var i =
        '[^<()"\']|\\((?:<expr>)*\\)|<(?!#--)|<#--(?:[^-]|-(?!->))*--\x3e|"(?:[^\\\\"]|\\\\.)*"|\'(?:[^\\\\\']|\\\\.)*\'',
      e = 0;
    e < 2;
    e++
  )
    i = i.replace(/<expr>/g, function() {
      return i
    })
  i = i.replace(/<expr>/g, '[^\\s\\S]')
  var t = {
    comment: /<#--[\s\S]*?-->/,
    string: [
      { pattern: /\br("|')(?:(?!\1)[^\\]|\\.)*\1/, greedy: !0 },
      {
        pattern: RegExp(
          '("|\')(?:(?!\\1|\\$\\{)[^\\\\]|\\\\.|\\$\\{(?:(?!\\})(?:<expr>))*\\})*\\1'.replace(/<expr>/g, function() {
            return i
          }),
        ),
        greedy: !0,
        inside: {
          interpolation: {
            pattern: RegExp(
              '((?:^|[^\\\\])(?:\\\\\\\\)*)\\$\\{(?:(?!\\})(?:<expr>))*\\}'.replace(/<expr>/g, function() {
                return i
              }),
            ),
            lookbehind: !0,
            inside: { 'interpolation-punctuation': { pattern: /^\$\{|\}$/, alias: 'punctuation' }, rest: null },
          },
        },
      },
    ],
    keyword: /\b(?:as)\b/,
    boolean: /\b(?:true|false)\b/,
    'builtin-function': { pattern: /((?:^|[^?])\?\s*)\w+/, lookbehind: !0, alias: 'function' },
    function: /\w+(?=\s*\()/,
    number: /\d+(?:\.\d+)?/,
    operator: /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/,
    punctuation: /[,;.:()[\]{}]/,
  }
  ;(t.string[1].inside.interpolation.inside.rest = t),
    (n.languages.ftl = {
      'ftl-comment': { pattern: /^<#--[\s\S]*/, alias: 'comment' },
      'ftl-directive': {
        pattern: /^<[\s\S]+>$/,
        inside: {
          directive: { pattern: /(^<\/?)[#@][a-z]\w*/i, lookbehind: !0, alias: 'keyword' },
          punctuation: /^<\/?|\/?>$/,
          content: { pattern: /\s*\S[\s\S]*/, alias: 'ftl', inside: t },
        },
      },
      'ftl-interpolation': {
        pattern: /^\$\{[\s\S]*\}$/,
        inside: { punctuation: /^\$\{|\}$/, content: { pattern: /\s*\S[\s\S]*/, alias: 'ftl', inside: t } },
      },
    }),
    n.hooks.add('before-tokenize', function(e) {
      var t = RegExp(
        '<#--[^]*?--\x3e|</?[#@][a-zA-Z](?:<expr>)*?>|\\$\\{(?:<expr>)*?\\}'.replace(/<expr>/g, function() {
          return i
        }),
        'gi',
      )
      n.languages['markup-templating'].buildPlaceholders(e, 'ftl', t)
    }),
    n.hooks.add('after-tokenize', function(e) {
      n.languages['markup-templating'].tokenizePlaceholders(e, 'ftl')
    })
})(Prism)
Prism.languages.git = {
  comment: /^#.*/m,
  deleted: /^[-–].*/m,
  inserted: /^\+.*/m,
  string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
  command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
  coord: /^@@.*@@$/m,
  'commit-sha1': /^commit \w{40}$/m,
}
;(Prism.languages.go = Prism.languages.extend('clike', {
  string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
  keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|iota|nil|true|false)\b/,
  number: /(?:\b0x[a-f\d]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
  operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
})),
  delete Prism.languages.go['class-name']
!(function(t) {
  t.languages.http = {
    'request-line': {
      pattern: /^(?:GET|HEAD|POST|PUT|DELETE|CONNECT|OPTIONS|TRACE|PATCH|PRI|SEARCH)\s(?:https?:\/\/|\/)\S*\sHTTP\/[0-9.]+/m,
      inside: {
        method: { pattern: /^[A-Z]+\b/, alias: 'property' },
        'request-target': {
          pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
          lookbehind: !0,
          alias: 'url',
          inside: t.languages.uri,
        },
        'http-version': { pattern: /^(\s)HTTP\/[0-9.]+/, lookbehind: !0, alias: 'property' },
      },
    },
    'response-status': {
      pattern: /^HTTP\/[0-9.]+ \d+ .+/m,
      inside: {
        'http-version': { pattern: /^HTTP\/[0-9.]+/, alias: 'property' },
        'status-code': { pattern: /^(\s)\d+(?=\s)/, lookbehind: !0, alias: 'number' },
        'reason-phrase': { pattern: /^(\s).+/, lookbehind: !0, alias: 'string' },
      },
    },
    'header-name': { pattern: /^[\w-]+:(?=.)/m, alias: 'keyword' },
  }
  var a,
    e,
    s,
    n = t.languages,
    r = {
      'application/javascript': n.javascript,
      'application/json': n.json || n.javascript,
      'application/xml': n.xml,
      'text/xml': n.xml,
      'text/html': n.html,
      'text/css': n.css,
    },
    i = { 'application/json': !0, 'application/xml': !0 }
  for (var p in r)
    if (r[p]) {
      a = a || {}
      var o = i[p]
        ? (void 0, (s = (e = p).replace(/^[a-z]+\//, '')), '(?:' + e + '|\\w+/(?:[\\w.-]+\\+)+' + s + '(?![+\\w.-]))')
        : p
      a[p.replace(/\//g, '-')] = {
        pattern: RegExp('(content-type:\\s*' + o + '(?:(?:\\r\\n?|\\n).+)*)(?:\\r?\\n|\\r){2}[\\s\\S]*', 'i'),
        lookbehind: !0,
        inside: r[p],
      }
    }
  a && t.languages.insertBefore('http', 'header-name', a)
})(Prism)
!(function(e) {
  var t = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    n = '(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*',
    a = {
      pattern: RegExp(n + '[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b'),
      lookbehind: !0,
      inside: {
        namespace: { pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/, inside: { punctuation: /\./ } },
        punctuation: /\./,
      },
    }
  ;(e.languages.java = e.languages.extend('clike', {
    'class-name': [a, { pattern: RegExp(n + '[A-Z]\\w*(?=\\s+\\w+\\s*[;,=())])'), lookbehind: !0, inside: a.inside }],
    keyword: t,
    function: [e.languages.clike.function, { pattern: /(\:\:\s*)[a-z_]\w*/, lookbehind: !0 }],
    number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: { pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m, lookbehind: !0 },
  })),
    e.languages.insertBefore('java', 'string', {
      'triple-quoted-string': {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: 'string',
      },
    }),
    e.languages.insertBefore('java', 'class-name', {
      annotation: { pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/, lookbehind: !0, alias: 'punctuation' },
      generics: {
        pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
        inside: { 'class-name': a, keyword: t, punctuation: /[<>(),.:]/, operator: /[?&|]/ },
      },
      namespace: {
        pattern: RegExp(
          '(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?'.replace(
            /<keyword>/g,
            function() {
              return t.source
            },
          ),
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    })
})(Prism)
!(function(a) {
  var e = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,
    t = [
      { pattern: /\b(?:false|true)\b/i, alias: 'boolean' },
      { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 },
      { pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i, greedy: !0, lookbehind: !0 },
      /\b(?:null)\b/i,
      /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/,
    ],
    i = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    n = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,
    s = /[{}\[\](),:;]/
  a.languages.php = {
    delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: 'important' },
    comment: e,
    variable: /\$+(?:\w+\b|(?={))/i,
    package: {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ },
    },
    'class-name-definition': {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: !0,
      alias: 'class-name',
    },
    keyword: [
      {
        pattern: /(\(\s*)\b(?:bool|boolean|int|integer|float|string|object|array)\b(?=\s*\))/i,
        alias: 'type-casting',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /([(,?]\s*)\b(?:bool|int|float|string|object|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b(?=\s*\$)/i,
        alias: 'type-hint',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /([(,?]\s*[a-z0-9_|]\|\s*)(?:null|false)\b(?=\s*\$)/i,
        alias: 'type-hint',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|self|static|callable|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: 'return-type',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?[a-z0-9_|]\|\s*)(?:null|false)\b/i,
        alias: 'return-type',
        greedy: !0,
        lookbehind: !0,
      },
      {
        pattern: /\b(?:bool|int|float|string|object|void|array(?!\s*\()|mixed|iterable|(?:null|false)(?=\s*\|))\b/i,
        alias: 'type-declaration',
        greedy: !0,
      },
      { pattern: /(\|\s*)(?:null|false)\b/i, alias: 'type-declaration', greedy: !0, lookbehind: !0 },
      { pattern: /\b(?:parent|self|static)(?=\s*::)/i, alias: 'static-context', greedy: !0 },
      /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|match|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
    ],
    'argument-name': { pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i, lookbehind: !0 },
    'class-name': [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: !0,
        lookbehind: !0,
      },
      { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
      { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /\b[a-z_]\w*(?=\s*\$)/i, alias: 'type-declaration', greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-declaration'],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: 'static-context', greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ['class-name-fully-qualified', 'static-context'],
        greedy: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i, alias: 'type-hint', greedy: !0, lookbehind: !0 },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-hint'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
      { pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i, alias: 'return-type', greedy: !0, lookbehind: !0 },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ['class-name-fully-qualified', 'return-type'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
    ],
    constant: t,
    function: /\w+\s*(?=\()/,
    property: { pattern: /(->)[\w]+/, lookbehind: !0 },
    number: i,
    operator: n,
    punctuation: s,
  }
  var l = {
      pattern: /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
      lookbehind: !0,
      inside: a.languages.php,
    },
    r = [
      {
        pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
        alias: 'nowdoc-string',
        greedy: !0,
        inside: {
          delimiter: { pattern: /^<<<'[^']+'|[a-z_]\w*;$/i, alias: 'symbol', inside: { punctuation: /^<<<'?|[';]$/ } },
        },
      },
      {
        pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
        alias: 'heredoc-string',
        greedy: !0,
        inside: {
          delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: 'symbol',
            inside: { punctuation: /^<<<"?|[";]$/ },
          },
          interpolation: l,
        },
      },
      { pattern: /`(?:\\[\s\S]|[^\\`])*`/, alias: 'backtick-quoted-string', greedy: !0 },
      { pattern: /'(?:\\[\s\S]|[^\\'])*'/, alias: 'single-quoted-string', greedy: !0 },
      { pattern: /"(?:\\[\s\S]|[^\\"])*"/, alias: 'double-quoted-string', greedy: !0, inside: { interpolation: l } },
    ]
  a.languages.insertBefore('php', 'variable', { string: r }),
    a.languages.insertBefore('php', 'variable', {
      attribute: {
        pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
        greedy: !0,
        inside: {
          'attribute-content': {
            pattern: /^(#\[)[\s\S]+(?=]$)/,
            lookbehind: !0,
            inside: {
              comment: e,
              string: r,
              'attribute-class-name': [
                { pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i, alias: 'class-name', greedy: !0, lookbehind: !0 },
                {
                  pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                  alias: ['class-name', 'class-name-fully-qualified'],
                  greedy: !0,
                  lookbehind: !0,
                  inside: { punctuation: /\\/ },
                },
              ],
              constant: t,
              number: i,
              operator: n,
              punctuation: s,
            },
          },
          delimiter: { pattern: /^#\[|]$/, alias: 'punctuation' },
        },
      },
    }),
    a.hooks.add('before-tokenize', function(e) {
      if (/<\?/.test(e.code)) {
        a.languages['markup-templating'].buildPlaceholders(
          e,
          'php',
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/gi,
        )
      }
    }),
    a.hooks.add('after-tokenize', function(e) {
      a.languages['markup-templating'].tokenizePlaceholders(e, 'php')
    })
})(Prism)
!(function(p) {
  var a = (p.languages.javadoclike = {
    parameter: { pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*@(?:param|arg|arguments)\s+)\w+/m, lookbehind: !0 },
    keyword: { pattern: /(^\s*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: !0 },
    punctuation: /[{}]/,
  })
  Object.defineProperty(a, 'addSupport', {
    value: function(a, e) {
      'string' == typeof a && (a = [a]),
        a.forEach(function(a) {
          !(function(a, e) {
            var n = 'doc-comment',
              t = p.languages[a]
            if (t) {
              var r = t[n]
              if (!r) {
                var o = {
                  'doc-comment': { pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/, lookbehind: !0, alias: 'comment' },
                }
                r = (t = p.languages.insertBefore(a, 'comment', o))[n]
              }
              if ((r instanceof RegExp && (r = t[n] = { pattern: r }), Array.isArray(r)))
                for (var i = 0, s = r.length; i < s; i++) r[i] instanceof RegExp && (r[i] = { pattern: r[i] }), e(r[i])
              else e(r)
            }
          })(a, function(a) {
            a.inside || (a.inside = {}), (a.inside.rest = e)
          })
        })
    },
  }),
    a.addSupport(['java', 'javascript', 'php'], a)
})(Prism)
!(function(a) {
  var e = /(^(?:\s*(?:\*\s*)*))[^*\s].*$/m,
    n = '(?:[a-zA-Z]\\w+\\s*\\.\\s*)*[A-Z]\\w*(?:\\s*<mem>)?|<mem>'.replace(/<mem>/g, function() {
      return '#\\s*\\w+(?:\\s*\\([^()]*\\))?'
    })
  ;(a.languages.javadoc = a.languages.extend('javadoclike', {})),
    a.languages.insertBefore('javadoc', 'keyword', {
      reference: {
        pattern: RegExp('(@(?:exception|throws|see|link|linkplain|value)\\s+(?:\\*\\s*)?)(?:' + n + ')'),
        lookbehind: !0,
        inside: {
          function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
          field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
          namespace: { pattern: /\b(?:[a-z]\w*\s*\.\s*)+/, inside: { punctuation: /\./ } },
          'class-name': /\b[A-Z]\w*/,
          keyword: a.languages.java.keyword,
          punctuation: /[#()[\],.]/,
        },
      },
      'class-name': { pattern: /(@param\s+)<[A-Z]\w*>/, lookbehind: !0, inside: { punctuation: /[.<>]/ } },
      'code-section': [
        {
          pattern: /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
          lookbehind: !0,
          inside: { code: { pattern: e, lookbehind: !0, inside: a.languages.java, alias: 'language-java' } },
        },
        {
          pattern: /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
          lookbehind: !0,
          inside: {
            line: {
              pattern: e,
              lookbehind: !0,
              inside: {
                tag: a.languages.markup.tag,
                entity: a.languages.markup.entity,
                code: { pattern: /.+/, inside: a.languages.java, alias: 'language-java' },
              },
            },
          },
        },
      ],
      tag: a.languages.markup.tag,
      entity: a.languages.markup.entity,
    }),
    a.languages.javadoclike.addSupport('java', a.languages.javadoc)
})(Prism)
Prism.languages.javastacktrace = {
  summary: {
    pattern: /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?:\:.*)?$/m,
    inside: {
      keyword: { pattern: /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m, lookbehind: !0 },
      string: { pattern: /^(\s*)"[^"]*"/, lookbehind: !0 },
      exceptions: {
        pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
        lookbehind: !0,
        inside: { 'class-name': /[\w$]+(?=$|:)/, namespace: /[a-z]\w*/, punctuation: /[.:]/ },
      },
      message: { pattern: /(:\s*)\S.*/, lookbehind: !0, alias: 'string' },
      punctuation: /[:]/,
    },
  },
  'stack-frame': {
    pattern: /^[\t ]*at (?:[\w$./]|@[\w$.+-]*\/)+(?:<init>)?\([^()]*\)/m,
    inside: {
      keyword: { pattern: /^(\s*)at(?= )/, lookbehind: !0 },
      source: [
        {
          pattern: /(\()\w+\.\w+:\d+(?=\))/,
          lookbehind: !0,
          inside: { file: /^\w+\.\w+/, punctuation: /:/, 'line-number': { pattern: /\d+/, alias: 'number' } },
        },
        { pattern: /(\()[^()]*(?=\))/, lookbehind: !0, inside: { keyword: /^(?:Unknown Source|Native Method)$/ } },
      ],
      'class-name': /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
      function: /(?:<init>|[\w$]+)(?=\()/,
      'class-loader': {
        pattern: /(\s)[a-z]\w*(?:\.[a-z]\w*)*(?=\/[\w@$.]*\/)/,
        lookbehind: !0,
        alias: 'namespace',
        inside: { punctuation: /\./ },
      },
      module: {
        pattern: /([\s/])[a-z]\w*(?:\.[a-z]\w*)*(?:@[\w$.+-]*)?(?=\/)/,
        lookbehind: !0,
        inside: { version: { pattern: /(@)[\s\S]+/, lookbehind: !0, alias: 'number' }, punctuation: /[@.]/ },
      },
      namespace: { pattern: /(?:[a-z]\w*\.)+/, inside: { punctuation: /\./ } },
      punctuation: /[()/.]/,
    },
  },
  more: {
    pattern: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
    inside: { punctuation: /\.{3}/, number: /\d+/, keyword: /\b[a-z]+(?: [a-z]+)*\b/ },
  },
}
;(Prism.languages.json = {
  property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: !0, greedy: !0 },
  string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: !0, greedy: !0 },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:true|false)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' },
}),
  (Prism.languages.webmanifest = Prism.languages.json)
!(function(n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/
  n.languages.json5 = n.languages.extend('json', {
    property: [
      { pattern: RegExp(e.source + '(?=\\s*:)'), greedy: !0 },
      { pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/, alias: 'unquoted' },
    ],
    string: { pattern: e, greedy: !0 },
    number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
  })
})(Prism)
;(Prism.languages.jsonp = Prism.languages.extend('json', { punctuation: /[{}[\]();,.]/ })),
  Prism.languages.insertBefore('jsonp', 'punctuation', {
    function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/,
  })
Prism.languages.jsstacktrace = {
  'error-message': { pattern: /^\S.*/m, alias: 'string' },
  'stack-frame': {
    pattern: /^[ \t]+at[ \t].*/m,
    inside: {
      'not-my-code': {
        pattern: /[ \t]+at[ \t]+(?!\s)(?:node\.js|\<unknown\>|.*(?:node_modules|\(\<anonymous\>\)|\(\<unknown\>|\<anonymous\>$|\(internal\/|\(node\.js)).*/m,
        alias: 'comment',
      },
      filename: { pattern: /(\bat\s+(?!\s)|\()(?:[a-zA-Z]:)?[^():]+(?=:)/, lookbehind: !0, alias: 'url' },
      function: {
        pattern: /(at\s+(?:new\s+)?)(?!\s)[_$a-zA-Z\xA0-\uFFFF<][.$\w\xA0-\uFFFF<>]*/,
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
      punctuation: /[()]/,
      keyword: /\b(?:at|new)\b/,
      alias: { pattern: /\[(?:as\s+)?(?!\s)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\]/, alias: 'variable' },
      'line-number': { pattern: /:[0-9]+(?::[0-9]+)?\b/, alias: 'number', inside: { punctuation: /:/ } },
    },
  },
}
!(function(u) {
  var e = u.languages.javascript['template-string'],
    n = e.pattern.source,
    a = e.inside.interpolation,
    i = a.inside['interpolation-punctuation'],
    r = a.pattern.source
  function t(e, t) {
    if (u.languages[e])
      return {
        pattern: RegExp('((?:' + t + ')\\s*)' + n),
        lookbehind: !0,
        greedy: !0,
        inside: {
          'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
          'embedded-code': { pattern: /[\s\S]+/, alias: e },
        },
      }
  }
  function o(e, t, n) {
    var r = { code: e, grammar: t, language: n }
    return (
      u.hooks.run('before-tokenize', r),
      (r.tokens = u.tokenize(r.code, r.grammar)),
      u.hooks.run('after-tokenize', r),
      r.tokens
    )
  }
  function d(e) {
    var t = {}
    t['interpolation-punctuation'] = i
    var n = u.tokenize(e, t)
    if (3 === n.length) {
      var r = [1, 1]
      r.push.apply(r, o(n[1], u.languages.javascript, 'javascript')), n.splice.apply(n, r)
    }
    return new u.Token('interpolation', n, a.alias, e)
  }
  function c(a, e, i) {
    var t = u.tokenize(a, { interpolation: { pattern: RegExp(r), lookbehind: !0 } }),
      f = 0,
      y = {},
      n = o(
        t
          .map(function(e) {
            if ('string' == typeof e) return e
            for (
              var t, n = e.content;
              -1 !== a.indexOf(((r = f++), (t = '___' + i.toUpperCase() + '_' + r + '___')));

            );
            return (y[t] = n), t
            var r
          })
          .join(''),
        e,
        i,
      ),
      v = Object.keys(y)
    return (
      (f = 0),
      (function e(t) {
        for (var n = 0; n < t.length; n++) {
          if (f >= v.length) return
          var r = t[n]
          if ('string' == typeof r || 'string' == typeof r.content) {
            var a = v[f],
              i = 'string' == typeof r ? r : r.content,
              o = i.indexOf(a)
            if (-1 !== o) {
              ++f
              var s = i.substring(0, o),
                p = d(y[a]),
                l = i.substring(o + a.length),
                g = []
              if ((s && g.push(s), g.push(p), l)) {
                var u = [l]
                e(u), g.push.apply(g, u)
              }
              'string' == typeof r ? (t.splice.apply(t, [n, 1].concat(g)), (n += g.length - 1)) : (r.content = g)
            }
          } else {
            var c = r.content
            Array.isArray(c) ? e(c) : e([c])
          }
        }
      })(n),
      new u.Token(i, n, 'language-' + i, a)
    )
  }
  u.languages.javascript['template-string'] = [
    t(
      'css',
      '\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)',
    ),
    t('html', '\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?='),
    t('svg', '\\bsvg'),
    t('markdown', '\\b(?:md|markdown)'),
    t('graphql', '\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)'),
    e,
  ].filter(Boolean)
  var s = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 }
  function f(e) {
    return 'string' == typeof e ? e : Array.isArray(e) ? e.map(f).join('') : f(e.content)
  }
  u.hooks.add('after-tokenize', function(e) {
    e.language in s &&
      !(function e(t) {
        for (var n = 0, r = t.length; n < r; n++) {
          var a = t[n]
          if ('string' != typeof a) {
            var i = a.content
            if (Array.isArray(i))
              if ('template-string' === a.type) {
                var o = i[1]
                if (3 === i.length && 'string' != typeof o && 'embedded-code' === o.type) {
                  var s = f(o),
                    p = o.alias,
                    l = Array.isArray(p) ? p[0] : p,
                    g = u.languages[l]
                  if (!g) continue
                  i[1] = c(s, g, l)
                }
              } else e(i)
            else 'string' != typeof i && e([i])
          }
        }
      })(e.tokens)
  })
})(Prism)
!(function(e) {
  ;(e.languages.kotlin = e.languages.extend('clike', {
    keyword: {
      pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: !0,
    },
    function: [
      { pattern: /(?:`[^\r\n`]+`|\w+)(?=\s*\()/, greedy: !0 },
      { pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/, lookbehind: !0, greedy: !0 },
    ],
    number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
  })),
    delete e.languages.kotlin['class-name'],
    e.languages.insertBefore('kotlin', 'string', { 'raw-string': { pattern: /("""|''')[\s\S]*?\1/, alias: 'string' } }),
    e.languages.insertBefore('kotlin', 'keyword', {
      annotation: { pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/, alias: 'builtin' },
    }),
    e.languages.insertBefore('kotlin', 'function', { label: { pattern: /\w+@|@\w+/, alias: 'symbol' } })
  var n = [
    {
      pattern: /\$\{[^}]+\}/,
      inside: { delimiter: { pattern: /^\$\{|\}$/, alias: 'variable' }, rest: e.languages.kotlin },
    },
    { pattern: /\$\w+/, alias: 'variable' },
  ]
  ;(e.languages.kotlin.string.inside = e.languages.kotlin['raw-string'].inside = { interpolation: n }),
    (e.languages.kt = e.languages.kotlin),
    (e.languages.kts = e.languages.kotlin)
})(Prism)
!(function(a) {
  var e = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    n = { 'equation-command': { pattern: e, alias: 'regex' } }
  ;(a.languages.latex = {
    comment: /%.*/m,
    cdata: { pattern: /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/, lookbehind: !0 },
    equation: [
      {
        pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: n,
        alias: 'string',
      },
      {
        pattern: /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: n,
        alias: 'string',
      },
    ],
    keyword: {
      pattern: /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
      lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
      pattern: /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
      lookbehind: !0,
      alias: 'class-name',
    },
    function: { pattern: e, alias: 'selector' },
    punctuation: /[[\]{}&]/,
  }),
    (a.languages.tex = a.languages.latex),
    (a.languages.context = a.languages.latex)
})(Prism)
Prism.languages.lua = {
  comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
  string: { pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/, greedy: !0 },
  number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
  keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
  function: /(?!\d)\w+(?=\s*(?:[({]))/,
  operator: [/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/, { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 }],
  punctuation: /[\[\](){},;]|\.+|:+/,
}
Prism.languages.makefile = {
  comment: { pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/, lookbehind: !0 },
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
  symbol: {
    pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
    inside: { variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/ },
  },
  variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  keyword: [
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
    {
      pattern: /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
      lookbehind: !0,
    },
  ],
  operator: /(?:::|[?:+!])?=|[|@]/,
  punctuation: /[:;(){}]/,
}
!(function(u) {
  function n(n) {
    return (
      (n = n.replace(/<inner>/g, function() {
        return '(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))'
      })),
      RegExp('((?:^|[^\\\\])(?:\\\\{2})*)(?:' + n + ')')
    )
  }
  var e = '(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+',
    t = '\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))'.replace(/__/g, function() {
      return e
    }),
    a = '\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)'
  ;(u.languages.markdown = u.languages.extend('markup', {})),
    u.languages.insertBefore('markdown', 'prolog', {
      'front-matter-block': {
        pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          punctuation: /^---|---$/,
          'font-matter': { pattern: /\S+(?:\s+\S+)*/, alias: ['yaml', 'language-yaml'], inside: u.languages.yaml },
        },
      },
      blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
      table: {
        pattern: RegExp('^' + t + a + '(?:' + t + ')*', 'm'),
        inside: {
          'table-data-rows': {
            pattern: RegExp('^(' + t + a + ')(?:' + t + ')*$'),
            lookbehind: !0,
            inside: { 'table-data': { pattern: RegExp(e), inside: u.languages.markdown }, punctuation: /\|/ },
          },
          'table-line': {
            pattern: RegExp('^(' + t + ')' + a + '$'),
            lookbehind: !0,
            inside: { punctuation: /\||:?-{3,}:?/ },
          },
          'table-header-row': {
            pattern: RegExp('^' + t + '$'),
            inside: {
              'table-header': { pattern: RegExp(e), alias: 'important', inside: u.languages.markdown },
              punctuation: /\|/,
            },
          },
        },
      },
      code: [
        {
          pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
          lookbehind: !0,
          alias: 'keyword',
        },
        { pattern: /``.+?``|`[^`\r\n]+`/, alias: 'keyword' },
        {
          pattern: /^```[\s\S]*?^```$/m,
          greedy: !0,
          inside: {
            'code-block': { pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: !0 },
            'code-language': { pattern: /^(```).+/, lookbehind: !0 },
            punctuation: /```/,
          },
        },
      ],
      title: [
        {
          pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
          alias: 'important',
          inside: { punctuation: /==+$|--+$/ },
        },
        { pattern: /(^\s*)#.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } },
      ],
      hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
      list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
      'url-reference': {
        pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
          variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
          string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
          punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: 'url',
      },
      bold: {
        pattern: n(
          '\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: !0, inside: {} }, punctuation: /\*\*|__/ },
      },
      italic: {
        pattern: n(
          '\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: !0, inside: {} }, punctuation: /[*_]/ },
      },
      strike: {
        pattern: n('(~~?)(?:(?!~)<inner>)+?\\2'),
        lookbehind: !0,
        greedy: !0,
        inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: !0, inside: {} }, punctuation: /~~?/ },
      },
      url: {
        pattern: n(
          '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])',
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
          operator: /^!/,
          content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: !0, inside: {} },
          variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
          url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
          string: { pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: !0 },
        },
      },
    }),
    ['url', 'bold', 'italic', 'strike'].forEach(function(e) {
      ;['url', 'bold', 'italic', 'strike'].forEach(function(n) {
        e !== n && (u.languages.markdown[e].inside.content.inside[n] = u.languages.markdown[n])
      })
    }),
    u.hooks.add('after-tokenize', function(n) {
      ;('markdown' !== n.language && 'md' !== n.language) ||
        !(function n(e) {
          if (e && 'string' != typeof e)
            for (var t = 0, a = e.length; t < a; t++) {
              var i = e[t]
              if ('code' === i.type) {
                var r = i.content[1],
                  o = i.content[3]
                if (r && o && 'code-language' === r.type && 'code-block' === o.type && 'string' == typeof r.content) {
                  var l = r.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp'),
                    s = 'language-' + (l = (/[a-z][\w-]*/i.exec(l) || [''])[0].toLowerCase())
                  o.alias ? ('string' == typeof o.alias ? (o.alias = [o.alias, s]) : o.alias.push(s)) : (o.alias = [s])
                }
              } else n(i.content)
            }
        })(n.tokens)
    }),
    u.hooks.add('wrap', function(n) {
      if ('code-block' === n.type) {
        for (var e = '', t = 0, a = n.classes.length; t < a; t++) {
          var i = n.classes[t],
            r = /language-(.+)/.exec(i)
          if (r) {
            e = r[1]
            break
          }
        }
        var o = u.languages[e]
        if (o) {
          var l = document.createElement('div')
          l.innerHTML = n.content
          var s = l.textContent
          n.content = u.highlight(s, o, e)
        } else if (e && 'none' !== e && u.plugins.autoloader) {
          var d = 'md-' + new Date().valueOf() + '-' + Math.floor(1e16 * Math.random())
          ;(n.attributes.id = d),
            u.plugins.autoloader.loadLanguages(e, function() {
              var n = document.getElementById(d)
              n && (n.innerHTML = u.highlight(n.textContent, u.languages[e], e))
            })
        }
      }
    }),
    (u.languages.md = u.languages.markdown)
})(Prism)
Prism.languages.matlab = {
  comment: [/%\{[\s\S]*?\}%/, /%.+/],
  string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
  number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
  keyword: /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
  function: /(?!\d)\w+(?=\s*\()/,
  operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
  punctuation: /\.{3}|[.,;\[\](){}!]/,
}
!(function($) {
  var e = [
      '$eq',
      '$gt',
      '$gte',
      '$in',
      '$lt',
      '$lte',
      '$ne',
      '$nin',
      '$and',
      '$not',
      '$nor',
      '$or',
      '$exists',
      '$type',
      '$expr',
      '$jsonSchema',
      '$mod',
      '$regex',
      '$text',
      '$where',
      '$geoIntersects',
      '$geoWithin',
      '$near',
      '$nearSphere',
      '$all',
      '$elemMatch',
      '$size',
      '$bitsAllClear',
      '$bitsAllSet',
      '$bitsAnyClear',
      '$bitsAnySet',
      '$comment',
      '$elemMatch',
      '$meta',
      '$slice',
      '$currentDate',
      '$inc',
      '$min',
      '$max',
      '$mul',
      '$rename',
      '$set',
      '$setOnInsert',
      '$unset',
      '$addToSet',
      '$pop',
      '$pull',
      '$push',
      '$pullAll',
      '$each',
      '$position',
      '$slice',
      '$sort',
      '$bit',
      '$addFields',
      '$bucket',
      '$bucketAuto',
      '$collStats',
      '$count',
      '$currentOp',
      '$facet',
      '$geoNear',
      '$graphLookup',
      '$group',
      '$indexStats',
      '$limit',
      '$listLocalSessions',
      '$listSessions',
      '$lookup',
      '$match',
      '$merge',
      '$out',
      '$planCacheStats',
      '$project',
      '$redact',
      '$replaceRoot',
      '$replaceWith',
      '$sample',
      '$set',
      '$skip',
      '$sort',
      '$sortByCount',
      '$unionWith',
      '$unset',
      '$unwind',
      '$abs',
      '$accumulator',
      '$acos',
      '$acosh',
      '$add',
      '$addToSet',
      '$allElementsTrue',
      '$and',
      '$anyElementTrue',
      '$arrayElemAt',
      '$arrayToObject',
      '$asin',
      '$asinh',
      '$atan',
      '$atan2',
      '$atanh',
      '$avg',
      '$binarySize',
      '$bsonSize',
      '$ceil',
      '$cmp',
      '$concat',
      '$concatArrays',
      '$cond',
      '$convert',
      '$cos',
      '$dateFromParts',
      '$dateToParts',
      '$dateFromString',
      '$dateToString',
      '$dayOfMonth',
      '$dayOfWeek',
      '$dayOfYear',
      '$degreesToRadians',
      '$divide',
      '$eq',
      '$exp',
      '$filter',
      '$first',
      '$floor',
      '$function',
      '$gt',
      '$gte',
      '$hour',
      '$ifNull',
      '$in',
      '$indexOfArray',
      '$indexOfBytes',
      '$indexOfCP',
      '$isArray',
      '$isNumber',
      '$isoDayOfWeek',
      '$isoWeek',
      '$isoWeekYear',
      '$last',
      '$last',
      '$let',
      '$literal',
      '$ln',
      '$log',
      '$log10',
      '$lt',
      '$lte',
      '$ltrim',
      '$map',
      '$max',
      '$mergeObjects',
      '$meta',
      '$min',
      '$millisecond',
      '$minute',
      '$mod',
      '$month',
      '$multiply',
      '$ne',
      '$not',
      '$objectToArray',
      '$or',
      '$pow',
      '$push',
      '$radiansToDegrees',
      '$range',
      '$reduce',
      '$regexFind',
      '$regexFindAll',
      '$regexMatch',
      '$replaceOne',
      '$replaceAll',
      '$reverseArray',
      '$round',
      '$rtrim',
      '$second',
      '$setDifference',
      '$setEquals',
      '$setIntersection',
      '$setIsSubset',
      '$setUnion',
      '$size',
      '$sin',
      '$slice',
      '$split',
      '$sqrt',
      '$stdDevPop',
      '$stdDevSamp',
      '$strcasecmp',
      '$strLenBytes',
      '$strLenCP',
      '$substr',
      '$substrBytes',
      '$substrCP',
      '$subtract',
      '$sum',
      '$switch',
      '$tan',
      '$toBool',
      '$toDate',
      '$toDecimal',
      '$toDouble',
      '$toInt',
      '$toLong',
      '$toObjectId',
      '$toString',
      '$toLower',
      '$toUpper',
      '$trim',
      '$trunc',
      '$type',
      '$week',
      '$year',
      '$zip',
      '$comment',
      '$explain',
      '$hint',
      '$max',
      '$maxTimeMS',
      '$min',
      '$orderby',
      '$query',
      '$returnKey',
      '$showDiskLoc',
      '$natural',
    ],
    t =
      '(?:' +
      (e = e.map(function($) {
        return $.replace('$', '\\$')
      })).join('|') +
      ')\\b'
  ;($.languages.mongodb = $.languages.extend('javascript', {})),
    $.languages.insertBefore('mongodb', 'string', {
      property: {
        pattern: /(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)(?=\s*:)/,
        greedy: !0,
        inside: { keyword: RegExp('^([\'"])?' + t + '(?:\\1)?$') },
      },
    }),
    ($.languages.mongodb.string.inside = {
      url: { pattern: /https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*/i, greedy: !0 },
      entity: {
        pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
        greedy: !0,
      },
    }),
    $.languages.insertBefore('mongodb', 'constant', {
      builtin: {
        pattern: RegExp(
          '\\b(?:' +
            [
              'ObjectId',
              'Code',
              'BinData',
              'DBRef',
              'Timestamp',
              'NumberLong',
              'NumberDecimal',
              'MaxKey',
              'MinKey',
              'RegExp',
              'ISODate',
              'UUID',
            ].join('|') +
            ')\\b',
        ),
        alias: 'keyword',
      },
    })
})(Prism)
;(Prism.languages.nginx = Prism.languages.extend('clike', {
  comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
  keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
})),
  Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i })
Prism.languages.sql = {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: !0 },
  variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 }, /@[\w.$]+/],
  string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: !0, lookbehind: !0 },
  function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:S|ING)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
  number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|IN|ILIKE|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  punctuation: /[;[\]()`,.]/,
}
!(function(E) {
  var A = (E.languages.plsql = E.languages.extend('sql', { comment: [/\/\*[\s\S]*?\*\//, /--.*/] })),
    T = A.keyword
  Array.isArray(T) || (T = A.keyword = [T]),
    T.unshift(
      /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i,
    )
  var R = A.operator
  Array.isArray(R) || (R = A.operator = [R]), R.unshift(/:=/)
})(Prism)
!(function(e) {
  var i = (Prism.languages.powershell = {
      comment: [
        { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
        { pattern: /(^|[^`])#.*/, lookbehind: !0 },
      ],
      string: [
        {
          pattern: /"(?:`[\s\S]|[^`"])*"/,
          greedy: !0,
          inside: {
            function: { pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/, lookbehind: !0, inside: {} },
          },
        },
        { pattern: /'(?:[^']|'')*'/, greedy: !0 },
      ],
      namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
      boolean: /\$(?:true|false)\b/i,
      variable: /\$\w+\b/,
      function: [
        /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
        /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
      ],
      keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
      operator: {
        pattern: /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0,
      },
      punctuation: /[|{}[\];(),.]/,
    }),
    r = i.string[0].inside
  ;(r.boolean = i.boolean), (r.variable = i.variable), (r.function.inside = i)
})()
Prism.languages.properties = {
  comment: /^[ \t]*[#!].*$/m,
  'attr-value': {
    pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *(?! )| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
    lookbehind: !0,
  },
  'attr-name': /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
  punctuation: /[=:]/,
}
;(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
  'string-interpolation': {
    pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
          'format-spec': { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
          'conversion-option': { pattern: /![sra](?=[:}]$)/, alias: 'punctuation' },
          rest: null,
        },
      },
      string: /[\s\S]+/,
    },
  },
  'triple-quoted-string': { pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]*?\1/i, greedy: !0, alias: 'string' },
  string: { pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: !0 },
  function: { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: !0 },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ['annotation', 'punctuation'],
    inside: { punctuation: /\./ },
  },
  keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:True|False|None)\b/,
  number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
  operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/,
}),
  (Prism.languages.python['string-interpolation'].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python)
Prism.languages.rest = {
  table: [
    {
      pattern: /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1[+|].+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
      lookbehind: !0,
      inside: { punctuation: /\||(?:\+[=-]+)+\+/ },
    },
    {
      pattern: /(\s*)=+ [ =]*=(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1=+ [ =]*=(?=(?:\r?\n|\r){2}|\s*$)/,
      lookbehind: !0,
      inside: { punctuation: /[=-]+/ },
    },
  ],
  'substitution-def': {
    pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
    lookbehind: !0,
    inside: {
      substitution: {
        pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
        alias: 'attr-value',
        inside: { punctuation: /^\||\|$/ },
      },
      directive: { pattern: /( +)(?! )[^:]+::/, lookbehind: !0, alias: 'function', inside: { punctuation: /::$/ } },
    },
  },
  'link-target': [
    { pattern: /(^\s*\.\. )\[[^\]]+\]/m, lookbehind: !0, alias: 'string', inside: { punctuation: /^\[|\]$/ } },
    {
      pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
      lookbehind: !0,
      alias: 'string',
      inside: { punctuation: /^_|:$/ },
    },
  ],
  directive: { pattern: /(^\s*\.\. )[^:]+::/m, lookbehind: !0, alias: 'function', inside: { punctuation: /::$/ } },
  comment: { pattern: /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m, lookbehind: !0 },
  title: [
    {
      pattern: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
      inside: {
        punctuation: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
        important: /.+/,
      },
    },
    {
      pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
      lookbehind: !0,
      inside: { punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/, important: /.+/ },
    },
  ],
  hr: {
    pattern: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
    lookbehind: !0,
    alias: 'punctuation',
  },
  field: { pattern: /(^\s*):[^:\r\n]+:(?= )/m, lookbehind: !0, alias: 'attr-name' },
  'command-line-option': {
    pattern: /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
    lookbehind: !0,
    alias: 'symbol',
  },
  'literal-block': {
    pattern: /::(?:\r?\n|\r){2}([ \t]+)(?![ \t]).+(?:(?:\r?\n|\r)\1.+)*/,
    inside: { 'literal-block-punctuation': { pattern: /^::/, alias: 'punctuation' } },
  },
  'quoted-literal-block': {
    pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
    inside: {
      'literal-block-punctuation': {
        pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
        alias: 'punctuation',
      },
    },
  },
  'list-bullet': {
    pattern: /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
    lookbehind: !0,
    alias: 'punctuation',
  },
  'doctest-block': { pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m, lookbehind: !0, inside: { punctuation: /^>>>/ } },
  inline: [
    {
      pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
      lookbehind: !0,
      inside: {
        bold: { pattern: /(^\*\*).+(?=\*\*$)/, lookbehind: !0 },
        italic: { pattern: /(^\*).+(?=\*$)/, lookbehind: !0 },
        'inline-literal': { pattern: /(^``).+(?=``$)/, lookbehind: !0, alias: 'symbol' },
        role: { pattern: /^:[^:]+:|:[^:]+:$/, alias: 'function', inside: { punctuation: /^:|:$/ } },
        'interpreted-text': { pattern: /(^`).+(?=`$)/, lookbehind: !0, alias: 'attr-value' },
        substitution: { pattern: /(^\|).+(?=\|$)/, lookbehind: !0, alias: 'attr-value' },
        punctuation: /\*\*?|``?|\|/,
      },
    },
  ],
  link: [
    { pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/, alias: 'string', inside: { punctuation: /^\[|\]_$/ } },
    {
      pattern: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
      alias: 'string',
      inside: { punctuation: /^_?`|`$|`?_?_$/ },
    },
  ],
  punctuation: { pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m, lookbehind: !0 },
}
!(function(e) {
  e.languages.ruby = e.languages.extend('clike', {
    comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
    'class-name': {
      pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword: /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
  })
  var n = {
    pattern: /#\{[^}]+\}/,
    inside: { delimiter: { pattern: /^#\{|\}$/, alias: 'tag' }, rest: e.languages.ruby },
  }
  delete e.languages.ruby.function,
    e.languages.insertBefore('ruby', 'keyword', {
      regex: [
        {
          pattern: RegExp(
            '%r(?:' +
              [
                '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1[gim]{0,3}',
                '\\((?:[^()\\\\]|\\\\[^])*\\)[gim]{0,3}',
                '\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}[gim]{0,3}',
                '\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\][gim]{0,3}',
                '<(?:[^<>\\\\]|\\\\[^])*>[gim]{0,3}',
              ].join('|') +
              ')',
          ),
          greedy: !0,
          inside: { interpolation: n },
        },
        {
          pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
          lookbehind: !0,
          greedy: !0,
        },
      ],
      variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
      symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
      'method-definition': {
        pattern: /(\bdef\s+)[\w.]+/,
        lookbehind: !0,
        inside: { function: /\w+$/, rest: e.languages.ruby },
      },
    }),
    e.languages.insertBefore('ruby', 'number', {
      builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
      constant: /\b[A-Z]\w*(?:[?!]|\b)/,
    }),
    (e.languages.ruby.string = [
      {
        pattern: RegExp(
          '%[qQiIwWxs]?(?:' +
            [
              '([^a-zA-Z0-9\\s{(\\[<])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
              '\\((?:[^()\\\\]|\\\\[^])*\\)',
              '\\{(?:[^#{}\\\\]|#(?:\\{[^}]+\\})?|\\\\[^])*\\}',
              '\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\]',
              '<(?:[^<>\\\\]|\\\\[^])*>',
            ].join('|') +
            ')',
        ),
        greedy: !0,
        inside: { interpolation: n },
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: n },
      },
    ]),
    (e.languages.rb = e.languages.ruby)
})(Prism)
!(function(e) {
  ;(e.languages.sass = e.languages.extend('css', {
    comment: { pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m, lookbehind: !0 },
  })),
    e.languages.insertBefore('sass', 'atrule', {
      'atrule-line': { pattern: /^(?:[ \t]*)[@+=].+/m, inside: { atrule: /(?:@[\w-]+|[+=])/m } },
    }),
    delete e.languages.sass.atrule
  var t = /\$[-\w]+|#\{\$[-\w]+\}/,
    a = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/, { pattern: /(\s+)-(?=\s)/, lookbehind: !0 }]
  e.languages.insertBefore('sass', 'property', {
    'variable-line': { pattern: /^[ \t]*\$.+/m, inside: { punctuation: /:/, variable: t, operator: a } },
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
      inside: {
        property: [/[^:\s]+(?=\s*:)/, { pattern: /(:)[^:\s]+/, lookbehind: !0 }],
        punctuation: /:/,
        variable: t,
        operator: a,
        important: e.languages.sass.important,
      },
    },
  }),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    e.languages.insertBefore('sass', 'punctuation', {
      selector: {
        pattern: /([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/,
        lookbehind: !0,
      },
    })
})(Prism)
;(Prism.languages.scss = Prism.languages.extend('css', {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: { pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } },
  url: /(?:[-a-z]+-)?url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]+))/m,
    inside: {
      parent: { pattern: /&/, alias: 'important' },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
  property: { pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/, inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ } },
})),
  Prism.languages.insertBefore('scss', 'atrule', {
    keyword: [
      /@(?:if|else(?: if)?|forward|for|each|while|import|use|extend|debug|warn|mixin|include|function|return|content)\b/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
  }),
  Prism.languages.insertBefore('scss', 'important', { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
  Prism.languages.insertBefore('scss', 'function', {
    'module-modifier': { pattern: /\b(?:as|with|show|hide)\b/i, alias: 'keyword' },
    placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
    operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0 },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss)
!(function(n) {
  var t = {
    pattern: /\{[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\}/i,
    alias: 'constant',
    inside: { punctuation: /[{}]/ },
  }
  ;(n.languages['solution-file'] = {
    comment: { pattern: /#.*/, greedy: !0 },
    string: { pattern: /"[^"\r\n]*"|'[^'\r\n]*'/, greedy: !0, inside: { guid: t } },
    object: {
      pattern: /^([ \t]*)(?:([A-Z]\w*)\b(?=.*(?:\r\n?|\n)(?:\1[ \t].*(?:\r\n?|\n))*\1End\2(?=[ \t]*$))|End[A-Z]\w*(?=[ \t]*$))/m,
      lookbehind: !0,
      greedy: !0,
      alias: 'keyword',
    },
    property: { pattern: /^([ \t]*)(?!\s)[^\r\n"#=()]*[^\s"#=()](?=\s*=)/m, lookbehind: !0, inside: { guid: t } },
    guid: t,
    number: /\b\d+(?:\.\d+)*\b/,
    boolean: /\b(?:FALSE|TRUE)\b/,
    operator: /=/,
    punctuation: /[(),]/,
  }),
    (n.languages.sln = n.languages['solution-file'])
})(Prism)
!(function(n) {
  function i(e, t, a) {
    return {
      pattern: RegExp('<#' + e + '[\\s\\S]*?#>'),
      alias: 'block',
      inside: {
        delimiter: { pattern: RegExp('^<#' + e + '|#>$'), alias: 'important' },
        content: { pattern: /[\s\S]+/, inside: t, alias: a },
      },
    }
  }
  n.languages['t4-templating'] = Object.defineProperty({}, 'createT4', {
    value: function(e) {
      var t = n.languages[e],
        a = 'language-' + e
      return {
        block: {
          pattern: /<#[\s\S]+?#>/,
          inside: {
            directive: i('@', {
              'attr-value': {
                pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,
                inside: { punctuation: /^=|^["']|["']$/ },
              },
              keyword: /\w+(?=\s)/,
              'attr-name': /\w+/,
            }),
            expression: i('=', t, a),
            'class-feature': i('\\+', t, a),
            standard: i('', t, a),
          },
        },
      }
    },
  })
})(Prism)
Prism.languages.t4 = Prism.languages['t4-cs'] = Prism.languages['t4-templating'].createT4('csharp')
Prism.languages.vbnet = Prism.languages.extend('basic', {
  comment: [
    { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
    { pattern: /(^|[^\\:])'.*/, lookbehind: !0 },
  ],
  keyword: /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
})
Prism.languages['t4-vb'] = Prism.languages['t4-templating'].createT4('vbnet')
Prism.languages.vim = {
  string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
  comment: /".*/,
  function: /\w+(?=\()/,
  keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
  builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
  operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
  punctuation: /[{}[\](),;:]/,
}
;(Prism.languages['visual-basic'] = {
  comment: { pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i, inside: { keyword: /^REM/i } },
  directive: {
    pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
    alias: 'comment',
    greedy: !0,
  },
  string: { pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
  date: {
    pattern: /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?)[^\S\r\n]*#/i,
    alias: 'builtin',
  },
  number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
  boolean: /\b(?:True|False|Nothing)\b/i,
  keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Until|Xor)\b/i,
  operator: [/[+\-*/\\^<=>&#@$%!]/, { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 }],
  punctuation: /[{}().,:?]/,
}),
  (Prism.languages.vb = Prism.languages['visual-basic']),
  (Prism.languages.vba = Prism.languages['visual-basic'])
!(function(n) {
  function a(a, e) {
    n.languages[a] && n.languages.insertBefore(a, 'comment', { 'doc-comment': e })
  }
  var e = n.languages.markup.tag,
    t = { pattern: /\/\/\/.*/, greedy: !0, alias: 'comment', inside: { tag: e } },
    g = { pattern: /'''.*/, greedy: !0, alias: 'comment', inside: { tag: e } }
  a('csharp', t), a('fsharp', t), a('vbnet', g)
})(Prism)
!(function(e) {
  var n = /[*&][^\s[\]{},]+/,
    r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
    t = '(?:' + r.source + '(?:[ \t]+' + n.source + ')?|' + n.source + '(?:[ \t]+' + r.source + ')?)',
    a = '(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(
      /<PLAIN>/g,
      function() {
        return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]'
      },
    ),
    d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\''
  function o(e, n) {
    n = (n || '').replace(/m/g, '') + 'm'
    var r = '([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|(?:[\r\n]\\s*)?#))'
      .replace(/<<prop>>/g, function() {
        return t
      })
      .replace(/<<value>>/g, function() {
        return e
      })
    return RegExp(r, n)
  }
  ;(e.languages.yaml = {
    scalar: {
      pattern: RegExp(
        '([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(
          /<<prop>>/g,
          function() {
            return t
          },
        ),
      ),
      lookbehind: !0,
      alias: 'string',
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        '((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'
          .replace(/<<prop>>/g, function() {
            return t
          })
          .replace(/<<key>>/g, function() {
            return '(?:' + a + '|' + d + ')'
          }),
      ),
      lookbehind: !0,
      greedy: !0,
      alias: 'atrule',
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
    datetime: {
      pattern: o(
        '\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?',
      ),
      lookbehind: !0,
      alias: 'number',
    },
    boolean: { pattern: o('true|false', 'i'), lookbehind: !0, alias: 'important' },
    null: { pattern: o('null|~', 'i'), lookbehind: !0, alias: 'important' },
    string: { pattern: o(d), lookbehind: !0, greedy: !0 },
    number: {
      pattern: o('[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)', 'i'),
      lookbehind: !0,
    },
    tag: r,
    important: n,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
  }),
    (e.languages.yml = e.languages.yaml)
})(Prism)
