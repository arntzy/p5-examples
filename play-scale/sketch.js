let osc, envelope, fft, button

// This is a C major scale by midi note
let playingScale = [60, 62, 64, 65, 67, 69, 71, 72]

// flat the 3rd, 6th, and 7th to make a natural minor scale
const naturalMinorTransform = [0, 0, -1, 0, 0, -1, -1, 0]

// index of the scale array
let note = 0

function setup () {
  createCanvas(710, 200)

  // Instantiate a new oscillator
  osc = new p5.SinOsc()

  // Instantiate the envelope
  envelope = new p5.Env()

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5)

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0)

  // start the oscillator playing
  osc.start()

  // fast fourier transform
  fft = new p5.FFT()
  noStroke()

  // put a dumb button on there to change the scale
  button = createButton('minorize')
  button.position(0, 0)
  button.mousePressed(changeScale)
}

// apply the transform to the original scale array
function changeScale () {
  transformedScale = []
  for (note in playingScale) {
    transformedScale.push(playingScale[note] + naturalMinorTransform[note])
  }
  playingScale = transformedScale
  console.log(playingScale)
}

function draw () {
  background(20)

  // every second play a note
  if (frameCount % 60 === 0 || frameCount === 1) {
    const midiValue = playingScale[note]
    const freqValue = midiToFreq(midiValue)
    osc.freq(freqValue)

    envelope.play(osc, 0, 0.1)
    note = (note + 1) % playingScale.length
  }

  // plot FFT.analyze() frequency analysis on the canvas
  const spectrum = fft.analyze()
  for (let i = 0; i < spectrum.length / 20; i++) {
    fill(spectrum[i], spectrum[i] / 10, 0)
    const x = map(i, 0, spectrum.length / 20, 0, width)
    const h = map(spectrum[i], 0, 255, 0, height)
    rect(x, height, spectrum.length / 20, -h)
  }
}
