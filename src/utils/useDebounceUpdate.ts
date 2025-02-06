export const useDebounceUpdate = () => {
  let isUpdating = false

  const debouncedUpdate = <T>(updateFn: () => T): Promise<T> => {
    return new Promise<T>((resolve) => {
      if (isUpdating) {
        resolve()
        return
      }
      isUpdating = true

      updateFn()

      setTimeout(() => {
        isUpdating = false
        resolve()
      }, 300)
    })
  }

  return {
    debouncedUpdate
  }
}
