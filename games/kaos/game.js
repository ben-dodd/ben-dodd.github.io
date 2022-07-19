// let notes = [
//   'C3',
//   'C#3',
//   'D3',
//   'D#3',
//   'E3',
//   'F3',
//   'F#3',
//   'G3',
//   'G#3',
//   'A3',
//   'A#3',
//   'B3',
//   'C4',
//   'C#4',
//   'D4',
//   'D#4',
//   'E4',
//   'F4',
//   'F#4',
//   'G4',
//   'G#4',
//   'A4',
//   'A#4',
//   'B4',
//   'C5',
//   'C#5',
//   'D5',
//   'D#5',
//   'E5',
//   'F5',
//   'F#5',
//   'G5',
//   'G#5',
//   'A5',
//   'A#5',
//   'B5',
// ]

let notes = [
  [
    'E3',
    'E3',
    'F3',
    'F#3',
    'F#3',
    'A3',
    'F#3',
    'A3',
    'F#3',
    'F#3',
    'F3',
    'E3',
    'B3',
    'E3',
    'E3',
    'E3',
    'E3',
    'F3',
    'F#3',
  ],
  [
    'C3',
    'D3',
    'E3',
    'F3',
    'G3',
    'A3',
    'B3',
    'C4',
    'D4',
    'E4',
    'F4',
    'G4',
    'A4',
    'B4',
    'C5',
    'D5',
    'E5',
    'F5',
    'G5',
  ],
]

let song = 0

function changeSong() {
  song++
  if (song > notes.length - 1) song = 0
  randomiseNotes()
}

function randomiseNotes() {
  notes[song].sort(() => Math.random() - 0.5)
}

document.querySelectorAll('.key').forEach((key, i) => {
  const height = key.clientHeight
  const width = key.clientWidth
  const synth = new Tone.FMSynth().toDestination()
  const filter = new Tone.Filter(100, 'lowpass').toDestination()
  // const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start()
  // filter.frequency.rampTo(20000, 10)
  const panner = new Tone.Panner(0).toDestination()
  // const phaser = new Tone.Phaser({
  //   frequency: 15,
  //   octaves: 5,
  //   baseFrequency: 1000,
  // }).toDestination()
  const crusher = new Tone.BitCrusher(4).toDestination()
  const reverb = new Tone.Reverb(5).toDestination()
  // synth.connect(phaser)
  synth.connect(crusher)
  synth.connect(filter)
  synth.connect(panner)
  synth.connect(reverb)

  key.addEventListener('mouseover', () => {
    const now = Tone.now()
    synth.triggerAttack(notes[song][i], now)
  })
  key.addEventListener('mouseout', () => {
    const now = Tone.now()
    synth.triggerRelease(now)
  })
  key.addEventListener('mousemove', (e) => {
    filter.frequency.value = Math.abs(16000 * (e.offsetY / height))
    crusher.bits.value = Math.round(16 * (e.offsetY / height))
    panner.pan.value = 2 * (e.offsetX / width) - 1
    e.target.innerHTML = `Bit Depth: ${Math.round(
      16 * (e.offsetY / height)
    )} / Low Pass Filter: ${(16000 * (e.offsetY / height)).toFixed(
      0
    )} Hz / Pan: ${(2 * (e.offsetX / width) - 1).toFixed(2)}`
  })
  key.addEventListener('click', changeSong)
})
