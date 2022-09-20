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

function float2int(value) {
    return value | 0;
}

function clean() {
    document.getElementById('inputTotalPeople').value = 0
    document.getElementById('inputDoublesPerBattery').value = 0
    document.getElementById('inputMaxRepetition').value = 0
    hiddenAlerts()
    document.getElementById('staticTotalDoubles').value = 0
    document.getElementById('staticTotalBatteries').value = 0
    document.getElementById('staticLeftBatteries').innerHTML = 'Bateria restante: 0'
    document.getElementById('staticAvegrageDisputes').value = 0
    removeNamesRows()
    document.getElementById('containerNames').setAttribute("hidden", true);
    removCompetitorsRows()
    document.getElementById('containerDoubles').setAttribute("hidden", true);
}

function hiddenAlerts() {
    document.getElementById('alertOk').setAttribute("hidden", true);
    document.getElementById('alertNotOk').setAttribute("hidden", true);
}

function removeNamesRows() {
    var row = document.getElementById("dynamicRowNames");
    while (row.hasChildNodes()) {
        row.removeChild(row.lastChild);
    }
}

function removCompetitorsRows() {
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

function generateBatteries() {
    // teste com 4, 3, 3
    document.getElementById('alertCompetitors').setAttribute("hidden", true);
    document.getElementById('containerDoubles').setAttribute("hidden", true);

    var names = getCompetitorsNames()
    if (names.length == 0) {
        return
    }

    var inputTotalPeople = document.getElementById('inputTotalPeople').value
    var inputDoublesPerBattery = document.getElementById('inputDoublesPerBattery').value
    var inputMaxRepetition = document.getElementById('inputMaxRepetition').value
    var staticTotalDoubles = document.getElementById('staticTotalDoubles').value

    var battery = 1
    var doublesPerBattery = 0
    for (var i = 0; i < staticTotalDoubles; i++) {
        var repetitionNamesPerBattery = []

        var firstCompetitor = getFirstCompetitor(inputTotalPeople, names, repetitionNamesPerBattery, inputMaxRepetition)
        var secondCompetitor = getSecondCompetitor(inputTotalPeople, names, firstCompetitor, repetitionNamesPerBattery, inputMaxRepetition)

        appendTableRow(i + 1, battery, firstCompetitor, secondCompetitor)

        // battery control
        doublesPerBattery++
        if (doublesPerBattery >= inputDoublesPerBattery) {
            battery++
            doublesPerBattery = 0
            repetitionNamesPerBattery = []
        }
    }

    document.getElementById('containerDoubles').removeAttribute("hidden");
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

function isInvalidName(sortedName, repetitionNamesPerBattery, inputMaxRepetition) {
    let counter = 0;
    for (n of repetitionNamesPerBattery) {
        if (n == sortedName) {
            counter++;
        }
    };

    return counter > inputMaxRepetition
}

function appendTableRow(double, battery, firstCompetitor, secondCompetitor) {
    var th = document.createElement("th")
    th.setAttribute("scope", "row")
    th.innerHTML = double
    var td1 = document.createElement("td")
    td1.innerHTML = battery
    var td2 = document.createElement("td")
    td2.innerHTML = firstCompetitor
    var td3 = document.createElement("td")
    td3.innerHTML = "&"
    var td4 = document.createElement("td")
    td4.innerHTML = secondCompetitor

    var tr = document.createElement("tr")
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    document.getElementById("tableCompetitors").appendChild(tr)
}

function exportTableNewTab() {
    var tab = document.getElementById("divTableDoubles")
    var html = '<!doctype html><html lang="en"> <head> <title>CIRCUITO DE RANCH SORTING</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"><link href="assets/dist/css/bootstrap.min.css" rel="stylesheet"> </head> <body> <div class="container"> <div class="row mb-4">TABLE_HERE</div> </div> </body></html>'
    html = html.replace('TABLE_HERE', tab.innerHTML)

    var opened = window.open("");
    opened.document.write(html);
}