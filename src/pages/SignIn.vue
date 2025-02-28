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
            <rect x="36" y="39" width="20" height="18" rx="3" fill="#2C3E50" />
            <rect x="64" y="39" width="20" height="18" rx="3" fill="#2C3E50" />

            <!-- Eyes -->
            <circle :cx="leftEyeX" :cy="eyeY" r="5" fill="white" class="eye left-eye" />
            <circle :cx="rightEyeX" :cy="eyeY" r="5" fill="white" class="eye right-eye" />

            <!-- Pupils -->
            <circle :cx="leftPupilX" :cy="eyeY" r="2" fill="#2C3E50" class="pupil left-pupil" />
            <circle :cx="rightPupilX" :cy="eyeY" r="2" fill="#2C3E50" class="pupil right-pupil" />

            <!-- Eye Covers -->
            <rect
              x="36"
              y="39"
              width="20"
              height="18"
              rx="3"
              fill="#4D7EA8"
              :class="[
                'eye-cover',
                'left-eye-cover',
                isPasswordFocused ? (showPassword ? 'revealing' : 'covering') : 'hidden',
              ]"
            />
            <rect
              x="64"
              y="39"
              width="20"
              height="18"
              rx="3"
              fill="#4D7EA8"
              :class="[
                'eye-cover',
                'right-eye-cover',
                isPasswordFocused ? (showPassword ? 'revealing' : 'covering') : 'hidden',
              ]"
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
        >
          <template #prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          label="Password"
          outlined
          :dense="dense"
          :type="showPassword ? 'text' : 'password'"
          class="q-mb-md"
          @focus="onPasswordFocus"
          @blur="onPasswordBlur"
        >
          <template #prepend>
            <q-icon name="lock" />
          </template>
          <template #append>
            <q-icon
              :name="showPassword ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>

        <div class="flex justify-between q-mb-md">
          <q-checkbox v-model="rememberMe" label="Remember me" />
          <a href="#" class="text-primary q-mt-sm">Forgot Password?</a>
        </div>

        <q-btn color="primary" class="full-width" label="Sign In" />

        <div class="text-center q-mt-md">
          Don't have an account? <a href="#" class="text-primary">Sign Up</a>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isUsernameFocused = ref(false)
const isPasswordFocused = ref(false)
const dense = ref(false)

// Eye position constants
const baseLeftEyeX = ref(42)
const baseRightEyeX = ref(70)
const eyeMovementRange = ref(8)
const baseEyeY = ref(50)

// Current eye positions
const leftEyeX = ref(baseLeftEyeX.value)
const rightEyeX = ref(baseRightEyeX.value)
const leftPupilX = ref(baseLeftEyeX.value)
const rightPupilX = ref(baseRightEyeX.value)
const eyeY = ref(baseEyeY.value)

const onUsernameFocus = () => {
  isUsernameFocused.value = true
  isPasswordFocused.value = false
  resetEyePosition()
  onUsernameInput()
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

  // Create a curve by adjusting vertical position
  const verticalOffset = position > 0 ? 2 * Math.sin(position * Math.PI) : 0

  // Update eye positions horizontally and vertically
  leftEyeX.value = baseLeftEyeX.value + eyeOffset
  rightEyeX.value = baseRightEyeX.value + eyeOffset
  leftPupilX.value = baseLeftEyeX.value + eyeOffset
  rightPupilX.value = baseRightEyeX.value + eyeOffset
  eyeY.value = baseEyeY.value + verticalOffset
}

const resetEyePosition = () => {
  leftEyeX.value = baseLeftEyeX.value
  rightEyeX.value = baseRightEyeX.value
  leftPupilX.value = baseLeftEyeX.value
  rightPupilX.value = baseRightEyeX.value
  eyeY.value = baseEyeY.value
}

// Set eyes to a downward position (halfway through curve)
const setEyesDownward = () => {
  // Position eyes halfway through horizontal range
  const halfwayPosition = 0.5
  const eyeOffset = halfwayPosition * eyeMovementRange.value

  leftEyeX.value = baseLeftEyeX.value + eyeOffset
  rightEyeX.value = baseRightEyeX.value + eyeOffset
  leftPupilX.value = baseLeftEyeX.value + eyeOffset
  rightPupilX.value = baseRightEyeX.value + eyeOffset

  // Set eyes to look down (positive vertical offset)
  eyeY.value = baseEyeY.value + 2
}

const onPasswordFocus = () => {
  isPasswordFocused.value = true
  isUsernameFocused.value = false

  // When focusing on password field, set eyes position based on current visibility
  if (showPassword.value) {
    setEyesDownward()
  }
}

const onPasswordBlur = () => {
  isPasswordFocused.value = false
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value

  // When revealing password, position eyes downward
  if (showPassword.value) {
    setEyesDownward()
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
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
.pupil {
  transition: all 0.3s ease;
}

/* Base eye cover styles */
.eye-cover {
  /* Remove transition to prevent conflicts with animation */
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Eye cover states */
.eye-cover.hidden {
  opacity: 0;
  transform: scaleY(0);
  /* Ensure immediate hiding without animation */
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

/* When covering eyes (password is hidden) */
.eye-cover.covering {
  opacity: 1;
  transform: scaleY(1);
  animation: cover-eyes 0.5s forwards;
}

/* When revealing eyes (password is shown) */
.eye-cover.revealing {
  opacity: 0;
  transform: scaleY(0);
  animation: reveal-eyes 0.5s forwards;
}

/* Left eye animations */
.eye-cover.left-eye-cover.covering {
  animation: cover-eyes 0.5s forwards;
}

.eye-cover.left-eye-cover.revealing {
  animation: reveal-eyes 0.5s forwards;
}

/* Right eye animations - same timing but with separate properties to avoid flashing */
.eye-cover.right-eye-cover.covering {
  animation: cover-eyes-right 0.5s forwards;
}

.eye-cover.right-eye-cover.revealing {
  animation: reveal-eyes-right 0.5s forwards;
}

/* Animation for covering eyes - left eye */
@keyframes cover-eyes {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  10% {
    transform: scaleY(0.1);
    opacity: 0.3;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* Animation for revealing eyes - left eye */
@keyframes reveal-eyes {
  0% {
    transform: scaleY(1);
    opacity: 1;
  }
  90% {
    transform: scaleY(0.1);
    opacity: 0.3;
  }
  100% {
    transform: scaleY(0);
    opacity: 0;
  }
}

/* Animation for covering eyes - right eye (with built-in delay) */
@keyframes cover-eyes-right {
  0%,
  20% {
    /* Delay built into keyframe */
    transform: scaleY(0);
    opacity: 0;
  }
  30% {
    transform: scaleY(0.1);
    opacity: 0.3;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

/* Animation for revealing eyes - right eye (with built-in delay) */
@keyframes reveal-eyes-right {
  0%,
  20% {
    /* Delay built into keyframe */
    transform: scaleY(1);
    opacity: 1;
  }
  90% {
    transform: scaleY(0.1);
    opacity: 0.3;
  }
  100% {
    transform: scaleY(0);
    opacity: 0;
  }
}
</style>
