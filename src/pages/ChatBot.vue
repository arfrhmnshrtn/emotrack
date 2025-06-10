<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const message = ref("");
const messages = ref([]);
const loading = ref(false);
const router = useRouter();

// Ambil user ID dari localStorage
const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const getId = JSON.parse(user);
      return getId.id;
    } catch (error) {
      console.error("Format user di localStorage tidak valid.");
      return null;
    }
  }
  return null;
};

// Auto scroll ke bawah setiap kali ada pesan baru
const chatContainer = ref(null);
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Kirim pesan ke bot
const sendMessage = async () => {
  if (!message.value.trim()) return;

  // Tambahkan pesan user ke daftar
  messages.value.push({ sender: "user", text: message.value });

  loading.value = true;

  try {
    const response = await fetch("http://localhost:3000/api/chat/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: getUser(),
        prompt: message.value,
      }),
    });

    const data = await response.json();

    messages.value.push({
      sender: "bot",
      text: data.response || "Tidak ada respons.",
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    messages.value.push({
      sender: "bot",
      text: "Terjadi kesalahan saat mengirim pesan.",
    });
  } finally {
    message.value = "";
    loading.value = false;
    scrollToBottom();
  }
};

// Ambil history chat dari backend
const getChat = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/chats/${getUser()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // Ubah format respons menjadi sesuai dengan format messages
    messages.value = data.chats
      .map((chat) => [
        { sender: "user", text: chat.prompt },
        { sender: "bot", text: chat.response },
      ])
      .flat();

    scrollToBottom();
  } catch (error) {
    console.error("Gagal memuat chat history:", error);
  }
};

// Auto load chat history saat halaman dibuka
onMounted(() => {
  getChat();
});
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <!-- Header -->
    <header
      class="bg-pink-500 text-white p-4 text-xl font-semibold flex items-center gap-2 shadow"
    >
      <Icon
        icon="mdi:arrow-left"
        class="w-6 h-6 cursor-pointer"
        @click="router.back()"
      />
      <span>🤖 Chatbot AI</span>
    </header>

    <!-- Chat Area -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex items-end"
        :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Avatar Bot -->
        <div v-if="msg.sender !== 'user'" class="mr-2">
          <Icon icon="mdi:robot" class="w-6 h-6 text-gray-600" />
        </div>

        <!-- Bubble Chat -->
        <div
          :class="[
            'relative px-4 py-2 rounded-2xl max-w-xs shadow',
            msg.sender === 'user'
              ? 'bg-pink-500 text-white rounded-br-none'
              : 'bg-gray-300 text-black rounded-bl-none',
          ]"
        >
          {{ msg.text }}
          <!-- Ekor chat -->
          <span
            :class="[
              'absolute bottom-0 w-3 h-3 transform rotate-45',
              msg.sender === 'user'
                ? 'bg-pink-500 right-[-6px]'
                : 'bg-gray-300 left-[-6px]',
            ]"
          ></span>
        </div>

        <!-- Avatar User -->
        <div v-if="msg.sender === 'user'" class="ml-2">
          <Icon icon="mdi:account-circle" class="w-6 h-6 text-pink-500" />
        </div>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-gray-500 italic text-sm text-left">
        <Icon icon="mdi:dots-horizontal" class="inline mr-1" />
        Bot sedang mengetik...
      </div>
    </div>

    <!-- Input Form -->
    <form
      @submit.prevent="sendMessage"
      class="p-3 bg-white flex gap-2 items-center shadow-inner"
    >
      <input
        v-model="message"
        type="text"
        placeholder="Tulis pesan..."
        class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none text-sm"
        :disabled="loading"
      />
      <button
        type="submit"
        class="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-700 disabled:opacity-50"
        :disabled="loading"
      >
        <Icon icon="mdi:send" class="w-5 h-5" />
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Tambahan: buat scroll smooth */
[ref="chatContainer"] {
  scroll-behavior: smooth;
}
</style>
