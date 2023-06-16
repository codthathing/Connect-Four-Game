const grid = document.getElementById("grid")
const pro_div = document.getElementById("pro_div")
const resDiv = document.getElementById("resDiv")
const proDiv = document.getElementById("proDiv")
// let divForJobs = document.getElementById("divForJobs")

let openText = document.getElementById("openText")
window.addEventListener("load", ()=> {
    document.querySelector('body').style.overflowY="hidden"
    conText([`Hi, i'm a Front-end Developer looking forward to working with you.`],'wordText',['blue'])
    function conText(words, id, colors) {
        if (colors === undefined) colors = ['#990000'];
        var visible = true;
        var countLetter = 1;
        var x =1;
        var waiting = false;
        var target = document.getElementById(id)
        target.setAttribute('style', 'color:' +colors[0])
        window.setInterval(function() {
            if(countLetter === 0 && waiting === false) {
                waiting === true;
                target.innerHTML = words[0].substring(0, countLetter)
                window.setTimeout(()=> {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' +colors[0]);
                    countLetter += x;
                    waiting = false
                }, 1000)
            } 
            else if( waiting === false) {
                target.innerHTML = words[0].substring(0, countLetter);
                countLetter += x
            }
        }, 120)
    
        window.setInterval(()=> {
            if( visible === true) {
                document.getElementById('console').className = 'underscore hidden';
                visible = false;
            } else {
                document.getElementById('console').className = 'underscore';
                visible = true
            }
        }, 500)
    }
    setTimeout(()=> {
        openText.classList.add('closeText')
        document.querySelector('body').style.overflowY="scroll"
    }, 9000)
})


document.getElementById("proBtn").addEventListener("click", ()=> {
    pro_div.classList.add("openPro")
    document.querySelector("body").style.overflowY="hidden"
    document.getElementById("body").classList.add('removePad')
})
document.getElementById("cloPro").addEventListener("click", ()=> {
    pro_div.classList.remove("openPro")
    document.querySelector("body").style.overflowY="scroll"
    document.getElementById("body").classList.remove('removePad')
})

document.getElementById("resBtn").addEventListener("click", ()=> {
    resDiv.classList.add("openRes")
    document.querySelector("body").style.overflowY="hidden"
    document.getElementById("body").classList.add('removePad')
})
document.getElementById("cloRes").addEventListener("click", ()=> {
    resDiv.classList.remove("openRes")
    document.querySelector("body").style.overflowY="scroll"
    document.getElementById("body").classList.remove('removePad')
})


const projects = [
    {
        id:1,
        img:'myWebsite.jpg',
        author:'This is a custom website that i built using HTML, CSS and JavaScript.',
        link: 'https://akinsewebsite.netlify.app/'
    },
    {
        id:2,
        img:'liveseg.jpg',
        author:'I devloped this live football streaming app using Bootstrap.',
        link:'https://liveseg.netlify.app/' // updating
    },
    {
        id:3,
        img:'birthday.jpg',
        author:'This is a birthday reminder app developed using React.js.',
        list:'https://akinse-birthday-app.netlify.app/'
    },
    {
        id:4,
        img:'calculator.jpg',
        author:'A mathematical calulator built from scratch with mainly JavaSript.',
        link:'https://akinse-calculator.netlify.app/'
    },
    {
        id:5,
        img:'vowel_game.jpg',
        author:'This is a app which calculates the amount of vowels in a word.',
        list:'https://akinse-vowelgame.netlify.app/'
    },
    {
        id:6,
        img:'form.jpg',
        author:'A custom form which delivers data using GET method to back-end developers. ',
        list:'https://akinse-birthday-app.netlify.app/'
    },
    {
        id:7,
        img:'extension.jpg',
        author:'This extension helps to rack visited sites and URL\'S.',
        link:'https://liveseg.netlify.app/' // generate link
    },
    {
        id:8,
        img:'expense.jpg',
        author:'Built mainly to keep record of our expenses on commodities.',
        link:'https://akinse-expense.netlify.app/' // updating
    },
    {
        id:9,
        img:'todo.jpg',
        author:'This app helps to store task to be completed.',
        link:'https://akinse-todo.app/' // updating
    },
    {
        id:10,
        img:'library.jpg',
        author:'This is a UI design template for a library website.',
        link:'https://liveseg.netlify.app/'// updating
    },
    {
        id:11,
        img:'shopify.jpg',
        author:'This is a custom website that contain different features.',
        link:'https://liveseg.netlify.app/' // updating
    }
]

let shelfGrid = ``
for(let x=0; x< projects.length; x++) {
    if(x === 6) {break;}
    shelfGrid = `
        <div id="serDiv">
            <section><img src=${projects[x].img} id="serImg" alt=""></section>
            <section id="serBottom">    
                <cite id="serName">${projects[x].author}</cite>
                <a id="serLink" href="${projects[x].link}"><i class="fa-thin fa-file-check">&rightarrow;</i></a>
            </section>
        </div>
        `
    document.getElementById('grid').innerHTML += shelfGrid
}

function creaShelf(array, id) {
    let shelf = ``
    array.map((detail) => {
        shelf = `
            <div id="serDiv">
                <section><img src=${detail.img} id="serImg" alt=""></section>
                <section id="serBottom">    
                    <cite id="serName">${detail.author}</cite>
                    <a id="serLink" href="${detail.link}"><i class="fa-thin fa-file-check">&rightarrow;</i></a>
                </section>
            </div>
            `
        document.getElementById(id).innerHTML += shelf
    })
}
creaShelf(projects, 'projectDiv')




//This is the javascript section for my already done project
const proDetails = [
    {
        id:1,
        proName:'My custom website',
        proRole:'UI/UX designer',
        proSize:2,
        proDays:4,
        link:'../HTML/myWebsite.html',
        linkName:'My website'
    },
    {
        id:2,
        proName:'My calculator',
        proRole:'Project developer',
        proSize:1,
        proDays:2,
        link:'../HTML/calculator.html',
        linkName:'Akinse calculator'
    },
    
]

proDetails.map((prodetails)=>{
    let project = `
        <main id="proMain">
            <div>
                <p id="seName" style="font-style: italic;">${prodetails.id}. Project Name: ${prodetails.proName}</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr;">
                <p class="sePara1">- Role: ${prodetails.proRole}</p>
                <p class="sePara1">Team Size: ${prodetails.proSize}</p>
                <div style="display: flex; justify-content: space-between;">
                    <p class="sePara1">- Project Link: <a href=${prodetails.link} class="seLink">${prodetails.linkName}</a></p>
                </div>
                <p class="sePara1">Project Duration: ${prodetails.proDays} Days</p>
            </div>
        </main>
    `

    proDiv.innerHTML+=project
})

// const jobsReceived = [
//     {
//         id:1,
//         jobType:'Freelance',
//         jobDetails:'Built a interactive and responsive website.'
//     },
//     {
//         id:2,
//         jobType:'Open source',
//         jobDetails:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, distinctio! Neque rem obcaecati saepe optio cum a asperiores, quod perferendis?'
//     }
// ]

// jobsReceived.map((jobreceived) => {
//     let jobs=`
//         <div class="jobDiv">
//             <p style="font-style: italic;" class="sePara">- ${jobreceived.jobType}</p>
//             <p class="resParas">${jobreceived.jobDetails}</p>
//         </div>
//     `
//     divForJobs.innerHTML += jobs
// })