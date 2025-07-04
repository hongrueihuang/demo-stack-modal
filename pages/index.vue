<script setup lang="ts">
interface ModalOptions {
    id: number
    title: string
    message?: string
    type: 'error' | 'success' | 'warning'

}
const stack = ref<ModalOptions[]>([])

const handleClick = (value: Omit<ModalOptions, 'id'>) => {
    const id = Date.now()
    stack.value.push({...value, id})
}

const handleClose = (id: number) => {
    stack.value = stack.value.filter(item => item.id !== id)
}

const handleClearAll = () => {
    stack.value = []
}

const getBorderColor = (type: 'error' | 'success' | 'warning') => {
    switch(type) {
        case 'error':
            return 'border-red-500'
        case 'success':
            return 'border-primary-500'
        case 'warning':
            return 'border-yellow-500'
        default:
            return 'border-primary-500'
    }
}

watch(() => stack.value.length, (v) => {
    console.log(v, document.body.classList, 'classList')
    if (v) {
        document.body.classList.add('modal-open')
    } else {
        document.body.classList.remove('modal-open')
    }
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Stack Modal Demo</h1>
    <UButton label="toggle" @click="handleClick({title: '第 1 個彈窗', message: '內容 1', type: 'error'})" />

    <teleport to="body">
        <transition-group tag="div">
            <div
                v-for="i in stack"
                :key="i.id"
                class="fixed inset-0 bg-slate-500/50 z-50 flex items-center justify-center"
            >
                <div class="w-[375px] h-auto bg-white rounded-lg p-10 text-black" :class="['border-b-2', getBorderColor(i.type)]">
                    <div class="text-center" @click="handleClose(i.id)">{{ i.title }}</div>
                    <div class="p-4">
                        {{ i.message }}
                    </div>
                    <div class="flex gap-2">
                        <UButton label="close" block @click="handleClose(i.id)" />
                        <UButton label="open" block @click="handleClick({title: `第 ${stack.length + 1} 個彈窗`, message: `內容 ${stack.length + 1}`, type: 'warning'})" />
                    </div>
                    <UButton label="clear" @click="handleClearAll" />
                </div>
            </div>
        </transition-group>
    </teleport>
    <p class="py-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, dolor.</p>
    <p class="py-20">Expedita sunt minus facilis totam voluptatibus quasi odio sint iste.</p>
    <p class="py-20">Reiciendis, quisquam quasi! Iste sunt laborum recusandae itaque sit ullam.</p>
    <p class="py-20">Dignissimos deleniti distinctio harum aspernatur accusamus blanditiis eum molestiae similique?</p>
    <p class="py-20">Nihil, autem qui fugiat veniam molestias accusantium nostrum incidunt corrupti!</p>
    <p class="py-20">Doloremque laboriosam voluptate, beatae nemo ipsum aliquam tempore accusamus atque.</p>
    <p class="py-20">Quidem, quia excepturi earum dolor enim distinctio atque minus consequatur.</p>
    <p class="py-20">Commodi aliquam voluptatum odio ex corporis cum aliquid laudantium temporibus.</p>
    <p class="py-20">Accusantium officiis, dignissimos beatae hic earum autem voluptatibus. Temporibus, rem.</p>
    <p class="py-20">Tenetur adipisci accusamus laboriosam provident reprehenderit, perspiciatis veritatis quisquam omnis!</p>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateX(200px);
}
</style>