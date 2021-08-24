export class tagmarActor extends Actor {
    
    prepareData() {
        this.tabela_resol = [
            [-7, "verde", "verde", "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "laranja", "vermelho", "azul", "cinza"],
            [-6, "verde", "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "laranja", "vermelho", "azul", "cinza"],
            [-5, "verde", "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "azul", "cinza"],
            [-4, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "azul", "cinza"],
            [-3, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "azul", "cinza"],
            [-2, "verde", "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "vermelho", "azul", "cinza"],
            [-1, "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "azul", "cinza"],
            [0, "verde", "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "cinza"],
            [1, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "cinza"],
            [2, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "azul", "azul", "cinza"],
            [3, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
            [4, "verde", "branco", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
            [5, "verde", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "cinza"],
            [6, "verde", "branco", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
            [7, "verde", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
            [8, "verde", "branco", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
            [9, "verde", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "cinza"],
            [10, "verde", "branco", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "cinza"],
            [11, "verde", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
            [12, "verde", "branco", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
            [13, "verde", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "cinza"],
            [14, "verde", "branco", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "cinza"],
            [15, "verde", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
            [16, "verde", "amarelo", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
            [17, "verde", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
            [18, "verde", "amarelo", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "roxo", "cinza"],
            [19, "verde", "amarelo", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "roxo", "roxo", "roxo", "cinza"],
            [20, "verde", "amarelo", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "laranja", "vermelho", "vermelho", "vermelho", "azul", "azul", "azul", "azul", "roxo", "roxo", "roxo", "cinza"]
        ];
        this.table_resFisMag = [
            [-2, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20],
            [-1, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20],
            [ 0, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20, 20],
            [ 1, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 20],
            [ 2, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20],
            [ 3,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20, 20],
            [ 4,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 20],
            [ 5,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20],
            [ 6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20],
            [ 7,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19],
            [ 8,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19],
            [ 9,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18],
            [10,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17, 18],
            [11,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 17],
            [12,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17],
            [13,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16, 16],
            [14,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15, 16],
            [15,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15, 15],
            [16,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14, 15],
            [17,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13, 14],
            [18,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12, 13],
            [19,  2,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11, 12],
            [20,  2,  2,  2,  2,  2,  2,  3,  3,  4,  4,  5,  5,  6,  6,  7,  7,  8,  9, 10, 11]
        ];
    }
    
    _rollTeste(teste) {
        if (teste.name == "Atributo") {
            this._rollAtributo(teste.id);
        } else if (teste.name == "Resistencia") {
            this._rollResistencia(teste.f_ataque, teste.id);
        } else if (teste.name == "Moral") {
            this._rollMoral();
        }
    }

    async _rollMoral() {
        const tabela_resol = this.tabela_resol;
        let moral = this.data.data.moral;
        if (moral < -7) moral = -7;
        let formulaD = "1d20";
        let r = new Roll(formulaD);
        let resultado = "";
        let col_tab = [];
        let PrintResult = "";
        await r.evaluate({async: false});
        let Dresult = r.total;
        if (moral <= 20) {
            col_tab = tabela_resol.find(h => h[0] == moral);
            resultado = col_tab[Dresult];
            if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
            else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
            else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
            else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
            else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
            else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
            else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
            let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
            await r.toMessage({
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({ actor: this }),
                flavor: `<h2 class='mediaeval rola'>Moral: ${moral}</h2>${coluna}${PrintResult}`
            });
        } else {
            let valor_hab = moral % 20;
            if (valor_hab == 0) {
                let vezes = moral / 20;
                for (let x = 0; x < vezes; x++){
                    let ds = await new Roll("1d20").evaluate({async: false});
                    col_tab = tabela_resol.find(h => h[0] == 20);
                    resultado = col_tab[ds.total];
                    if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                    else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                    else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                    else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                    else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                    else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                    else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                    let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                    await ds.toMessage({
                        user: game.user.id,
                        speaker: ChatMessage.getSpeaker({ actor: this }),
                        flavor: `<h2 class='mediaeval rola'>Moral: ${moral}</h2>${coluna}${PrintResult}`
                    });
                }
            } else if (valor_hab > 0) {
                    let vezes = parseInt(moral / 20);
                    let sobra = moral % 20;
                    for (let x = 0; x < vezes; x++){
                        let ds = await new Roll("1d20").evaluate({async: false});
                        col_tab = tabela_resol.find(h => h[0] == 20);
                        resultado = col_tab[ds.total];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                        await ds.toMessage({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this }),
                            flavor: `<h2 class='mediaeval rola'>Moral: ${moral}</h2>${coluna}${PrintResult}`
                        });
                    }
                    let dado = await new Roll(formulaD).evaluate({async: false});
                    col_tab = tabela_resol.find(h => h[0] == sobra);
                    resultado = col_tab[dado.total];
                    if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                    else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                    else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                    else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                    else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                    else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                    else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                    let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                    await dado.toMessage({
                        user: game.user.id,
                        speaker: ChatMessage.getSpeaker({ actor: this }),
                        flavor: `<h2 class='mediaeval rola'>Moral: ${moral}</h2>${coluna}${PrintResult}`
                    });
                }
        }
    }

    _rollResistencia(forcAtaqueI, tipo) {
        const table_resFisMag = this.table_resFisMag;
        let valorDefI;
        if (tipo == "Magía") valorDefI = this.data.data.rm;
        else valorDefI = this.data.data.rf;
        let forcAtaque = forcAtaqueI;
        let valorDef = valorDefI;
        let def_ataq = valorDef - forcAtaque;
        let stringSucesso = "";
        let valorSucess = 0;
        if ((valorDef >= -2 && valorDef <= 20) && (forcAtaque >= 1 && forcAtaque <= 20)) {
            let coluna = table_resFisMag.find(col => col[0] == valorDef);
            valorSucess = coluna[forcAtaque];
        } else {
            if (def_ataq == 0) valorSucess = 11;
            else if (def_ataq == 1) valorSucess = 10;
            else if (def_ataq == 2) valorSucess = 9;
            else if (def_ataq == 3) valorSucess = 8;
            else if (def_ataq == 4 || def_ataq == 5) valorSucess = 7;
            else if (def_ataq == 6 || def_ataq == 7) valorSucess = 6;
            else if (def_ataq == 8 || def_ataq == 9) valorSucess = 5;
            else if (def_ataq == 10 || def_ataq == 11) valorSucess = 4;
            else if (def_ataq == 12 || def_ataq == 13) valorSucess = 3;
            else if (def_ataq == 14 || def_ataq == 15) valorSucess = 2;
            else if (def_ataq >= 16) valorSucess = 1;
            else if (def_ataq == -1) valorSucess = 11;
            else if (def_ataq == -2) valorSucess = 12;
            else if (def_ataq == -3) valorSucess = 13;
            else if (def_ataq == -4 || def_ataq == -5) valorSucess = 14;
            else if (def_ataq == -6 || def_ataq == -7) valorSucess = 15;
            else if (def_ataq == -8 || def_ataq == -9) valorSucess = 16;
            else if (def_ataq == -10 || def_ataq == -11) valorSucess = 17;
            else if (def_ataq == -12 || def_ataq == -13) valorSucess = 18;
            else if (def_ataq == -14 || def_ataq == -15) valorSucess = 19;
            else if (def_ataq <= -16) valorSucess = 20;
        }
        const r = new Roll("1d20");
        r.evaluate({async: false});
        const Dresult = r.total;
        if ((Dresult >= valorSucess || Dresult == 20) && Dresult > 1) { // Sucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:#00a1e8;'>SUCESSO</h1>";
        } else {    // Insucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:#ff0000;'>FRACASSO</h1>";
        }  
        r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this }),
            flavor: `<img src="${this.data.img}" style="display:block;margin-left:auto;margin-right:auto;border-width:0;"/><h2 class="mediaeval rola" style="text-align:center;">Teste de Resistência </h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaqueI}</h3><h3 class="mediaeval rola">Resistência ${tipo}: ${valorDefI}</h3>${stringSucesso}`
        });
    }

    async _rollAtributo(cat) {
        const tabela_resol = this.tabela_resol;
        let valor_teste = 0;
        const actorData = this.data.data;
        const actorImg = `<img src='${this.data.img}' style='display:block;border-width:0;margin-left:auto;margin-right:auto;'/>`;
        let PrintResult = "";
        let habil = 0;

        if (cat == "INT") {
            habil = actorData.atributos.INT;
            valor_teste = actorData.valor_teste.INT;
        }
        else if (cat == "AUR") {
            habil = actorData.atributos.AUR;
            valor_teste = actorData.valor_teste.AUR;
        }
        else if (cat == "CAR") {
            habil = actorData.atributos.CAR;
            valor_teste = actorData.valor_teste.CAR;
        }
        else if (cat == "FOR") {
            habil = actorData.atributos.FOR;
            valor_teste = actorData.valor_teste.FOR;
        }
        else if (cat == "FIS") {
            habil = actorData.atributos.FIS;
            valor_teste = actorData.valor_teste.FIS;
        }
        else if (cat == "AGI") {
            habil = actorData.atributos.AGI;
            valor_teste = actorData.valor_teste.AGI;
        }
        else if (cat == "PER") {
            habil = actorData.atributos.PER;
            valor_teste = actorData.valor_teste.PER;
        }
        if (valor_teste < -7) valor_teste = -7;
        if (valor_teste >= -7) {
            if (valor_teste <= 20) {
                let r = await new Roll("1d20").evaluate({async: false});
                let col_tab = tabela_resol.find(h => h[0] == valor_teste);
                let resultado = col_tab[r.total];
                if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                await r.toMessage({
                    user: game.user.id,
                    speaker: ChatMessage.getSpeaker({ actor: this }),
                    flavor: `${actorImg}<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} : ${habil}</h2>${coluna}${PrintResult}`
                });
            } else {
                let valor_hab = valor_teste % 20;
                if (valor_hab == 0) {
                    let vezes = valor_teste / 20;
                    for (let x = 0; x < vezes; x++){
                        let r = await new Roll("1d20").evaluate({async: false});
                        let col_tab = tabela_resol.find(h => h[0] == 20);
                        let resultado = col_tab[r.total];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                        await r.toMessage({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this }),
                            flavor: `${actorImg}<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} : ${habil}</h2>${coluna}${PrintResult}`
                        });
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(valor_teste / 20);
                    let sobra = valor_teste % 20;
                    for (let x = 0; x < vezes; x++){
                        let r = await new Roll("1d20").evaluate({async: false});
                        let col_tab = tabela_resol.find(h => h[0] == 20);
                        let resultado = col_tab[r.total];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                        await r.toMessage({
                            user: game.user.id,
                            speaker: ChatMessage.getSpeaker({ actor: this }),
                            flavor: `${actorImg}<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} : ${habil}</h2>${coluna}${PrintResult}`
                        });
                    }
                    let r = await new Roll("1d20").evaluate({async: false});
                    let col_tab = tabela_resol.find(h => h[0] == sobra);
                    let resultado = col_tab[r.total];
                    if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#91cf50;'>Verde - Falha</h1>";
                    else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                    else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#ffff00;'>Amarelo - Fácil</h1>";
                    else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff9900;'>Laranja - Médio</h1>";
                    else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#ff0000;'>Vermelho - Difícil</h1>";
                    else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:#00a1e8;'>Azul - Muito Difícil</h1>";
                    else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:#bfbfbf;'>Cinza - Crítico Absurdo</h1>";
                    let coluna = "<h4 class='mediaeval rola'>Coluna:" + col_tab[0] + "</h4>";
                    await r.toMessage({
                        user: game.user.id,
                        speaker: ChatMessage.getSpeaker({ actor: this }),
                        flavor: `${actorImg}<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} : ${habil}</h2>${coluna}${PrintResult}`
                    });
                }
            }
        }
    }
}