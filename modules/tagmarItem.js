export class tagmarItem extends Item {

    prepareData() {
        if (!this.isOwned) return;
        super.prepareData();
        const tabela_resol = [
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
        this.tabela_resol = tabela_resol;
    }

    async habToChat(resultado, r, h_total, colunarolada) {
        let conteudo = "<h3 class='mediaeval rola'>Informações adicionais: </h3>" + "<h4 class='mediaeval rola rola_desc'>" + this.data.data.tarefAperf + "</h4>";
        let PrintResult = "";
        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
        else if (resultado == "azul") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
        else if (resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:rgb(2,9,37);'>Azul Escuro - Absurdo</h1>";
        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Impossível</h1>";
        let coluna = "<h4 class='mediaeval rola'>Coluna:" + colunarolada + "</h4>";
        r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<img src="${this.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${this.name}: ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
        });
    }

    async rollHabilidade() {
        const tabela_resol = this.tabela_resol;
        let bonus_hab = this.actor.data.data.bonus_habil;
        let h_total = 0;
        if (this.data.data.nivel > 0){
            h_total = this.data.data.total + bonus_hab;
        } else {
            h_total = -7 + this.data.data.ajuste.valor + this.data.data.bonus + this.data.data.penalidade + bonus_hab;
        }
        if (h_total < -7) h_total = -7;
        let r = new Roll("1d20");
        r.evaluate({async: false});
        let Dresult = r.total;
        if (h_total <= 20) {
            let coluna_tab = tabela_resol.filter(b => b[0] === h_total);
            let resultado = coluna_tab[0][Dresult];
            await this.habToChat(resultado, r, h_total, coluna_tab[0][0]);
        } else {
            let valor_hab = h_total % 20;
            if (valor_hab == 0) {
                let vezes = h_total / 20;
                let dados = [];
                for (let x = 0; x < vezes; x++){
                    dados[x] = new Roll("1d20");
                    dados[x].evaluate({async: false});
                    let Dresult = dados[x].total;
                    let coluna_tab = tabela_resol.filter(b => b[0] === 20);
                    let resultado = coluna_tab[0][Dresult];
                    await this.habToChat(resultado, dados[x], h_total, coluna_tab[0][0]);
                }
            } else if (valor_hab > 0) {
                let vezes = parseInt(h_total / 20);
                let sobra = h_total % 20;
                let dados = [];
                for (let x = 0; x < vezes; x++){
                    dados[x] = new Roll("1d20");
                    dados[x].evaluate({async: false});
                    let Dresult = dados[x].total;
                    let coluna_tab = tabela_resol.filter(b => b[0] === 20);
                    let resultado = coluna_tab[0][Dresult];
                    await this.habToChat(resultado, dados[x], h_total, coluna_tab[0][0]);
                }
                let dado = new Roll("1d20");
                dado.evaluate({async: false});
                Dresult = dado.total;
                let coluna_tab = tabela_resol.filter(b => b[0] === sobra);
                let resultado = coluna_tab[0][Dresult];
                await this.habToChat(resultado, dado, h_total, coluna_tab[0][0]);
            }
        }
    }

    async magiaToChat() {
        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({
                actor: this.actor
              })
        };
        chatData.content = "<img src='"+ this.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + this.name + "</h1>" + "<h2 class='mediaeval rola' style='text-align: center'>Nível: " + this.data.data.nivel + "</h2>" + "<h3 class='mediaeval rola rola_desc'>" + this.data.data.efeito + "</h3>";
        ChatMessage.create(chatData);
    }

    async tecnicaToChat(resultado, r, coluna_rolada) {
        let PrintResult = "";
        let conteudo = "<h3 class='mediaeval rola'><a class='showDesc'>Descrição: <i class='far fa-eye-slash'></i></a> </h3>" + "<h4 class='mediaeval rola rola_desc' style='display: none;'>" + this.data.data.descricao + "</h4>";
        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
        let coluna = "<h4 class='mediaeval rola'>Coluna:" + coluna_rolada + "</h4>";
        r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<img src="${this.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${this.name}: ${this.data.data.total}</h2>${conteudo}${coluna}${PrintResult}`
        });
    }

    async rollTecnicaCombate() {
        const tabela_resol = this.tabela_resol;
        let r = new Roll("1d20");
        r.evaluate({async: false});
        let Dresult = r.total;
        if (this.data.data.total <= 20) {
            let coluna_tab = tabela_resol.filter(b => b[0] === this.data.data.total);
            let resultado = coluna_tab[0][Dresult];
            await this.tecnicaToChat(resultado, r, coluna_tab[0][0]);
        } else {
            let valor_hab = this.data.data.total % 20;
            if (valor_hab == 0) {
                let vezes = this.data.data.total / 20;
                let dados = [];
                for (let x = 0; x < vezes; x++){
                    dados[x] = new Roll("1d20");
                    dados[x].evaluate({async: false});
                    let Dresult = dados[x].total;
                    let coluna_tab = tabela_resol.filter(b => b[0] === 20);
                    let resultado = coluna_tab[0][Dresult];
                    await this.tecnicaToChat(resultado, dados[x], coluna_tab[0][0]);
                }
            } else if (valor_hab > 0) {
                let vezes = parseInt(this.data.data.total / 20);
                let sobra = this.data.data.total % 20;
                let dados = [];
                for (let x = 0; x < vezes; x++){
                    dados[x] = new Roll("1d20");
                    dados[x].evaluate({async: false});
                    let Dresult = dados[x].total;
                    let coluna_tab = tabela_resol.filter(b => b[0] === 20);
                    let resultado = coluna_tab[0][Dresult];
                    await this.tecnicaToChat(resultado, dados[x], coluna_tab[0][0]);
                }
                let dado = new Roll("1d20");
                dado.evaluate({async: false});
                Dresult = dado.total;
                let coluna_tab = tabela_resol.filter(b => b[0] === sobra);
                let resultado = coluna_tab[0][Dresult];
                await this.tecnicaToChat(resultado, dado, coluna_tab[0][0]);
            }
        }
    }

    async combateToChat(coluna_rolada, resultado, puni_25, puni_50, puni_75, puni_100, r, municao_text, valor_tabela) {
        let critico = false;
        const tabela_resol = this.tabela_resol;
        let PrintResult = "";
        let dano_total = 0;
        let punicaoText = "";
        let conteudo = "<h4 class='mediaeval rola rola_desc'>Descrição: " + this.data.data.descricao + "</h4>";
        if (resultado == "verde") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha Crítica</h1>";
            critico = true;
        }
        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Errou</h1>";
        else if (resultado == "amarelo") {
            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - 25%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    dano_total = 0;
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                } 
                else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 0;
                }
                else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 0;
                }
                else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 0;
                }
            } else dano_total = this.data.data.dano.d25;
        }
        else if (resultado == "laranja") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - 50%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = this.data.data.dano.d25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 0;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 0;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 0;
                }
            } else dano_total = this.data.data.dano.d50;
        }
        else if (resultado == "vermelho") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - 75%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = this.data.data.dano.d50;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = this.data.data.dano.d25;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 0;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 0;
                }
            } else dano_total = this.data.data.dano.d75;
        }
        else if (resultado == "azul") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - 100%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = this.data.data.dano.d75;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = this.data.data.dano.d50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = this.data.data.dano.d25;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 0;
                }
            } else dano_total = this.data.data.dano.d100;
        }
        else if (resultado == "roxo") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:rgb(2,9,37);'>Azul Escuro - 125%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = this.data.data.dano.d100;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = this.data.data.dano.d75;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = this.data.data.dano.d50;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = this.data.data.dano.d25;
                }
            } else dano_total = this.data.data.dano.d125;
        }
        else if (resultado == "cinza") {
            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico</h1>";
            critico = true;
        }
        let coluna = "<h4 class='mediaeval rola'>Coluna: " + coluna_rolada + "</h4>";
        let dano_text = "<h2 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_total + "</h2>";
        let table_dano = `<table style="margin-left: auto;margin-right: auto;text-align:center;" class="mediaeval"><tr><th>25%</th><th>50%</th><th>75%</th><th>100%</th></tr><tr><td>${this.data.data.dano.d25}</td><td>${this.data.data.dano.d50}</td><td>${this.data.data.dano.d75}</td><td>${this.data.data.dano.d100}</td></tr></table>`;
        if (critico) dano_text = table_dano;
        await r.toMessage({
            user: game.user.id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<img src="${this.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${this.name}: ${valor_tabela} - ${this.data.data.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${punicaoText}${dano_text}`
        });
        if (critico) Hooks.callAll('tagmar_Critico', coluna_rolada, tabela_resol, game.user, this.actor);
    }

    async combateToChatPlus(coluna_rolada, resultado, puni_25, puni_50, puni_75, puni_100, r, municao_text, valor_tabela, ajusteDano) {
        let critico = false;
        const tabela_resol = this.tabela_resol;
        let PrintResult = "";
        let dano_total = 0;
        let punicaoText = "";
        let conteudo = "<h4 class='mediaeval rola rola_desc'>Descrição: " + this.data.data.descricao + "</h4>";
        if (resultado == "verde") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha Crítica</h1>";
            critico = true;
        }
        else if (resultado == "branco") {
            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 0 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 0 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 0 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 0 + ajusteDano - 100;
                }
            } else dano_total = 0 + ajusteDano;
        }
        else if (resultado == "amarelo") {
            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - 25%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 25 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 25 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 25 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 25 + ajusteDano - 100;
                }
            } else dano_total = 25 + ajusteDano;
        }
        else if (resultado == "laranja") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - 50%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 50 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 50 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 50 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 50 + ajusteDano - 100;
                }
            } else dano_total = 50 + ajusteDano;
        }
        else if (resultado == "vermelho") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - 75%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 75 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 75 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 75 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 75 + ajusteDano - 100;
                }
            } else dano_total = 75 + ajusteDano;
        }
        else if (resultado == "azul") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - 100%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 100 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 100 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 100 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 100 + ajusteDano - 100;
                }
            } else dano_total = 100 + ajusteDano;
        }
        else if (resultado == "roxo") {
            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:rgb(2,9,37);'>Azul Escuro - 125%</h1>";
            if (puni_25 || puni_50 || puni_75 || puni_100) {
                if (puni_25) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                    dano_total = ajusteDano + 125 - 25;
                } else if (puni_50) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                    dano_total = 125 + ajusteDano - 50;
                } else if (puni_75) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                    dano_total = 125 + ajusteDano - 75;
                } else if (puni_100) {
                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                    dano_total = 125 + ajusteDano - 100;
                }
            } else dano_total = 125 + ajusteDano;
        }
        else if (resultado == "cinza") {
            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico</h1>";
            critico = true;
        }
        let dano_novo = 0;
        switch (dano_total) {
            case 25:
                dano_novo = this.data.data.dano.d25;
                break;
            case 50:
                dano_novo = this.data.data.dano.d50;
                break;
            case 75:
                dano_novo = this.data.data.dano.d75;
                break;
            case 100:
                dano_novo = this.data.data.dano.d100;
                break;
            case 125:
                dano_novo = this.data.data.dano.d125;
                break;
            case 150:
                dano_novo = this.data.data.dano.d150;
                break;
            case 175:
                dano_novo = this.data.data.dano.d175;
                break;
            case 200:
                dano_novo = this.data.data.dano.d200;
                break;
            case 225:
                dano_novo = this.data.data.dano.d225;
                break;
            case 250:
                dano_novo = this.data.data.dano.d250;
                break;
            case 275:
                dano_novo = this.data.data.dano.d275;
                break;
            case 300:
                dano_novo = this.data.data.dano.d300;
                break;
        }
        let coluna = "<h4 class='mediaeval rola'>Coluna: " + coluna_rolada + "</h4>";
        let ajuste_text = "<h1 class='mediaeval rola' style='text-align: center;'>AAC20: " + ajusteDano + "%</h1>";
        let dano_text = "<h1 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_novo + "</h1>";
        let table_dano = `<table style="margin-left: auto;margin-right: auto;text-align:center;" class="mediaeval"><tr><th>25%</th><th>50%</th><th>75%</th><th>100%</th></tr><tr><td>${this.data.data.dano.d25}</td><td>${this.data.data.dano.d50}</td><td>${this.data.data.dano.d75}</td><td>${this.data.data.dano.d100}</td></tr></table>`;
        if (critico) dano_text = table_dano;
        await r.toMessage({
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `<img src="${this.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${this.name}: ${valor_tabela} - ${this.data.data.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${ajuste_text}${punicaoText}${dano_text}`
        });
        if (critico) Hooks.callAll('tagmar_Critico', coluna_rolada, tabela_resol, game.user, this.actor);
    }

    async rollCombate() {
        const tabela_resol = this.tabela_resol;
        let municao = this.data.data.municao;
        let muni_usada = 0;
        if (municao > 0) {
            if (this.data.data.tipo == "")  muni_usada = this.data.data.nivel;
            else muni_usada = 1;
            municao -= muni_usada;
            if (this.data.data.municao != municao) await this.update({"data.municao": municao});
        }
        let municao_text = "";
        if (muni_usada >= 1) municao_text = "<h4 class='mediaeval rola'>Munição gasta: " + muni_usada + " Restam: " + municao + "</h4>";
        else municao_text = "";
        let bonus_cat = this.data.data.bonus;
        let bonus_ajustev = 0;
        const puni_25 = this.data.data.penalidade.p25;
        const puni_50 = this.data.data.penalidade.p50;
        const puni_75 = this.data.data.penalidade.p75;
        const puni_100 = this.data.data.penalidade.p100;
        if (bonus_cat == "AUR") bonus_ajustev = this.actor.data.data.atributos.AUR;
        else if (bonus_cat == "FOR") bonus_ajustev = this.actor.data.data.atributos.FOR;
        else if (bonus_cat == "AGI") bonus_ajustev = this.actor.data.data.atributos.AGI;
        else if (bonus_cat == "PER") bonus_ajustev = this.actor.data.data.atributos.PER; 
        let total_l = this.data.data.nivel + bonus_ajustev + this.data.data.bonus_magico + this.data.data.def_l;
        let total_m = this.data.data.nivel + bonus_ajustev + this.data.data.bonus_magico + this.data.data.def_m;
        let total_p = this.data.data.nivel + bonus_ajustev + this.data.data.bonus_magico + this.data.data.def_p;
        const cat_def = this.actor.data.data.inf_ataque.cat_def;
        let valor_tabela = 0;
        if (this.data.data.nivel > 0) {
            if (cat_def == "L") valor_tabela = total_l + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
            else if (cat_def == "M") valor_tabela = total_m + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
            else if (cat_def == "P") valor_tabela = total_p + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
        } else {
            valor_tabela = -7;
        }
        if (this.data.data.tipo == "" || this.data.data.tipo == "MAG") valor_tabela = total_l + this.actor.data.data.inf_ataque.bonus; // Magia de Ataque
        if (valor_tabela < -7) valor_tabela = -7; // Abaixo da Tabela
        let r = new Roll("1d20");
        r.evaluate({async: false});
        let Dresult = r.total;
        if (valor_tabela <= 20) {
            let coluna_tab = tabela_resol.filter(b => b[0] === valor_tabela);
            let resultado = coluna_tab[0][Dresult];
            await this.combateToChat(coluna_tab[0][0], resultado, puni_25, puni_50, puni_75, puni_100, r, municao_text, valor_tabela);
        } else {
            let coluna_t = valor_tabela % 20;
            const ajusteDano = parseInt(valor_tabela/20) * 50;
            let coluna_tab = tabela_resol.filter(b => b[0] === coluna_t);
            let resultado = coluna_tab[0][Dresult];
            await this.combateToChatPlus(coluna_tab[0][0], resultado, puni_25, puni_50, puni_75, puni_100, r, municao_text, valor_tabela, ajusteDano);
        }
    }

    async rollTagmarItem() {
        Hooks.callAll('tagmar_itemRoll', this, game.user);
        if (this.type === "Habilidade") {
            this.rollHabilidade();
        } else if (this.type === "Magia") {
            this.magiaToChat();
        } else if (this.type === "TecnicasCombate") {
            this.rollTecnicaCombate();
        } else if (this.type === "Combate") {
            this.rollCombate();
        }
    }

}