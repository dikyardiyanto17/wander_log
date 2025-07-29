<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import { computed, onMounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  themeStore.initTheme();
});

const isDark = computed({
  get: () => themeStore.isDark,
  set: (value) => themeStore.setTheme(value),
});

const isLoggedIn = computed(() => !!authStore.confirmed);

const handleLogout = async () => {
  await authStore.removeToken();
  await authStore.removeUsers();
  router.push("/login");
};

// temp solution
const goToUser = (event: Event, id: number | string) => {
  event.stopPropagation();
  window.location.href = `/travelslist/${id}`;
  // router.replace(`/travelslist/${id}`);
};
</script>

<template>
  <nav class="navbar">
    <a href="/" class="brand">WonderLog</a>

    <div class="right">
      <label class="theme-switch" title="Toggle Theme">
        <input type="checkbox" v-model="isDark" />
        <span class="slider">
          <font-awesome-icon :icon="['fas', 'sun']" class="sun-icon" />
          <font-awesome-icon :icon="['fas', 'moon']" class="moon-icon" />
        </span>
      </label>

      <template v-if="isLoggedIn" style="z-index: 9999">
        <a class="avatar" @click="(e) => goToUser(e, authStore.id)">{{ authStore.initial }}</a>
        <a class="greeting" @click="(e) => goToUser(e, authStore.id)"
          >Hello, {{ authStore.username }}</a
        >
        <button type="button" class="btn" @click="handleLogout">Logout</button>
      </template>

      <template v-else>
        <a href="/login" class="btn">Login</a>
        <a href="/register" class="btn">Sign Up</a>
      </template>
    </div>
  </nav>
</template>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  cursor: pointer;
}

.theme-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 28px;
  cursor: pointer;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: background-color 0.3s;
}

.slider::before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
}

.sun-icon,
.moon-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #f39c12;
  pointer-events: none;
  user-select: none;
}

.sun-icon {
  left: 5px;
}

.moon-icon {
  right: 8px;
  color: #34495e;
}

.theme-switch input:checked + .slider {
  background-color: #34495e;
}

.theme-switch input:checked + .slider::before {
  transform: translateX(32px);
}

.light-mode .navbar {
  position: sticky;
  top: 0;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  flex-wrap: wrap;
  transition: 1s;
  min-height: 60px;
  max-height: 60px;
}

.light-mode .navbar.scrolled {
  background-color: rgba(255, 255, 255, 1);
  transition: 1s;
}

.light-mode .navbar .brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.light-mode .navbar .right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.light-mode .avatar {
  width: 40px;
  height: 40px;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  cursor: pointer;
}

.light-mode .greeting {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
}

.light-mode .btn {
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
}

.light-mode .btn:hover {
  background-color: #357abd;
}

.light-mode form {
  margin: 0;
}

@media (max-width: 748px) {
  .light-mode .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    min-height: 100px;
    max-height: 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .light-mode .navbar .brand {
    font-size: 1.2rem;
  }

  .light-mode .greeting {
    font-size: 0.9rem;
  }

  .light-mode .avatar {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .light-mode .btn {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}

.dark-mode .navbar {
  position: sticky;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  z-index: 1000;
  flex-wrap: wrap;
  transition: 1s;
  min-height: 60px;
  max-height: 60px;
}

.dark-mode .navbar.scrolled {
  background-color: rgba(0, 0, 0, 0.85);
  transition: 1s;
}

.dark-mode .navbar .brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f0f0f0;
}

.dark-mode .navbar .right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.dark-mode .greeting {
  font-weight: 500;
  color: #f0f0f0;
  font-size: 1rem;
  cursor: pointer;
}

.dark-mode .avatar {
  width: 40px;
  height: 40px;
  background-color: #2bd4c0;
  color: #000;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.dark-mode .avatar:hover {
  background-color: #1ea99b;
}

.dark-mode .btn {
  padding: 8px 16px;
  background-color: #2bd4c0;
  color: #000;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.dark-mode .btn:hover {
  background-color: #1ea99b;
}

.dark-mode form {
  margin: 0;
}

@media (max-width: 748px) {
  .dark-mode .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    min-height: 100px;
    max-height: 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .dark-mode .navbar .brand {
    font-size: 1.2rem;
  }

  .dark-mode .greeting {
    font-size: 0.9rem;
  }

  .dark-mode .avatar {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  .dark-mode .btn {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
}
</style>
