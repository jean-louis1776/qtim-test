<script setup lang="ts">
</script>

<template>
  <footer class="bg-lavender text-abyss mt-auto overflow-hidden">
    <div class="relative mx-auto max-w-360 px-28 pt-35 pb-80.5">
      <div class="grid gap-16 grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
        <div>
          <p class="mb-14 text-base">
            Is there a project?
          </p>
          <h2 class="text-[112px] font-normal leading-tight underline decoration-charcoal decoration-2 underline-offset-4">
            Let’s work
            <br />
            together
          </h2>
        </div>

        <div class="pt-18.75 space-y-9 text-base">
          <div>
            <p class="mb-3">For all questions</p>
            <p class="mb-1">+7 (920) 278—00—68</p>
            <p>qtim@agency.com</p>
          </div>

          <div class="space-y-9">
            <div class="space-y-3">
              <p>Office in Russia</p>
              <p>139 Ruben Station Lake<br />Drew, NM 52678</p>
              <button
                type="button"
                class="mt-1 w-8 h-8 rounded-full bg-abyss flex items-center justify-center text-lavender cursor-pointer"
                aria-label="Open map Russia"
              >
                <CommonIcon name="location-icon" class="w-3 h-3" />
              </button>
            </div>

            <div class="space-y-2">
              <p>Office in Dubai</p>
              <p>139 Ruben Station Lake<br />Drew, NM 52678</p>
              <button
                type="button"
                class="mt-1 w-8 h-8 rounded-full bg-abyss flex items-center justify-center text-lavender cursor-pointer"
                aria-label="Open map Dubai"
              >
                <CommonIcon name="location-icon" class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[54%] w-89.5 h-44.75 cursor-pointer rounded-t-[200px] bg-abyss text-moon flex items-center justify-center text-[32px] font-normal pt-30.5 pb-6.25 px-40"
      >
        Go
      </button>
    </div>

    <div class="mx-auto max-w-360 px-28 pb-8 pt-10 text-base text-abyss flex flex-row items-center justify-between">
      <div class="flex flex-wrap gap-8">
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">Facebook</button>
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">Instagram</button>
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">Telegram</button>
      </div>
      <div class="flex flex-wrap gap-8 justify-end">
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">Behance</button>
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">LinkedIn</button>
        <button class="underline underline-offset-4 decoration-charcoal/40 cursor-pointer">Privacy Policy</button>
      </div>
    </div>
  </footer>
</template>
