// Preguntes:
// 1: Base imponible
// 2: Importe aportado al plan de pensiones
// Retorn: Resultado desgravacion

import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
});

type tRetencio = {min:number,max:number,retencio:number}

class Desgravacio {
    private baseImponible:number;
    private aportacio:number;
    private tramsRetencio:tRetencio[] = [
        {min:0,max:12250,retencio:19},
        {min:12250,max:20200,retencio:24},
        {min:20200,max:35200,retencio:30},
        {min:35200,max:60000,retencio:37},
        {min:60000,max:30000,retencio:45},
        {min:30000,max:-1,retencio:47}
    ];
    constructor(baseImonible:number){
        this.baseImponible = baseImonible;
        this.aportacio = 0;
    }
    setAportacio(aportacio:number){
        this.aportacio = aportacio>2000?2000:aportacio;
    }
    getDesgravacio(){
        const escala:tRetencio = this.tramsRetencio.find(e=>this.baseImponible>=e.min && (this.baseImponible<e.max || e.max===-1));
        const retencio = (this.baseImponible - (this.aportacio*escala.retencio/100)) * escala.retencio/100;
        const beneficiNet = this.baseImponible - retencio;
        return `Tens una retencio de: ${retencio}, Per tant el teu benefici real es de: ${beneficiNet}`;
    }
}
rl.question('Quina es la teua Base Imponible? ', (answer)=>{
    const n:number = +answer;
    const desgravacio = new Desgravacio(n);
    rl.question('Quina es la teua aportacio al pla de pensions? ', (answer)=>{
        const n:number = +answer;
        desgravacio.setAportacio(n);
        console.log(desgravacio.getDesgravacio());
        rl.close()
    })
});