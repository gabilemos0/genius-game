var gameStarted = false
const btnStart: HTMLButtonElement | null = document.getElementById(
  'start'
) as HTMLButtonElement | null

const colors = [
  document.getElementById('color-0'),
  document.getElementById('color-1'),
  document.getElementById('color-2'),
  document.getElementById('color-3'),
  document.getElementById('start')
]

const sounds = [
  new Audio('./assets/sounds/sound0.wav'),
  new Audio('./assets/sounds/sound1.wav'),
  new Audio('./assets/sounds/sound2.wav'),
  new Audio('./assets/sounds/sound3.wav'),
  new Audio('./assets/sounds/error.mp3')
]

const score = document.getElementById('genius_score')

const error = document.getElementById('modal-error')

let positions: any = [],
  mPositions: any = []

const configs = async () => {
  colors.map((color, idx) => {
    color?.addEventListener('click', event => setPosition(event))
  })
}

const setPosition = async (event: any) => {
  let position = event.currentTarget.getAttribute('source')
  sounds[position].play()
  mPositions.push(parseInt(position))

  let currentPosition = mPositions.length - 1
  setTimeout(async () => {
    if (positions[currentPosition] !== mPositions[currentPosition]) {
      sounds[4].play()
      //COLOCAR O MODAL
    } else {
      if (currentPosition === position.length - 1) {
        setTimeout(async () => {
          if (score) {
            score.innerText = position.length
          }
          await loadPosition()
        }, 500)
      }
    }
  }, 1000)
}

const iluminatePosition = async () => {
  let i = 0
  let interval = setInterval(async () => {
    let item = positions[i]

    await sounds[item].play()
    await colors[item]?.classList.add(`genius_item-${item}_active`)
    setTimeout(async () => {
      await colors[item]?.classList.remove(`genius_item${item}_active`)
    }, 700)

    i++

    if (i === positions.length) {
      clearInterval(interval)
    }
  }, 2000)
}

const defineHeight = () => {
  const elements: any = document.querySelectorAll(
    '.genius_item, genius_restart'
  )
  elements.forEach((element: any) => {
    element.style.height = `${element.offsetWidth}px`

    if (element.id === 'start') {
      element.style.marginTop = `-${element.offsetWidth / 2}px`
      element.style.marginLeft = `-${element.offsetWidth / 2}px`
    }
  })
}

window.addEventListener('resize', () => {
  defineHeight()
})

defineHeight()

const startGame = async () => {
  if (!gameStarted) {
    gameStarted = true
    if (btnStart) {
      btnStart.disabled = true
      btnStart.innerText = 'Game started!!!'
      loadPosition()
    }
  }
}

const loadPosition = async () => {
  let aleatory = 0
  if (positions.length >= 4) {
    aleatory = Math.floor(Math.random() * 4)
  } else {
    if (positions.length > 0) {
      aleatory = positions[positions.length - 1] + 1
    }
  }
  positions.push(aleatory)
  await iluminatePosition()
  mPositions = []
}

const restart = () => {
  gameStarted = false
  if (btnStart) {
    btnStart.disabled = false
    btnStart.innerText = 'Start Genius!!!'
  }
}

const lost = (bootstrap: any, element: HTMLElement) => {
  const modal = new bootstrap.Modal(element, {})
  modal.show()
}

window.addEventListener('load', () => {
  configs()
})
