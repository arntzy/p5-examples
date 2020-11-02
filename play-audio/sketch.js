// this is what we are going to play
let song

// called before setup in a blocking way to load assets, etc.
function preload () {
  song = loadSound('./assets/song.mp3')
}

function setup () {
  createCanvas(400, 400)
  background(255, 0, 0)
  textSize(16)
  textAlign(CENTER)
  text('Click Anywhere to Play/Stop the song!', 200, 200)
}

// nice
function draw () {}

// actually starts and stops the audio and changes the color of the square
function mousePressed () {
  if (song.isPlaying()) {
    song.stop()
    background(255, 0, 0)
    text('Click Anywhere to Play/Stop the song!', 200, 200)
  } else {
    song.play()
    background(0, 255, 0)
    text('Click Anywhere to Play/Stop the song!', 200, 200)
  }
}
