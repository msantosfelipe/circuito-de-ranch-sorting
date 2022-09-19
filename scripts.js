Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});
// document.getElementById('inputData').value = new Date().toDateInputValue();

function calcValues() {
    // inputTotalPeople
    var totalPeople = document.getElementById('inputTotalPeople').value
    var totalDoubles = (totalPeople * (totalPeople - 1)) / 2
    document.getElementById('staticTotalDoubles').value = totalDoubles

    // labelStaticTotalBatteries
    document.getElementById('labelStaticTotalBatteries').innerHTML = 'Total de baterias com ' + totalDoubles + ' duplas:'

    // staticTotalBatteries
    var doublesPerBattery = document.getElementById('inputDoublesPerBattery').value
    var totalBatteries = float2int(totalDoubles / doublesPerBattery)
    document.getElementById('staticTotalBatteries').value = totalBatteries

    if (totalDoubles > 0 && doublesPerBattery > 0 && totalBatteries > 0) {
        var leftBatteries = document.getElementById('staticLeftBatteries').value
        var batteryControl = totalDoubles - (doublesPerBattery * totalBatteries)
        if ((doublesPerBattery / 2) > batteryControl) {
            document.getElementById('staticLeftBatteries').innerHTML = 'Bateria restante: ' + batteryControl + ' - Será distribuída'
        } else {
            document.getElementById('staticLeftBatteries').innerHTML = 'Bateria restante: ' + batteryControl + ' - Diminua duplas por bateria'
        }
    }
}

function float2int(value) {
    return value | 0;
}

function addNamesFields() {
    var number = document.getElementById("inputTotalPeople").value;
    var row = document.getElementById("dynamicRowNames");

    while (row.hasChildNodes()) {
        row.removeChild(row.lastChild);
    }

    for (i = 0; i < number; i++) {
        competidor = i + 1
        var div = document.createElement("div");
        div.className = "col-sm-3"

        var label = document.createElement("label");
        label.className = "form-label"
        label.innerHTML = "Competidor " + competidor

        var input = document.createElement("input");
        input.className = "form-control"
        input.type = "text";
        input.id = "member" + competidor;

        div.appendChild(label);
        div.appendChild(input);
        row.appendChild(div);

        document.getElementById('containerNames').removeAttribute("hidden");
    }
}