const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export async function fetchDoctors(page = 1, limit = 5) {
  const response = await fetch(`${API_URL}/employers?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}



export async function fetchDoctorById(id) {
  const response = await fetch(`${API_URL}/employers/${id}`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartments() {
  const response = await fetch(`${API_URL}/departments`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartmentsById(id) {
  const response = await fetch(`${API_URL}/departments/${id}`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartmentHead(departmentId) {
  try {
    const response = await fetch(`${API_URL}/departments/${departmentId}/head`);
    if (!response.ok) {
      throw new Error("Ошибка загрузки главного врача");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}

export async function fetchDepartmentDoctors(departmentId) {
  const response = await fetch(
    `${API_URL}/departments/${departmentId}/doctors`
  );

  if (!response.ok) {
    console.error(
      "Ошибка ответа сервера:",
      response.status,
      response.statusText
    );
    throw new Error("Ошибка загрузки данных врачей отдела");
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error("Ошибка обработки ответа сервера");
  }
}
