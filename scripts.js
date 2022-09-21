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
    hiddenAlerts()

    var inputMaxRepetition = document.getElementById('inputMaxRepetition').value

    if (staticAvegrageDisputes > 0 && inputMaxRepetition > 0) {
        if (inputMaxRepetition >= staticAvegrageDisputes) {
            document.getElementById('alertOk').removeAttribute("hidden");
            document.getElementById('brnInsertNames').removeAttribute("disabled");
        } else {
            document.getElementById('alertNotOk').removeAttribute("hidden");
            document.getElementById('brnInsertNames').setAttribute("disabled", true);
        }
    }
}

function calcValues2() {
    // staticTotalTrio
    var totalPeople = document.getElementById('inputTotalPeople2').value
    var totalTrio = calcFatorial(totalPeople) / (calcFatorial(3) * calcFatorial(totalPeople - 3))
    document.getElementById('staticTotalTrio').value = totalTrio

    // labelStaticTotalBatteries2
    document.getElementById('labelStaticTotalBatteries2').innerHTML = 'Total de baterias com ' + totalTrio + ' trios:'

    // staticTotalBatteries2
    var triosPerBattery = document.getElementById('inputTrioPerBattery').value
    var totalBatteries = float2int(totalTrio / triosPerBattery)
    document.getElementById('staticTotalBatteries2').value = totalBatteries

    // staticLeftBatteries2
    if (totalTrio > 0 && triosPerBattery > 0 && totalBatteries > 0) {
        var leftBatteries = document.getElementById('staticLeftBatteries2')
        var batteryControl = totalTrio - (triosPerBattery * totalBatteries)
        if ((triosPerBattery / 2) > batteryControl) {
            leftBatteries.innerHTML = 'Bateria restante: ' + batteryControl + ' - Será distribuída'
        } else {
            leftBatteries.innerHTML = 'Bateria restante: ' + batteryControl + ' - Diminua trios por bateria'
        }
    }

    var staticAvegrageDisputes = 0
    // staticAvegrageDisputes
    if (totalPeople > 0 && totalBatteries > 0) {
        staticAvegrageDisputes = (totalPeople - 1) / totalBatteries
        // document.getElementById('staticAvegrageDisputes2').value = staticAvegrageDisputes.toFixed(2)
    }

    //alerts
    hiddenAlerts()

    // inputMaxRepetition2
    var inputMaxRepetition = document.getElementById('inputMaxRepetition2').value

    if (staticAvegrageDisputes > 0 && inputMaxRepetition > 0) {
        if (inputMaxRepetition >= staticAvegrageDisputes) {
            document.getElementById('alertOk2').removeAttribute("hidden");
            document.getElementById('brnInsertNames2').removeAttribute("disabled");
        } else {
            document.getElementById('alertNotOk2').removeAttribute("hidden");
            document.getElementById('brnInsertNames2').setAttribute("disabled", true);
        }
    }
}

function float2int(value) {
    return value | 0;
}

function clean() {
    window.location.reload()
}

function hiddenAlerts() {
    document.getElementById('alertOk').setAttribute("hidden", true);
    document.getElementById('alertNotOk').setAttribute("hidden", true);
    document.getElementById('alertOk2').setAttribute("hidden", true);
    document.getElementById('alertNotOk2').setAttribute("hidden", true);
}

function removeNamesRows() {
    var row = document.getElementById("dynamicRowNames");
    while (row.hasChildNodes()) {
        row.removeChild(row.lastChild);
    }
}

function removCompetitorsRows() {
    document.getElementById('alertCompetitors').setAttribute("hidden", true);
    document.getElementById('containerBatteries').setAttribute("hidden", true);

    var tbody = document.getElementById("tableCompetitors");
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.lastChild);
    }
}

function addNamesFields() {
    var number = document.getElementById("inputTotalPeople").value;

    removeNamesRows()

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
        document.getElementById("dynamicRowNames").appendChild(div);

        document.getElementById('containerNames').removeAttribute("hidden");
    }
}

function addNamesFields2() {
    var number = document.getElementById("inputTotalPeople2").value;

    removeNamesRows()

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
        document.getElementById("dynamicRowNames").appendChild(div);

        document.getElementById('containerNames').removeAttribute("hidden");
    }
}

function generateBatteries() {
    document.getElementById('alertCompetitors').setAttribute("hidden", true);
    document.getElementById('containerBatteries').setAttribute("hidden", true);

    var names = getCompetitorsNames()
    if (names.length == 0) {
        return
    }

    var inputTotalPeople = ""
    var inputDoublesPerBattery = ""
    var inputMaxRepetition = ""
    var staticTotalDoubles = ""

    if (isDoubles()) {
        inputTotalPeople = document.getElementById('inputTotalPeople').value
        inputDoublesPerBattery = document.getElementById('inputDoublesPerBattery').value
        inputMaxRepetition = document.getElementById('inputMaxRepetition').value
        staticTotalDoubles = document.getElementById('staticTotalDoubles').value
    } else {
        inputTotalPeople = document.getElementById('inputTotalPeople2').value
        inputDoublesPerBattery = document.getElementById('inputTrioPerBattery').value
        inputMaxRepetition = document.getElementById('inputMaxRepetition2').value
        staticTotalDoubles = document.getElementById('staticTotalTrio').value
    }

    var battery = 1
    var doublesPerBattery = 0
    for (var i = 0; i < staticTotalDoubles; i++) {
        var repetitionNamesPerBattery = []

        var firstCompetitor = getFirstCompetitor(inputTotalPeople, names, repetitionNamesPerBattery, inputMaxRepetition)
        var secondCompetitor = getSecondCompetitor(inputTotalPeople, names, firstCompetitor, repetitionNamesPerBattery, inputMaxRepetition)
        var thirdCompetitor = getThirdCompetitor(inputTotalPeople, names, firstCompetitor, secondCompetitor, repetitionNamesPerBattery, inputMaxRepetition)

        appendTableRow(i + 1, battery, firstCompetitor, secondCompetitor, thirdCompetitor)

        // battery control
        doublesPerBattery++
        if (doublesPerBattery >= inputDoublesPerBattery) {
            battery++
            doublesPerBattery = 0
            repetitionNamesPerBattery = []
        }
    }

    document.getElementById('containerBatteries').removeAttribute("hidden");
}

