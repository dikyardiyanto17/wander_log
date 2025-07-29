<script setup lang="ts">
// Assets
import "@/myassets/css/input.css";

// Vue
import { reactive } from "vue";

// Api
import AuthService from "@/api/auth";

// Stores
import { useInfoStore } from "@/stores/info";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const infoStore = useInfoStore();
const authStore = useAuthStore();
const router = useRouter();

// Typescript types
import type { LoginInput, LoginRegisterResponse } from "@/plugins/types";

// Variable
const form = reactive<LoginInput>({
  identifier: "",
  password: "",
});

// Function
const handleLogin = async () => {
  try {
    if (!form.identifier || !form.password) {
      throw { name: "frontend_error", message: "Please complete the login form!" };
    }
    await infoStore.startLoading();
    const response: LoginRegisterResponse = await AuthService.login(form);
    const { user, jwt } = response;
    const { username, confirmed, blocked, email, provider, id } = user;
    if (blocked) {
      throw { name: "Users is blocked", message: "This users is currently blocker" };
    }
    const initial =
      username
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("") || "";
    await authStore.saveToken(jwt);
    await authStore.saveUsers({ username, jwt, confirmed, blocked, email, provider, initial, id });
    await infoStore.showInfo({
      messages: "Successfully login account, please wait a moment",
      type: "success",
    });
    setTimeout(() => {
      router.push("/");
    }, 5000);
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    await infoStore.resetLoading();
  }
};
</script>
<template>
  <div class="custom-container">
    <form class="login-container" id="login-form" @submit.prevent="handleLogin">
      <div class="login-header"><i class="fa-brands fa-slack"></i><span>Login</span></div>
      <div class="login-content">
        <input v-model="form.identifier" type="email" placeholder="Email" class="custom-input" />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="custom-input"
        />
      </div>
      <div class="login-footer">
        <button class="login-button" type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.custom-container {
  width: 100vw;
  height: 80vh;
  max-height: 80vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

i {
  margin-right: 5px;
}

.login-content {
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  padding-left: 20px;
}

.login-footer {
  padding: 20px 10px 10px 20px;
  width: 100%;
}

.dark-mode .login-container {
  width: 500px;
  min-height: 200px;
  background-color: #1f1f1f89;
  border-radius: 10px;
  color: #f0f0f0;
  position: relative;
  box-shadow: 0 4px 12px rgb(255, 255, 255);
  padding: 20px 10px 30px 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dark-mode .login-header {
  position: absolute;
  top: -15px;
  left: 20px;
  /* left: 50%;
    transform: translateX(-50%); */
  background-color: #1f1f1f;
  width: 150px;
  padding: 6px 0;
  text-align: center;
  font-weight: 500;
  border-radius: 5px;
  backdrop-filter: blur(3px);
  border: 1px solid #1f1f1f;
  box-shadow: 0 -2px 12px rgb(255, 255, 255);
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.dark-mode .login-button {
  padding: 10px 24px;
  background-color: #2bd4c0;
  color: #000;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.dark-mode .login-button:hover {
  background-color: #30e0c7;
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.light-mode .login-container {
  width: 500px;
  min-height: 200px;
  background-color: #ffffffcc;
  /* semi-transparent white */
  border-radius: 10px;
  color: #000000;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px 10px 30px 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.light-mode .login-header {
  position: absolute;
  top: -15px;
  left: 20px;
  background-color: #ffffff;
  width: 150px;
  padding: 6px 0;
  text-align: center;
  font-weight: 500;
  border-radius: 5px;
  backdrop-filter: blur(3px);
  border: 1px solid #e0e0e0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.light-mode .login-button {
  padding: 10px 24px;
  background-color: #2bd4c0;
  color: #000000;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
}

.light-mode .login-button:hover {
  background-color: #30e0c7;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}
</style>
