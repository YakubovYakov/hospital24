export async function fetchDoctors() {
  const response = await fetch("http://localhost:3002/api/employers");
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDoctorById(id) {
  const response = await fetch(`http://localhost:3002/api/employers/${id}`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartments() {
  const response = await fetch("http://localhost:3002/api/departments");
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartmentsById(id) {
  const response = await fetch(`http://localhost:3002/api/departments/${id}`);
  if (!response.ok) throw new Error("Ошибка загрузки данных");
  const data = await response.json();
  return data;
}

export async function fetchDepartmentHead(departmentId) {
  const response = await fetch(
    `http://localhost:3002/api/departments/${departmentId}/head`
  );
  if (!response.ok) throw new Error("Ошибка загрузки главного врача");
  const data = await response.json();
  return data;
}

export async function fetchDepartmentDoctors(departmentId) {
  const response = await fetch(
    `http://localhost:3002/api/departments/${departmentId}/doctors`
  );

  if (!response.ok) {
    console.error(
      "Ошибка ответа сервера:",
      response.status,
      response.statusText
    );
    throw new Error("Ошибка загрузки данных врачей отдела");
  }

  const text = await response.text(); // Получите текст ответа
  console.log("Сырой ответ сервера:", text); // Логируем сырой текст ответа

  try {
    return JSON.parse(text); // Преобразуем в JSON только если текст непустой
  } catch (e) {
    console.error("Ошибка парсинга JSON:", e);
    throw new Error("Ошибка обработки ответа сервера");
  }
}
