const puppeteer = require('puppeteer');
const url = "https://www.pdfdrive.com/";
let page ;
let browserOpen = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:['--start-maximised']
});
browserOpen.then(function(browserInstance){
    return browserInstance;
}).then(function(browserInstance){
    let newWindow=browserInstance.newPage();
    return newWindow;
}).then(function(newWindow){
    page = newWindow;
    let openedUrl = page.goto(url);
    return openedUrl;
}).then(function(){
    let popUpWillBeClicked = waitAndClick('i[class="fas fa-times"]',page);
    return popUpWillBeClicked;
}).catch(function(err){
    console.log(err);
})
function waitAndClick(target,cpage){
    return new Promise(function(resolve,reject){
        let waitForTarget = cpage.waitForSelector(target,{visible:true});
        waitForTarget.then(function(){
            console.log("abs");
            let clickModal = cpage.click(target);
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}
