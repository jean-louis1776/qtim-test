<script setup lang="ts">
</script>

<template>
  <footer class="bg-abyss text-moon mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">О нас</h3>
          <p class="text-stone text-sm">
            Добро пожаловать в наш блог. Здесь вы найдете интересные статьи и новости.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4">Навигация</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <NuxtLink to="/" class="text-stone hover:text-lavender transition-colors">
                Главная
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-stone hover:text-lavender transition-colors">
                Блог
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4">Контакты</h3>
          <p class="text-stone text-sm">
            Email: info@qtim.com<br />
            Телефон: +7 (999) 123-45-67
          </p>
        </div>
      </div>

      <div class="border-t border-stone mt-8 pt-6 text-center text-sm text-stone">
        <p>&copy; {{ new Date().getFullYear() }} QTIM Blog. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>
