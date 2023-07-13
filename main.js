status = ""
video = ""
objects = []

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

    input_text = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
}

function draw(){

    image(video, 0, 0, 480, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status_model").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == input_text){
                video.stop()
                document.getElementById("status_found").innerHTML = "Object Found";
                objectDetector.detect(gotResult)

                synth = window.speechSynthesis
                utterThis = new SpeechSynthesisUtterance(input_text + "found");
                synth.speak(utterThis)
            }else
            {
                document.getElementById("status_found").innerHTML = "Object Not Found";
            }
        }

}
}

function gotResult(error, results){
    if(error) {
        console.log(error);
    }
    console.log(results)
    objects = results;
}