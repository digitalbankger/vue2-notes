import TokenService from "@/services/token.service";

const baseUrl = 'https://dist.nd.ru';

// Общая функция для выполнения запросов к API
async function fetchData(endpoint, options = {}) {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await fetch(`${baseUrl}/api${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }

  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
}

// Получаю все заметки
export function fetchNotes() {
  return fetchData(`/notes`);
}

// Удаляю заметку
export function deleteNotes(noteId) {
  const options = {
    method: 'DELETE',
  };

  return fetchData(`/notes/${noteId}`, options);
}

// Добавляю заметку
export function addNotes(note) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };

  return fetchData(`/notes`, options);
}

export function useApi() {
  return {
    fetchNotes,
    deleteNotes,
    addNotes
  };
}
