export class tagmarItem extends Item {

    prepareData() {
        super.prepareData();
    
        // Get the Item's data
        const itemData = this.data;
        const actorData = this.actor ? this.actor.data : {};
        const data = itemData.data;
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
    async roll(ac, extra = {}) {
        // Basic template rendering data
        const token = this.actor.token;
        const item = this.data;
        const actorData = this.actor ? this.actor.data.data : {};
        const itemData = item.data;
        const ItemUpdate = this.actor.getOwnedItem(item._id);
        let formulaD = "";
        var conteudo = "";
        var resultado = "";
        var PrintResult = "";
        var r;
        const tabela_resol = this.tabela_resol;
        if (item.type == "Combate") {  //  Rolagem de Combate
            let punicaoText = "";
            let municao_text = "";
            let municao = itemData.municao;
            let muni_usada = 0;
            if (municao > 0) {
                muni_usada = 1;
                municao -= 1;
                ItemUpdate.update({
                    "data.municao": municao
                });
                ItemUpdate.render();
            }
            if (muni_usada == 1) municao_text = "<h4 class='mediaeval rola'>Munição gasta: " + muni_usada + " Restam: " + municao + "</h4>";
            else municao_text = "";
            const puni_25 = itemData.penalidade.p25;
            const puni_50 = itemData.penalidade.p50;
            const puni_75 = itemData.penalidade.p75;
            const puni_100 = itemData.penalidade.p100;
            let bonus_cat = itemData.bonus;
            let bonus_ajustev = 0;
            if (bonus_cat == "AUR") bonus_ajustev = actorData.atributos.AUR;
            else if (bonus_cat == "FOR") bonus_ajustev = actorData.atributos.FOR;
            else if (bonus_cat == "AGI") bonus_ajustev = actorData.atributos.AGI;
            else if (bonus_cat == "PER") bonus_ajustev = actorData.atributos.PER;
            let total_l = itemData.nivel + bonus_ajustev + itemData.bonus_magico + itemData.def_l;
            let total_m = itemData.nivel + bonus_ajustev + itemData.bonus_magico + itemData.def_m;
            let total_p = itemData.nivel + bonus_ajustev + itemData.bonus_magico + itemData.def_p;
            let dano_total = 0;
            let dano_text = "";
            const cat_def = actorData.inf_ataque.cat_def;
            let valor_tabela = 0;
            if (cat_def == "L") valor_tabela = total_l + actorData.inf_ataque.bonus - actorData.inf_ataque.valor_def;
            else if (cat_def == "M") valor_tabela = total_m + actorData.inf_ataque.bonus - actorData.inf_ataque.valor_def;
            else if (cat_def == "P") valor_tabela = total_p + actorData.inf_ataque.bonus - actorData.inf_ataque.valor_def;
            formulaD = "1d20";
            conteudo = "<h4 class='mediaeval rola rola_desc'>Descrição: " + itemData.descricao + "</h4>";
            r = new Roll(formulaD);
            r.evaluate();
            var Dresult = r.total;
            if (valor_tabela <= 20) {
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == valor_tabela) {
                        resultado = tabela_resol[i][Dresult];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha Crítica</h1>";
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
                            } else dano_total = itemData.dano.d25;
                        }
                        else if (resultado == "laranja") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - 50%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = itemData.dano.d25;
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
                            } else dano_total = itemData.dano.d50;
                        }
                        else if (resultado == "vermelho") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - 75%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = itemData.dano.d50;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = itemData.dano.d25;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = 0;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = 0;
                                }
                            } else dano_total = itemData.dano.d75;
                        }
                        else if (resultado == "azul") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - 100%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = itemData.dano.d75;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = itemData.dano.d50;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = itemData.dano.d25;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = 0;
                                }
                            } else dano_total = itemData.dano.d100;
                        }
                        else if (resultado == "roxo") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:rgb(2,9,37);'>Azul Escuro - 125%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = itemData.dano.d100;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = itemData.dano.d75;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = itemData.dano.d50;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = itemData.dano.d25;
                                }
                            } else dano_total = itemData.dano.d125;
                        }
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna: " + tabela_resol[i][0] + "</h4>";
                        dano_text = "<h2 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_total + "</h2>";
                            r.toMessage({
                            user: game.user._id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name} - ${valor_tabela} - ${itemData.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${punicaoText}${dano_text}`
                        });
                    }
                }
            } else {
                let coluna_t = valor_tabela % 20;
                let ajusteDano = parseInt(valor_tabela/20) * 50;
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == coluna_t) {
                        resultado = tabela_resol[i][Dresult];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha Crítica</h1>";
                        else if (resultado == "branco") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Errou</h1>";
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
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico</h1>";
                        let dano_novo = 0;
                        switch (dano_total) {
                            case 25:
                                dano_novo = itemData.dano.d25;
                                break;
                            case 50:
                                dano_novo = itemData.dano.d50;
                                break;
                            case 75:
                                dano_novo = itemData.dano.d75;
                                break;
                            case 100:
                                dano_novo = itemData.dano.d100;
                                break;
                            case 125:
                                dano_novo = itemData.dano.d125;
                                break;
                            case 150:
                                dano_novo = itemData.dano.d150;
                                break;
                            case 175:
                                dano_novo = itemData.dano.d175;
                                break;
                            case 200:
                                dano_novo = itemData.dano.d200;
                                break;
                            case 225:
                                dano_novo = itemData.dano.d225;
                                break;
                            case 250:
                                dano_novo = itemData.dano.d250;
                                break;
                            case 275:
                                dano_novo = itemData.dano.d275;
                                break;
                            case 300:
                                dano_novo = itemData.dano.d300;
                                break;
                        }
                        let coluna = "<h4 class='mediaeval rola'>Coluna: " + tabela_resol[i][0] + "</h4>";
                        let ajuste_text = "<h1 class='mediaeval rola' style='text-align: center;'>AAC20: " + ajusteDano + "%</h1>";
                        dano_text = "<h1 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_novo + "</h1>";
                        r.toMessage({
                        user: game.user._id,
                        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                        flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name} - ${valor_tabela} - ${itemData.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${ajuste_text}${punicaoText}${dano_text}`
                        });
                    }
                }
            }
        } else if (item.type == "TecnicasCombate") {    // Rolagem TecnicasCombate Macro
            formulaD = "1d20";
            conteudo = "<h3 class='mediaeval rola'>Descrição: </h3>" + "<h4 class='mediaeval rola rola_desc'>" + itemData.descricao + "</h4>";
            r = new Roll(formulaD);
            r.evaluate();
            var Dresult = r.total;
            if (itemData.total <= 20) {
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == itemData.total) {
                        resultado = tabela_resol[i][Dresult];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                        r.toMessage({
                            user: game.user._id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name} - ${itemData.total}</h2>${conteudo}${coluna}${PrintResult}`
                        });
                    }
                }
            } else {
                let valor_hab = itemData.total % 20;
                if (valor_hab == 0) {
                    let vezes = itemData.total / 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll(formulaD);
                        dados[x].evaluate();
                        var Dresult = dados[x].total;
                        for (let i = 0; i < tabela_resol.length; i++) {
                            if (tabela_resol[i][0] == 20) {
                                resultado = tabela_resol[i][Dresult];
                                if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                                else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                                else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                                else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                                else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                                else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                                else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                                let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                                dados[x].toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name} - ${itemData.total}</h2>${conteudo}${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(itemData.total / 20);
                    let sobra = itemData.total % 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll(formulaD);
                        dados[x].evaluate();
                        var Dresult = dados[x].total;
                        for (let i = 0; i < tabela_resol.length; i++) {
                            if (tabela_resol[i][0] == 20) {
                                resultado = tabela_resol[i][Dresult];
                                if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                                else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                                else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                                else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                                else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                                else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                                else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                                let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                                dados[x].toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name} - ${itemData.total}</h2>${conteudo}${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                    var dado = new Roll(formulaD);
                    dado.evaluate();
                    Dresult = dado.total;
                    for (let i = 0; i < tabela_resol.length; i++) {
                        if (tabela_resol[i][0] == sobra) {
                            resultado = tabela_resol[i][Dresult];
                            if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                            else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                            else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                            else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                            else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                            else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                            else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                            let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                            dado.toMessage({
                                user: game.user._id,
                                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name} - ${itemData.total}</h2>${conteudo}${coluna}${PrintResult}`
                              });
                        }
                    }
                }
            }
        } else if (item.type == "Habilidade") {
            let bonus_hab = actorData.bonus_habil;
            let h_total = 0;
            if (itemData.nivel > 0){
                h_total = itemData.total + bonus_hab;
            } else {
                h_total = -7 + itemData.ajuste.valor + itemData.bonus + itemData.penalidade + bonus_hab;
            }
            if (h_total < -7) h_total = -7;
            formulaD = "1d20";
            conteudo = "<h3 class='mediaeval rola'>Tarefas Aperfeiçoadas: </h3>" + "<h4 class='mediaeval rola rola_desc'>" + itemData.tarefAperf + "</h4>";
            r = new Roll(formulaD);
            r.evaluate();
            var Dresult = r.total;
            if (h_total <= 20) {
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == h_total) {
                        resultado = tabela_resol[i][Dresult];
                        if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                        else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                        else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                        else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                        else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                        else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                        r.toMessage({
                            user: game.user._id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name} - ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
                          });
                    }
                }
            } else {
                let valor_hab = h_total % 20;
                if (valor_hab == 0) {
                    let vezes = h_total / 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll(formulaD);
                        dados[x].evaluate();
                        var Dresult = dados[x].total;
                        for (let i = 0; i < tabela_resol.length; i++) {
                            if (tabela_resol[i][0] == 20) {
                                resultado = tabela_resol[i][Dresult];
                                if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                                else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                                else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                                else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                                else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                                else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                                else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                                let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                                dados[x].toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name} - ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(h_total / 20);
                    let sobra = h_total % 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll(formulaD);
                        dados[x].evaluate();
                        var Dresult = dados[x].total;
                        for (let i = 0; i < tabela_resol.length; i++) {
                            if (tabela_resol[i][0] == 20) {
                                resultado = tabela_resol[i][Dresult];
                                if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                                else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                                else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                                else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                                else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                                else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                                else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                                let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                                dados[x].toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola'>${item.name} - ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                    var dado = new Roll(formulaD);
                    dado.evaluate();
                    Dresult = dado.total;
                    for (let i = 0; i < tabela_resol.length; i++) {
                        if (tabela_resol[i][0] == sobra) {
                            resultado = tabela_resol[i][Dresult];
                            if (resultado == "verde") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:green;'>Verde - Falha</h1>";
                            else if (resultado == "branco") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:white;'>Branco - Rotineiro</h1>";
                            else if (resultado == "amarelo") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:yellow;'>Amarelo - Fácil</h1>";
                            else if (resultado == "laranja") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - Médio</h1>";
                            else if (resultado == "vermelho") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - Difícil</h1>";
                            else if (resultado == "azul" || resultado == "roxo") PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - Muito Difícil</h1>";
                            else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico Absurdo</h1>";
                            let coluna = "<h4 class='mediaeval rola'>Coluna:" + tabela_resol[i][0] + "</h4>";
                            dado.toMessage({
                                user: game.user._id,
                                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name} - ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
                              });
                        }
                    }
                }
            } 
        } 
    }
}