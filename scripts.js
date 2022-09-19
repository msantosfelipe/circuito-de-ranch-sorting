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

    // staticLeftBatteries
    if (totalDoubles > 0 && doublesPerBattery > 0 && totalBatteries > 0) {
        var leftBatteries = document.getElementById('staticLeftBatteries')
        var batteryControl = totalDoubles - (doublesPerBattery * totalBatteries)
        if ((doublesPerBattery / 2) > batteryControl) {
            leftBatteries.innerHTML = 'Bateria restante: ' + batteryControl + ' - Será distribuída'
        } else {
            leftBatteries.innerHTML = 'Bateria restante: ' + batteryControl + ' - Diminua duplas por bateria'
        }
    }

    var staticAvegrageDisputes = 0
    // staticAvegrageDisputes
    if (totalPeople > 0 && totalBatteries > 0) {
        staticAvegrageDisputes = (totalPeople - 1) / totalBatteries
        document.getElementById('staticAvegrageDisputes').value = staticAvegrageDisputes.toFixed(2)
    }

    //alerts
    document.getElementById('alertOk').setAttribute("hidden", true);
    document.getElementById('alertNotOk').setAttribute("hidden", true);

    var inputMaxRepetition = document.getElementById('inputMaxRepetition').value

    if (staticAvegrageDisputes > 0 && inputMaxRepetition > 0) {
        if (inputMaxRepetition >= staticAvegrageDisputes) {
            document.getElementById('alertOk').removeAttribute("hidden");
        } else {
            document.getElementById('alertNotOk').removeAttribute("hidden");
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
        var competidor = i + 1
        var div = document.createElement("div");
        div.className = "col-sm-3"

        var label = document.createElement("label");
        label.className = "form-label"
        label.innerHTML = "Competidor " + competidor

        var input = document.createElement("input");
        input.className = "form-control"
        input.type = "text";
        input.id = "member" + competidor;
        input.value = ""

        div.appendChild(label);
        div.appendChild(input);
        row.appendChild(div);

        document.getElementById('containerNames').removeAttribute("hidden");
    }
}

function generateBatteries() {
    // teste com 4, 3, 3
    document.getElementById('alertCompetitors').setAttribute("hidden", true);

    var names = []
    var dynamicDivs = document.getElementById("dynamicRowNames").children;

    // get all names
    for (var i = 1; i <= dynamicDivs.length; i++) {
        n = document.getElementById('member' + i).value
        if (n.replace(/\s/g, '') == '') {
            document.getElementById('alertCompetitors').removeAttribute("hidden");
        } else {
            names.push(n)
        }
    }

    var inputTotalPeople = document.getElementById('inputTotalPeople').value
    var inputDoublesPerBattery = document.getElementById('inputDoublesPerBattery').value
    var inputMaxRepetition = document.getElementById('inputMaxRepetition').value

    for (var i = 0; i < inputTotalPeople; i++) {
        firstCompetitor = getFirstCompetitor(inputTotalPeople, names)
        secondCompetitor = getSecondCompetitor(inputTotalPeople, names, firstCompetitor)
        console.log(firstCompetitor + ' x ' + secondCompetitor)
    }


    // show container

    document.getElementById('containerDoubles').removeAttribute("hidden");
}

function getFirstCompetitor(inputTotalPeople, names) {
    var r = Math.floor(Math.random() * inputTotalPeople);
    return names[r];
}

function getSecondCompetitor(inputTotalPeople, names, firstCompetitor) {
    var r = Math.floor(Math.random() * inputTotalPeople);
    secondCompetitor = names[r]
    if (firstCompetitor == secondCompetitor) {
        return getSecondCompetitor(inputTotalPeople, names, firstCompetitor)
    }
    return secondCompetitor;
}
