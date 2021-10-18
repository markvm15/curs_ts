"use strict";
// Preguntes:
// 1: Base imponible
// 2: Importe aportado al plan de pensiones
// Retorn: Resultado desgravacion
exports.__esModule = true;
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Desgravacio = /** @class */ (function () {
    function Desgravacio(baseImonible) {
        this.tramsRetencio = [
            { min: 0, max: 12250, retencio: 19 },
            { min: 12250, max: 20200, retencio: 24 },
            { min: 20200, max: 35200, retencio: 30 },
            { min: 35200, max: 60000, retencio: 37 },
            { min: 60000, max: 30000, retencio: 45 },
            { min: 30000, max: -1, retencio: 47 }
        ];
        this.baseImponible = baseImonible;
        this.aportacio = 0;
    }
    Desgravacio.prototype.setAportacio = function (aportacio) {
        this.aportacio = aportacio > 2000 ? 2000 : aportacio;
    };
    Desgravacio.prototype.getDesgravacio = function () {
        var _this = this;
        var escala = this.tramsRetencio.find(function (e) { return _this.baseImponible >= e.min && (_this.baseImponible < e.max || e.max === -1); });
        var retencio = (this.baseImponible - (this.aportacio * escala.retencio / 100)) * escala.retencio / 100;
        var beneficiNet = this.baseImponible - retencio;
        return "Tens una retencio de: " + retencio + ", Per tant el teu benefici real es de: " + beneficiNet;
    };
    return Desgravacio;
}());
rl.question('Quina es la teua Base Imponible? ', function (answer) {
    var n = +answer;
    var desgravacio = new Desgravacio(n);
    rl.question('Quina es la teua aportacio al pla de pensions? ', function (answer) {
        var n = +answer;
        desgravacio.setAportacio(n);
        console.log(desgravacio.getDesgravacio());
        rl.close();
    });
});
