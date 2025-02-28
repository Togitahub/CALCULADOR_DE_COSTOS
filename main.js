// Constante en lugar de let para datos que no cambian
const perfiles = [
	{ perfil: "Ingeniero de Aplicaciones", tarifa: 17.75 },
	{ perfil: "Arquitecto y DBA", tarifa: 22.19 },
	{ perfil: "Diseñador UX/UI", tarifa: 12.43 },
	{ perfil: "Líder Técnico", tarifa: 26.63 },
	{ perfil: "Desarrolladores", tarifa: 17.75 },
	{ perfil: "Certificador QA", tarifa: 14.2 },
];

const proyectos = [];
console.log(proyectos);

let tbody;
let granTotalElement;

function initEventListeners() {
	document.querySelector("#projectName").addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			const projectTitle = document.querySelector("#projectTitle");
			if (projectTitle) {
				projectTitle.innerHTML = e.target.value;
				e.target.value = '';
			}
		}
	});

	document.querySelector("#pricingTable").addEventListener("input", (e) => {
		if (e.target.type === "text") {
			const row = e.target.closest("tr");
			const tarifa = parseFloat(row.dataset.tarifa);
			calcularTotal(e.target, tarifa);
		}
	});

	document.querySelector("#pricingTable").addEventListener("click", (e) => {
		if (e.target.classList.contains("clear")) {
			limpiarFila(e.target);
		} else if (e.target.classList.contains("delete")) {
			eliminarFila(e.target);
		}
	});
}

function cargarDatos() {
	tbody = document.querySelector("#pricingTable tbody");
	granTotalElement = document.getElementById("granTotal");

	const fragment = document.createDocumentFragment();

	perfiles.forEach((item, index) => {
		const row = document.createElement("tr");
		row.dataset.tarifa = item.tarifa;

		row.innerHTML = `
		<td>${item.perfil}</td>
		<td>${item.tarifa.toFixed(2)}</td>
		<td><input type="text" class="hours-input"></td>
		<td class="total">0.00</td>
		<td>
		  <button class="clear btn btn-secondary">🧹​</button>
		  <button class="delete btn btn-info">⛔​</button>
		</td>
	  `;

		fragment.appendChild(row);
	});

	tbody.innerHTML = "";
	tbody.appendChild(fragment);

	initEventListeners();
}

function calcularTotal(input, tarifa) {
	const horas = parseFloat(input.value) || 0;
	const totalCell = input.closest("tr").querySelector(".total");
	totalCell.textContent = (horas * tarifa).toFixed(2);
	actualizarGranTotal();
}

function actualizarGranTotal() {
	const totalElements = document.querySelectorAll(".total");
	const granTotal = Array.from(totalElements).reduce(
		(acc, cell) => acc + parseFloat(cell.textContent || "0"),
		0
	);

	granTotalElement.textContent = `Costo Total: $${granTotal.toFixed(2)}`;
}

function limpiarFila(button) {
	const row = button.closest("tr");
	const input = row.querySelector("input[type='text']");
	const totalCell = row.querySelector(".total");

	input.value = "";
	totalCell.textContent = "0.00";
	actualizarGranTotal();
}

function eliminarFila(button) {
	const row = button.closest("tr");

	const perfilName = row.cells[0].textContent;
	const perfilIndex = perfiles.findIndex((item) => item.perfil === perfilName);

	if (perfilIndex !== -1) {
		perfiles.splice(perfilIndex, 1);
	}

	row.remove();
	actualizarGranTotal();
}

function agregarFila() {
	const nuevoPerfil = prompt("Escribe el perfil que deseas agregar");

	if (!nuevoPerfil || nuevoPerfil.trim() === "") return;

	const nuevaTarifaStr = prompt("Escribe la tarifa por hora del perfil");
	const nuevaTarifaHoraria = parseFloat(nuevaTarifaStr);

	if (isNaN(nuevaTarifaHoraria) || nuevaTarifaHoraria <= 0) {
		alert("Por favor, introduce una tarifa válida");
		return;
	}

	perfiles.push({ perfil: nuevoPerfil, tarifa: nuevaTarifaHoraria });

	cargarDatos();
}

function guardarProyecto() {
	let proyecto = document.querySelector("#projectTitle");
	let costo = document.querySelector('#granTotal');
	let nombreProyecto = proyecto.textContent;
	let costoTotal = costo.textContent;

	proyectos.push({proyecto: `${nombreProyecto}`, costo: `${costoTotal}`});
}

function mostrarProyectos() {
	let proyectosGuardados = '';
	for (const proyecto of proyectos) {
		for (const propiedad in proyecto) {
			proyectosGuardados += proyecto[propiedad]+"\n"+"\n";
		}
	}
	alert(proyectosGuardados);
}

function debounce(fn, delay) {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), delay);
	};
}

const exportToExcel = debounce(() => {
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.table_to_sheet(document.getElementById("pricingTable"));
	XLSX.utils.book_append_sheet(wb, ws, "Tarifas");
	XLSX.writeFile(wb, "Tarifas.xlsx");
}, 300);

const exportToImage = debounce(() => {
	html2canvas(document.querySelector("#mainInfo")).then((canvas) => {
		const link = document.createElement("a");
		link.href = canvas.toDataURL("image/jpeg");
		link.download = "Tarifas.jpg";
		link.click();
	});
}, 300);

document.addEventListener("DOMContentLoaded", cargarDatos);
