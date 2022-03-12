function setup(){
    canvas=createCanvas(200,200)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas)
    synth=window.speechSynthesis
}
function clearcanvas(){
    background("white")
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet')
}
function draw(){
    stroke(0)
    strokeWeight(13)
    if(mouseIsPressed){
        line(pmouseX,pmouseY, mouseX,mouseY)
    }
}
function classifyCanvas(){
    classifier.classify(canvas,gotresult)
}
function gotresult(error,results){
    if(error){console.error(error)
    }
    console.log(results)
    document.getElementById("label").innerHTML="label: "+results[0].label;
    document.getElementById("confidence").innerHTML="confidence: "+Math.round(results[0].confidence*100)+"%";
    utter=new SpeechSynthesisUtterance(results[0].label)
    synth.speak(utter)
}