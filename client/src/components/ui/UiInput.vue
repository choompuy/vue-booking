<script setup lang="ts">
import { computed, type InputTypeHTMLAttribute } from 'vue'
import { useField } from 'vee-validate'
import { FloatLabel, InputGroup, InputGroupAddon, InputText, Message, Password } from 'primevue'

const props = defineProps<{
    title?: string
    type?: InputTypeHTMLAttribute
    name: string
    icon?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    maxlength?: number
    autocomplete?: 'on' | 'off'
    helpText?: string
}>()

const { value, errorMessage, errors, handleBlur, handleChange } = useField<string | null>(
    () => props.name,
    undefined,
    {
        validateOnValueUpdate: false,
    },
)

const isPasswordField = computed(() => props.type === 'password')
const hasError = computed(() => !!errorMessage.value)
const commonAttrs = computed(() => ({
    modelValue: value.value,
    type: props.type ?? 'text',
    name: props.name,
    required: props.required,
    disabled: props.disabled,
    maxlength: props.maxlength ?? 50,
    autocomplete: props.autocomplete,
    invalid: hasError.value,
    fluid: true,
}))
const specificAttrs = computed(() =>
    isPasswordField.value
        ? {
              inputId: props.name,
              toggleMask: true,
              feedback: false,
          }
        : {
              id: props.name,
          },
)
const eventHandlers = {
    blur: (event: Event) => handleBlur(event, true),
    change: handleChange,
    input: (event: Event) => handleChange(event, !!errorMessage.value),
}
</script>

<template>
    <div class="flex-column gap-xs">
        <InputGroup>
            <InputGroupAddon v-if="icon">
                <i :class="icon"></i>
            </InputGroupAddon>
            <FloatLabel variant="on">
                <component
                    :is="isPasswordField ? Password : InputText"
                    v-bind="{ ...commonAttrs, ...specificAttrs }"
                    v-on="eventHandlers"
                />
                <label v-if="title" :for="name">{{ title }}</label>
            </FloatLabel>
        </InputGroup>

        <Message v-if="helpText" size="small" severity="secondary" variant="simple">
            {{ helpText }}
        </Message>

        <div v-if="errors.length !== 0" class="flex-column">
            <Message
                v-for="(errMsg, index) in errors"
                :key="'password-error-message' + index"
                severity="error"
                variant="simple"
                size="small"
            >
                {{ errMsg }}
            </Message>
        </div>
    </div>
</template>
