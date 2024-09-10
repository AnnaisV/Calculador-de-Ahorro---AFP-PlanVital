document.getElementById('calcularBtn').addEventListener('click', function() {
    let salario = parseFloat(document.getElementById('salario').value);
    const comisionOrigen = parseFloat(document.getElementById('afpOrigen').value);
    const comisionPlanVital = 1.16; // Comisión de PlanVital fija

    // Máximo imponible permitido
    const maxImponible = 3182702;

    // Si el salario supera el máximo imponible, usar el máximo para el cálculo
    if (salario > maxImponible) {
        salario = maxImponible;
        alert(`El salario ingresado supera el máximo imponible permitido. El cálculo se realizará con $${maxImponible.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}.`);
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

    // Mostrar el gráfico de barras
    const ctx = document.getElementById('ahorroChart').getContext('2d');
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ahorro Mensual', 'Ahorro Anual'],
            datasets: [{
                label: 'Pesos chilenos',
                data: [ahorroMensual, ahorroAnual],
                backgroundColor: ['#d50000', '#d50000'],
                borderColor: ['#b71c1c', '#b71c1c'],
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
            }
        }
    });
});
