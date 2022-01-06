const textToType = ["Web designers are expected to have an awareness of usability and if their role involves creating mark up then they are also expected to be up to date with web accessibility guidelines. The different areas of web design include web graphic design; interface design; authoring, including standardised code and proprietary software; user experience design; and search engine optimization.",
                     "A late 20th century trend in typing, primarily used with devices with small keyboards (such as PDAs and Smartphones), is thumbing or thumb typing. This can be accomplished using one or both thumbs. Similar to desktop keyboards and input devices, if a user overuses keys which need hard presses and/or have small and unergonomic layouts, it could cause thumb tendonitis or other repetitive strain injury. (Wikipedia)",
                     "Income before securities transactions was up 10.8 percent from $13.49 million in 1982 to $14.95 million in 1983. Earnings per share (adjusted for a 10.5 percent stock dividend distributed on August 26) advanced 10 percent to $2.39 in 1983 from $2.17 in 1982. Earnings may rise for 7 years. Hopefully, earnings per share will grow another 10 percent. Kosy, Klemin, and Bille began selling on May 23, 1964. Their second store was founded in Renton on August 3, 1965. From 1964 to 1984, they opened more than 50 stores through-out the country. As they expanded, 12 regional offices had to be organized. Each of these 12 regional offices had to be organized. Each of these 12 regions employs from 108 to 578 people. National headquarters employs 1,077 people. Carole owns 118 stores located in 75 cities ranging as far west as Seattle and as far east as Boston. She owns 46 stores south of the Mason-Dixon line and 24 stores north of Denver. Carole buys goods from 89 companies located in 123 countries and all 50 states. Carole started in business on March 3, 1975. She had less than $6,000 in capital assets.",
                     "An ever-growing number of complex and rigid rules plus hard-to-cope-with regulations are now being legislated from state to state. Key federal regulations were formulated by the FDA, FTC, and the CPSC. Each of these federal agencies serves a specific mission. One example: Laws sponsored by the Office of the Fair Debt Collection Practices prevent an agency from purposefully harassing clients in serious debt. The Fair Packaging and Labeling Act makes certain that protection from misleading packaging of goods is guaranteed to each buyer of goods carried in small shops as well as in large supermarkets. Products on the market must reveal the names of all ingredients on the label. Language must be in clear and precise terms that can be understood by everyone. This practice is very crucial for the lives of many people. It is prudent that we recall that the FDA specifically requires that all goods are pure, safe, and wholesome. The FDA states that all goods be produced under highly sanitary conditions. Drugs must be completely safe and must also be effective for their stated purpose. This policy applies to cosmetics that must be both safe and pure. Individuals are often totally unappreciative of the FDA's great dedication.",
                     "Being human makes us susceptible to the onset of feelings. The role of these emotions varies. Some of them are useful while others may be harmful. The use of social media for self-expression has reached a point that it makes us feel we can say anything. This begins when we see people expressing anything and everything that come to mind. When we see everyone else voicing their likes and dislikes, their irritations and desires we tend to imitate what they do. And because many engage in this, we think that it is normal and healthy. However, when we get used to unbridled self-expression, we come to believe that all feelings are valid. We become convinced that in real life, we should also act on our emotions and our impulses. Using social media this way erodes our ability to regulate our actions and reactions. To illustrate, when something small irritates us we think that it's okay to feel this way. But isn't it better to foster one's patience and resilience instead of immediately complaining? Or when we develop an attraction to someone despite that person being in a relationship, and because social media has conditioned us that all feelings can be expressed, we tend to think that acting on this attraction is okay. Not all feelings deserve expression. We find ourselves creating our own problems when we let our present emotions control our actions."
                    ];

const messageArea = document.querySelector(".message");
const typedText = document.querySelector("#typedtext");
const btn = document.querySelector("button");
const speedbtn = document.querySelector("#typingspeed");

let startTime, endTime, date;


btn.addEventListener("click", function () {
    if(this.innerText=="Start"){
        typedText.disabled = false;
        typedText.value = "";
        date = new Date();
        startTime = date.getTime();
        this.innerText = "Stop";
        playGame();
    } else if(this.innerText=="Stop") {
        typedText.disabled = true;
        date = new Date();
        endTime = date.getTime();
        this.innerText = "Start";
    }
} );

function playGame() {
 let randomPara = Math.floor(Math.random()*textToType.length);
 messageArea.innerText = textToType[randomPara];
}

speedbtn.addEventListener("click", function () {
    let timetaken = endTime - startTime;
    let words = typedText.value.split(" ");
    let  speed = Math.floor(words.length*1000*60/timetaken);
    let accuracy = accuracyCalc(messageArea.innerText,typedText.value);
    document.querySelector("#speed").innerText = "Your typing speed is: "+speed + "WPM and Accuracy is: "+accuracy +"%";
});

function accuracyCalc (str1, str2) {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count = 0;
    words2.forEach((element,index) => {
     if(element == words1[index]) count++;
    });
    return (count/words2.length)*100;
}