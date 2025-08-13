<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { marked } from "marked";

const router = useRouter();
const message = ref("");
const messages = ref([]);
const loading = ref(false);
const chatContainer = ref(null);
const dropdownOpen = ref(false);

// Markdown parser
// const formatMessage = (text) => {
//   const cleaned = (text || "")
//     .replace(/^\* /gm, "") // Hilangkan bintang di awal baris list
//     .replace(/\n{2,}/g, "\n\n"); // Atur newline jadi konsisten
//   return marked.parse(cleaned);
// };

const formatMessage = (text) => {
  const cleaned = (text || "")
    .replace(/^\*\s+/gm, "- ") // bintang jadi dash list
    .replace(/\n{2,}/g, "\n\n"); // konsisten newline

  const html = marked.parse(cleaned);
  return html;
};

const getUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  } catch {
    return null;
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!message.value.trim()) return;
  messages.value.push({ sender: "user", text: message.value });
  loading.value = true;

  try {
    const res = await fetch("http://202.10.35.143:3000/api/chat/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: getUser(), prompt: message.value }),
    });
    const data = await res.json();
    messages.value.push({
      sender: "bot",
      text: data.response || "Tidak ada respons.",
    });
  } catch (err) {
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

const getChat = async () => {
  try {
    const res = await fetch(
      `http://202.10.35.143:3000/api/chat/chats/${getUser()}`
    );
    const data = await res.json();
    messages.value = data.chats.flatMap((chat) => [
      { sender: "user", text: chat.prompt },
      { sender: "bot", text: chat.response },
    ]);
    scrollToBottom();
  } catch (err) {
    console.error("Gagal memuat chat:", err);
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = (e) => {
  if (!e.target.closest(".dropdown-container")) {
    dropdownOpen.value = false;
  }
};

const hapusItem = () => {
  messages.value = [];
  dropdownOpen.value = false;
};

onMounted(() => {
  getChat();
  document.addEventListener("click", closeDropdown);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-100 font-sans">
    <!-- Header -->
    <header
      class="bg-white text-gray-800 px-4 py-3 flex justify-between items-center shadow-sm"
    >
      <div class="flex items-center gap-3">
        <Icon
          icon="mdi:arrow-left"
          class="w-6 h-6 cursor-pointer"
          @click="router.back()"
        />
        <span class="text-lg font-semibold">🤖 Chatbot AI</span>
      </div>
      <div class="relative dropdown-container">
        <button
          @click="toggleDropdown"
          class="p-2 rounded-full hover:bg-gray-100"
        >
          <Icon icon="mdi:dots-vertical" class="w-6 h-6 text-gray-700" />
        </button>
        <transition name="fade">
          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-md z-50 ring-1"
          >
            <button
              @click="hapusItem"
              class="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
            >
              🗑 Hapus
            </button>
          </div>
        </transition>
      </div>
    </header>

    <!-- Chat Content -->
    <div
      ref="chatContainer"
      class="flex-1 overflow-y-auto px-4 py-4 space-y-2 bg-gray-100"
    >
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="flex items-start mb-2 last:mb-0"
        :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
      >
        <!-- Bot Icon -->
        <div v-if="msg.sender !== 'user'" class="mr-2 mt-1">
          <Icon icon="mdi:robot" class="w-6 h-6 text-gray-500" />
        </div>

        <!-- Chat Bubble -->
        <div
          :class="[
            'relative px-4 py-2 max-w-xs text-sm shadow-md',
            msg.sender === 'user'
              ? 'bg-pink-500 text-white rounded-2xl rounded-br-none'
              : 'bg-white text-gray-800 rounded-2xl rounded-bl-none prose prose-sm prose-p:my-1 prose-strong:font-semibold prose-li:ml-4',
          ]"
          v-html="msg.sender === 'bot' ? formatMessage(msg.text) : msg.text"
        ></div>

        <!-- User Icon -->
        <div v-if="msg.sender === 'user'" class="ml-2 mt-1">
          <Icon icon="mdi:account-circle" class="w-6 h-6 text-pink-500" />
        </div>
      </div>

      <!-- Typing Indicator -->
      <div
        v-if="loading"
        class="flex items-center gap-1 text-gray-500 text-sm mt-2"
      >
        <Icon icon="mdi:dots-horizontal" class="w-5 h-5 animate-pulse" />
        <span>Bot sedang mengetik...</span>
      </div>
    </div>

    <!-- Input -->
    <form
      @submit.prevent="sendMessage"
      class="bg-white border-t border-gray-200 px-3 py-2 flex items-center gap-2"
    >
      <input
        v-model="message"
        type="text"
        placeholder="Tulis pesan..."
        class="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        :disabled="loading"
      />
      <button
        type="submit"
        class="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 disabled:opacity-50"
        :disabled="loading || !message.trim()"
      >
        <Icon icon="mdi:send" class="w-5 h-5" />
      </button>
    </form>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Tambahan styling untuk bubble chat */
.prose-sm :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
