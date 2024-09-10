document.getElementById('calcularBtn').addEventListener('click', function() {
    let salario = parseFloat(document.getElementById('salario').value);
    const comisionOrigen = parseFloat(document.getElementById('afpOrigen').value);
    const comisionPlanVital = 1.16; // Comisión de PlanVital fija

    // Valores mínimo y máximo
    const minImponible = 500000;
    const maxImponible = 3182702;

    // Validar si el salario es menor al mínimo permitido
    if (salario < minImponible) {
        alert(`El salario ingresado es menor al mínimo permitido. Se calculará con $${minImponible.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}.`);
        salario = minImponible;
    }

    // Validar si el salario es mayor al máximo permitido
    if (salario > maxImponible) {
        alert(`El salario ingresado supera el máximo imponible permitido. Se calculará con $${maxImponible.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}.`);
        salario = maxImponible;
    }

    if (isNaN(salario) || salario <= 0) {
        alert('Por favor, ingrese un sueldo válido');
        return;
    }

    // Calcular ahorro o pérdida mensual y anual
    const diferenciaComision = comisionOrigen - comisionPlanVital;
    const ahorroMensual = salario * (diferenciaComision / 100);
    const ahorroAnual = ahorroMensual * 12;

    // Formatear números en pesos chilenos
    const ahorroMensualFormateado = ahorroMensual.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
    const ahorroAnualFormateado = ahorroAnual.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

    let mensajeResultado = '';
    if (diferenciaComision > 0) {
        mensajeResultado = `Con AFP PlanVital estarías ahorrando ${ahorroMensualFormateado} mensual y ${ahorroAnualFormateado} anual.`;
    } else if (diferenciaComision < 0) {
        mensajeResultado = `Con AFP PlanVital pagarías ${ahorroMensualFormateado} más al mes y ${ahorroAnualFormateado} más al año.`;
    } else {
        mensajeResultado = 'No hay diferencia en la comisión entre tu AFP y AFP PlanVital.';
    }

    document.getElementById('ahorroMensaje').textContent = mensajeResultado;
    document.getElementById('resultado').classList.remove('hidden');

    // Destruir el gráfico anterior si existe
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Mostrar el gráfico de barras comparativo entre la AFP de origen y PlanVital
    const ctx = document.getElementById('ahorroChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['AFP Origen', 'AFP PlanVital'],
            datasets: [{
                label: 'Ahorro Mensual',
                data: [
                    salario * (comisionOrigen / 100), // Comisión de la AFP de origen
                    salario * (comisionPlanVital / 100) // Comisión de PlanVital
                ],
                backgroundColor: [
                    '#808080', // Color gris para la AFP de origen
                    '#d50000'  // Color rojo para PlanVital
                ],
                borderColor: [
                    '#666666', // Borde gris para la AFP de origen
                    '#b71c1c'  // Borde rojo para PlanVital
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return '$' + value.toLocaleString('es-CL');
                        }
                    }
                }
            }
        }
    });
});
