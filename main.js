var text1 = `
/*你好，我叫耿朋。
 *只用文字介绍太easy了。
 *让我来用代码来介绍试试看。
*/

/* 白色背景太单调了，先来点颜色背景。*/
html{
    color: rgb(222,222,222);
    background-color: rgb(0,43,54);
}
/*再加上边框，调调间距*/
#code{
    border: 1px solid;
    padding: 1em;
    margin: 1em;
    overflow: auto;
    width: 45vw;
    height: 90vh;
}
/*代码好枯燥，让代码高亮吧*/
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }
/*再加点3D效果*/
html{
    perspective: 1000px;
}
#code{
    position: fixed;
    left: 0;
    top:0;
    transform: rotateY(10deg) translateZ(-100px);
    
}
/* 再加一个呼吸效果 */
#code{
  animation: breath 0.5s infinite alternate-reverse;
}
`;
var text2 = `
/*好了，我要开始自我介绍了，我先给自己准备一个编辑器*/
#page{
    width: 45vw;
    height: 90vh;
    background: white;
    border: 5px solid black;
    margin: .5em;
}
/*那我就可以开始写了，请看右边 */
`;
var text3 = `
# 自我介绍
我叫 耿朋
1990 年 11 月出生
华北水利水电大学毕业
测控技术与仪器专业
自学前端一年
希望应聘前端开发岗位
# 技能介绍
熟练 JavaScript CSS HTML jQuery AJAX JSONP Vue.js等前端知识
# 项目介绍
1. 无缝/有缝轮播
2. 在线简历
3. canvas画板
4. 导航图
# 联系方式
QQ 917589697
Email 917589697@qq.com
手机 18530852241
# 项目经验1
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
# 项目经验2
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
# 项目经验3
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
# 项目经验4
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
# 项目经验5
XXXXXXXXX
XXXXXXXXX
XXXXXXXXX
`
var text4 = `
/*右边是markdown格式，我转为html格式*/
`
var text5=`
/*再加点样式*/
#page{
    padding: 2em;
  }
  #page h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
  }
  #page ul,#page ol{
    list-style: none;
  }
  #page ul> li::before{
    content: '•';
    margin-right: .5em;
  }
  #page ol {
    counter-reset: section;
  }
  #page ol li::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    margin-right: .5em;
  }


/*好了，这就是我的自我介绍，谢谢观看*/
`
var code = document.querySelector('#code')
var styleTag = document.querySelector('#styleTag')
writeCode('', text1, function () {
    createPre();
    writeCode(text1, text2, function () {
        writePage(text3,function(){
            writeCode((text1+text2),text4,function(){
                markToHtml(function(){
                    writeCode((text1+text2+text4),text5,function(){

                    })
                })
            })
        });
    })
})

function writeCode(preText, text, fn1) {
    let n = 0;
    let timer = setInterval(() => {
        n += 1;
        code.innerHTML = preText + text.substring(0, n);
        code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css, 'css');
        styleTag.innerHTML = preText + text.substring(0, n)
        code.scrollTop = code.scrollHeight;
        if (n >= text.length) {
            window.clearInterval(timer);
            fn1()
        }
    }, 100)

}
function createPre() {
    var pre = document.createElement('pre');
    document.body.appendChild(pre);
    pre.id = 'page'
}
function writePage(text,fn){
    let n = 0;
        let timer = setInterval(() => {
            n += 1;
            page.innerHTML = text.substring(0, n);
            page.scrollTop = page.scrollHeight;
            if (n >= text.length) {
                window.clearInterval(timer);
                fn()
            }
        },100)
}
function markToHtml(fn){
    page.scrollTop = 0
    page.innerHTML = marked(text3)
    fn()
}
