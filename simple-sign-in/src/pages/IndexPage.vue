<template>
  <div class="login-container q-pa-md">
    <q-card class="login-card q-pa-lg">
      <q-card-section class="text-center q-pb-none">
        <div class="robot-container">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
            class="robot"
          >
            <!-- Robot Head -->
            <rect x="25" y="20" width="70" height="60" rx="8" fill="#4D7EA8" />
            <rect x="30" y="25" width="60" height="50" rx="5" fill="#96C5F7" />

            <!-- Antenna -->
            <rect x="57" y="10" width="6" height="10" fill="#4D7EA8" />
            <circle cx="60" cy="7" r="5" fill="#FF5252" />

            <!-- Eye Sockets -->
            <rect x="38" y="40" width="16" height="14" rx="3" fill="#2C3E50" />
            <rect x="66" y="40" width="16" height="14" rx="3" fill="#2C3E50" />

            <!-- Eyes -->
            <circle :cx="leftEyeX" cy="47" r="6" fill="white" class="eye left-eye" />
            <circle :cx="rightEyeX" cy="47" r="6" fill="white" class="eye right-eye" />

            <!-- Pupils -->
            <circle :cx="leftPupilX" cy="47" r="3" fill="#2C3E50" class="pupil left-pupil" />
            <circle :cx="rightPupilX" cy="47" r="3" fill="#2C3E50" class="pupil right-pupil" />

            <!-- Eye Covers (for password field) -->
            <rect
              v-if="isPasswordFocused && !showPassword"
              x="38"
              y="40"
              width="16"
              height="14"
              rx="3"
              fill="#4D7EA8"
              class="eye-cover left-eye-cover"
            />
            <rect
              v-if="isPasswordFocused && !showPassword"
              x="66"
              y="40"
              width="16"
              height="14"
              rx="3"
              fill="#4D7EA8"
              class="eye-cover right-eye-cover"
            />

            <!-- Mouth -->
            <rect x="42" y="65" width="36" height="6" rx="3" fill="#2C3E50" />
            <rect x="44" y="65" width="32" height="3" rx="1.5" fill="#96C5F7" />
          </svg>
        </div>
      </q-card-section>

      <q-card-section>
        <h2 class="text-h5 text-center q-mb-md">Welcome Back</h2>

        <q-input
          v-model="username"
          label="Username"
          outlined
          :dense="dense"
          class="q-mb-md"
          @focus="onUsernameFocus"
          @blur="onUsernameBlur"
          @update:model-value="onUsernameInput"
        ></q-input>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const username = ref('')
// const password = ref('')
// const remeberMe = ref(false)
const showPassword = ref(false)
const isUsernameFocused = ref(false)
const isPasswordFocused = ref(false)
const dense = ref(false)

// Eye position constants
const baseLeftEyeX = ref(46)
const baseRightEyeX = ref(74)
const eyeMovementRange = ref(4)

// Current eye positions
const leftEyeX = ref(46)
const rightEyeX = ref(74)
const leftPupilX = ref(46)
const rightPupilX = ref(74)

const onUsernameFocus = () => {
  isUsernameFocused.value = true
  isPasswordFocused.value = false
}

const onUsernameBlur = () => {
  isUsernameFocused.value = false
}

const onUsernameInput = () => {
  if (!isUsernameFocused.value) return

  // Calculate the position based on text length
  const textLength = username.value.length
  const maxLength = 20

  // Calculate a normalized position between 0 and 1
  const position = Math.min(textLength / maxLength, 1)

  // Map the position to eye movement range
  const eyeOffset = position * eyeMovementRange.value

  // Update eye positions
  leftEyeX.value = baseLeftEyeX.value + eyeOffset
  rightEyeX.value = baseRightEyeX.value + eyeOffset
  leftPupilX.value = baseLeftEyeX.value + eyeOffset
  rightPupilX.value = baseRightEyeX.value + eyeOffset
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
}

.robot-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.robot {
  transition: all 0.3s ease;
}

.eye,
.pupil,
.eye-cover {
  transition: all 0.3s ease;
}

.eye-cover {
  animation: blink 2s infinite;
}

@keyframes blink {
  0%,
  100% {
    transform: scaleY(1);
  }
  10% {
    transform: scaleY(0.1);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>
