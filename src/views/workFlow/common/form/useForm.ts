import { ref, computed } from 'vue'

export function useTextInput(props: any, emit: any) {
  const _value = computed({
    get: () => props.value,
    set: (val) => emit('input', val)
  })

  const mode = ref(props.mode || 'DESIGN')
  const required = ref(props.required || false)

  return {
    _value,
    mode,
    required
  }
}