function isDoubles() {
    return document.getElementById('radioDouble').checked
}

function getCompetitorsNames() {
    var names = []
    var dynamicRowNames = document.getElementById("dynamicRowNames").children;
    for (var i = 1; i <= dynamicRowNames.length; i++) {
        n = document.getElementById('member' + i).value
        if (n.replace(/\s/g, '') == '') {
            document.getElementById('alertCompetitors').removeAttribute("hidden");
        } else {
            names.push(n)
        }
    }

    return names
}

function getFirstCompetitor(inputTotalPeople, names, repetitionNamesPerBattery, inputMaxRepetition) {
    var r = Math.floor(Math.random() * inputTotalPeople);
    var sortedName = names[r]
    if (isInvalidName(sortedName, repetitionNamesPerBattery, inputMaxRepetition)) {
        return getFirstCompetitor(inputTotalPeople, names, repetitionNamesPerBattery, inputMaxRepetition)
    }

    return sortedName;
}

function getSecondCompetitor(inputTotalPeople, names, firstCompetitor, repetitionNamesPerBattery, inputMaxRepetition) {
    var r = Math.floor(Math.random() * inputTotalPeople);
    var sortedName = names[r]
    if (firstCompetitor == sortedName || isInvalidName(sortedName, repetitionNamesPerBattery, inputMaxRepetition)) {
        return getSecondCompetitor(inputTotalPeople, names, firstCompetitor, repetitionNamesPerBattery, inputMaxRepetition)
    }
    return sortedName;
}

function getThirdCompetitor(inputTotalPeople, names, firstCompetitor, secondCompetitor, repetitionNamesPerBattery, inputMaxRepetition) {
    var r = Math.floor(Math.random() * inputTotalPeople);
    var sortedName = names[r]
    if (firstCompetitor == sortedName || secondCompetitor == sortedName || isInvalidName(sortedName, repetitionNamesPerBattery, inputMaxRepetition)) {
        return getThirdCompetitor(inputTotalPeople, names, firstCompetitor, secondCompetitor, repetitionNamesPerBattery, inputMaxRepetition)
    }
    return sortedName;
}

function isInvalidName(sortedName, repetitionNamesPerBattery, inputMaxRepetition) {
    let counter = 0;
    for (n of repetitionNamesPerBattery) {
        if (n == sortedName) {
            counter++;
        }
    };

    return counter > inputMaxRepetition
}

function appendTableRow(double, battery, firstCompetitor, secondCompetitor, thirdCompetitor) {
    var th = document.createElement("th")
    th.setAttribute("scope", "row")
    th.innerHTML = double
    var td1 = document.createElement("td")
    td1.innerHTML = battery
    var td2 = document.createElement("td")
    if (isDoubles()) {
        td2.innerHTML = firstCompetitor + " & " + secondCompetitor
    } else {
        td2.innerHTML = firstCompetitor + " & " + secondCompetitor + " & " + thirdCompetitor
    }

    var tr = document.createElement("tr")
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    document.getElementById("tableCompetitors").appendChild(tr)
}

function exportTableNewTab() {
    var tab = document.getElementById("divTableDoubles")
    var html = '<!doctype html><html lang="en"> <head> <title>CIRCUITO DE RANCH SORTING</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"><link href="assets/dist/css/bootstrap.min.css" rel="stylesheet"> </head> <body> <div class="container"> <div class="row mb-4">TABLE_HERE</div> </div> </body></html>'
    html = html.replace('TABLE_HERE', tab.innerHTML)

    var opened = window.open("");
    opened.document.write(html);
}
function checkDoubles() {
    document.getElementById('radio1Label').style.fontWeight = 'bold';
    document.getElementById('radio1Label').style.fontSize = 'larger';
    document.getElementById('radio2Label').style.fontWeight = '100';
    document.getElementById('radio2Label').style.fontSize = 'medium';

    document.getElementById('containerTrio').setAttribute("hidden", true);
    document.getElementById('containerDoubles').removeAttribute("hidden");

    removeNamesRows()
    removCompetitorsRows()
}

function checkTrio() {
    document.getElementById('radio2Label').style.fontWeight = 'bold';
    document.getElementById('radio2Label').style.fontSize = 'larger';
    document.getElementById('radio1Label').style.fontWeight = '100';
    document.getElementById('radio1Label').style.fontSize = 'medium';

    document.getElementById('containerDoubles').setAttribute("hidden", true);
    document.getElementById('containerTrio').removeAttribute("hidden");

    removeNamesRows()
    removCompetitorsRows()
}

function calcFatorial(fatorial) {
    var resultado = fatorial;
    var primeiroMultipicador = fatorial - 1;
    for (var i = primeiroMultipicador; i > 1; i--) {
        resultado *= i;
    }

    return resultado;
}