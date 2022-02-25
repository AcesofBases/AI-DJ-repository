scoreLeftWrist=0;
scoreRightWrist=0;
LeftWristX=0;
LeftWristY=0;

RightWristX=0;
RightWristY=0;

song="";
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on("pose" ,gotPoses);
}

function modelLoaded(){
    console.log("poseNet initialised");
}

function gotPoses(results){
if(results.length > 0 ){
    console.log(results);

scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log("scoreRightWrist " + scoreRightWrist  + "scoreLeftWrist " + scoreLeftWrist);    



    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("LeftWristX = "  +LeftWristX + "LeftWristY = " + LeftWristY);

RightWristX=results[0].pose.rightWrist.x;
RightWristY=results[0].pose.rightWrist.y;
console.log("RightWristX = " + RightWristX + "RightWristY = " + RightWristY);
}
}
function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#000000");
    strokeWeight(4);
if(scoreRightWrist > 0.2){
    
    circle(RightWristX,RightWristY,20);


    if(RightWristY >0 && RightWristY <= 100){
        document.getElementById("speed").innerHTML="Speed = X 0.5 "
        song.rate(0.5);

    }

    else if(RightWristY >100 && RightWristY <=200){
        document.getElementById("speed").innerHTML="Speed = X 1 "
        song.rate(1);
    }
    else if(RightWristY >200 && RightWristY <=300){
        document.getElementById("speed").innerHTML="Speed = X 1.5 "
        song.rate(1.5);
    }
    else if(RightWristY >300 && RightWristY <=400){
        document.getElementById("speed").innerHTML="Speed = X 2 "
        song.rate(2);

    }
else if(RightWristY >400){
        document.getElementById("speed").innerHTML="Speed = X 2.5 "
        song.rate(2.5);
    }

}
    if(scoreLeftWrist>0.2)
    {
    circle(LeftWristX,LeftWristY,20);


    int_LeftWristX=Number(LeftWristY);
    remove_decimals=floor(int_LeftWristX);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}