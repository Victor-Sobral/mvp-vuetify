const show = ref(false)
const message = ref('')
const color = ref('sucess')
const timeout = ref(7000)

export function useNotification() {
  const success = (msg, duration = 7000) => {
    message.value = msg
    color.value = 'sucess'
    timeout.value = duration
    show.value = true
  }

  const warning = (msg, duration = 7000) => {
    message.value = msg
    color.value = 'warning'
    timeout.value = duration
    show.value = true
  }

  const error = (msg, duration = 7000) => {
    message.value = msg
    color.value = 'error'
    timeout.value = duration
    show.value = true
  }

  const info = (msg, duration = 7000) => {
    message.value = msg
    color.value = 'info'
    timeout.value = duration
    show.value = true
  }
  return {
    success,
    error,
    warning,
    info,
    show,
    color,
    timeout,
    message,
  }
}
