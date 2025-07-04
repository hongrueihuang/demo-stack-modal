interface ModalOptions {
    id: string
    title: string
    message: string
    type: 'error' | 'success' | 'warning'
    onConfirm: () => void
    onCancel: () => void
    confirmText?: string
    cancelText?: string
}

export function useModalStack() {
    const stack = useState<ModalOptions[]>('modal-stack', () => [])

    const add = (options: ModalOptions) => stack.value.push(options)

    const close = (id = null) => {
        if (id) {
            stack.value = stack.value.filter(i => i.id !== id)
            return
        }
        stack.value = []
    }

    return {
        stack,
        add,
        close
    }
}