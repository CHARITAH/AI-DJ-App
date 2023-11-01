song = "";
rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('posenet has been initialized');
}

function gotPoses(result){
    if(result.length > 0){
        console.log(result);
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        scoreRightWrist = result[0].pose.keypoints[10].score;
        console.log("score right wrist is =" + scoreRightWrist);
        console.log("score left wrist is =" + scoreLeftWrist);

        leftwristX = result[0].pose.leftWrist.x;
        leftwristY = result[0].pose.leftWrist.y;
        console.log("leftwristX =" + leftwristX + "leftwristY = " + leftwristY );

        rightwristX = result[0].pose.rightWrist.x;
        rightwristY = result[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY);
    }
}

function draw() {
    image(video, 0 , 0 , 600, 500);

    fill("#073669");
    stroke("#021326");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftwristX,leftwristY,20);
        InNumberleftwristY = Number(leftwristY);
        remove_decimals = floor(InNumberleftwristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume =" + volume;
        song.setVolume(volume);
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightwristX, rightwristY,20);

        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }

       else if (rightwristY > 100 && rightwristY <= 200)
       {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
       }

       else if(rightwristX > 200 && rightwristX <= 300)
       {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
       }

       else if(rightwristX > 300 && rightwristX <= 400)
       {
        document.getElementById("spped").innerHTML = "Speed = 2x";
        song.rate(2);
       }

       else if(rightwristX > 400)
       {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
       }
    }

    

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}