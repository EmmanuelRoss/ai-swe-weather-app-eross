export function showLoading() {
  document.querySelector('#status').textContent = "Cargando...";
}

export function showError(msg) {
  document.querySelector('#status').textContent = msg;
}

export function clearStatus() {
  document.querySelector('#status').textContent = "";
}