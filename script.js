document.getElementById('calcularBtn').addEventListener('click', function() {
    const salario = parseFloat(document.getElementById('salario').value);
    const comisionOrigen = parseFloat(document.getElementById('afpOrigen').value);
    const comisionPlanVital = parseFloat(document.getElementById('comisionPlanVital').value);

    if (isNaN(salario)) {
        alert('Por favor, ingrese un sueldo válido');
        return;
    }

    // Calcular ahorro o pérdida mensual
    const diferenciaComision = comisionOrigen - comisionPlanVital;
    const ahorroMensual = salario * (diferenciaComision / 100);
    const ahorroAnual = ahorroMensual * 12;

    let resultadoTexto = '';
    if (diferenciaComision > 0) {
        resultadoTexto = `Podrías ahorrar aproximadamente $${ahorroAnual.toFixed(2)} al año cambiándote a AFP PlanVital.`;
    } else if (diferenciaComision < 0) {
        resultadoTexto = `Pagarías $${Math.abs(ahorroAnual.toFixed(2))} más al año si cambias a AFP PlanVital.`;
    } else {
        resultadoTexto = 'No hay diferencia en la comisión entre tu AFP y AFP PlanVital.';
    }

    document.getElementById('ahorroMensaje').textContent = resultadoTexto;
    document.getElementById('resultado').classList.remove('hidden');
});

document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});
