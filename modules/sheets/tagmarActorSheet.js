export default class tagmarActorSheet extends ActorSheet {
    
    static get defaultOptions() {
        this.lastUpdate = {};
        return mergeObject(super.defaultOptions, {
        classes: ["tagmar", "sheet", "actor"],
        //width: 900,
        height: 990,
        tabs: [{
            navSelector: ".prim-tabs",
            contentSelector: ".sheet-primary",
            initial: "basico"
            }]
        });
    }
    get template() {
        let layout = game.settings.get("tagmar_rpg", "sheetTemplate");
        if (this.actor.data.type == "Personagem" && layout != "base") {
            if (layout == 'tagmar3anao') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-anao.hbs';
            } else if (layout == 'tagmar3barda') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-barda.hbs';
            } else if (layout == 'tagmar3bardo') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-bardo.hbs';
            } else if (layout == 'tagmar3gana') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-gana.hbs';
            } else if (layout == 'tagmar3ghuma') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-ghuma.hbs';
            } else if (layout == 'tagmar3ghumk') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-ghumk.hbs';
            } else if (layout == 'tagmar3lhuma') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-lhuma.hbs';
            } else if (layout == 'tagmar3lpeqa') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-lpeqa.hbs';
            } else if (layout == 'tagmar3lpeq') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-lpeq.hbs';
            } else if (layout == 'tagmar3lhum') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-lhum.hbs';
            } else if (layout == 'tagmar3melfa') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-melfa.hbs';
            } else if (layout == 'tagmar3mhuma') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-mhuma.hbs';
            } else if (layout == 'tagmar3melfo') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-melfo.hbs';
            } else if (layout == 'tagmar3pap') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-pap.hbs';
            } else if (layout == 'tagmar3relf') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-relf.hbs';
            } else if (layout == 'tagmar3rhuma') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-rhuma.hbs';
            } else if (layout == 'tagmar3shum') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-shum.hbs';
            } else if (layout == 'tagmar3shumv') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-shumv.hbs';
            } else if (layout == 'tagmar3selfa') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-selfa.hbs';
            } else if (layout == 'tagmar3shum1') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-shum1.hbs';
            } else if (layout == 'tagmar3shum2') {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha-shum2.hbs';
            } else {
                return 'systems/tagmar_rpg/templates/sheets/personagem-ficha.hbs';
            }
            
        } else if (this.actor.data.type == "NPC" && layout != "base") {
            return 'systems/tagmar_rpg/templates/sheets/npc-ficha.hbs';
        } else if (this.actor.data.type == "Inventario" && layout != "base") {
            return 'systems/tagmar_rpg/templates/sheets/inventario-ficha.hbs';
        } else {
            return 'systems/tagmar_rpg/templates/sheets/'+ this.actor.data.type.toLowerCase() +'-sheet.hbs';
        }
    }
    getData() {
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
         // Prepare items.
        if (this.actor.data.type == "Inventario") {
            this._prepareInventarioItems(data);
        } else if (this.actor.data.type == 'NPC') {
            let updateNpc = {};
            this._prepareCharacterItems(data);
            this._prepareValorTeste(data, updateNpc);
            this._attDefesaNPC(data, updateNpc);
            if (Object.keys(updateNpc).length > 0) {
                this.actor.update(updateNpc);
            }
        } else if (this.actor.data.type == 'Personagem') {
            let updatePers = {};
            this._prepareCharacterItems(data);
            this._prepareValorTeste(data, updatePers);
            this._caracSort(data, updatePers);
            if (!game.settings.get('tagmar_rpg', 'ajusteManual')) this._calculaAjuste(data, updatePers);
            if (data.actor.raca) {
                this._preparaCaracRaciais(data, updatePers);
            }
            if (data.actor.profissao) {
                this._attProfissao(data, updatePers);
            }
            this._attCargaAbsorcaoDefesa(data, updatePers);
            if (data.actor.raca && data.actor.profissao) {
                this._attEfEhVB(data, updatePers); 
            }
            this._attProximoEstag(data, updatePers);
            this._attKarmaMax(data, updatePers);
            this._attRM(data, updatePers);
            this._attRF(data, updatePers);
            if (updatePers.hasOwnProperty('_id')) delete updatePers['_id'];
            if (this.lastUpdate) {
                if (this.lastUpdate.hasOwnProperty('_id')) delete this.lastUpdate['_id'];
            }
            if (Object.keys(updatePers).length > 0 && this.options.editable) {
                if (!this.lastUpdate) {
                    this.lastUpdate = updatePers;
                    this.actor.update(updatePers);
                    ui.notifications.info("Ficha atualizada.");
                }
                else if (JSON.stringify(updatePers) !== JSON.stringify(this.lastUpdate)) {   // updatePers[Object.keys(updatePers)[0]] != this.lastUpdate[Object.keys(updatePers)[0]]
                    this.lastUpdate = updatePers;
                    this.actor.update(updatePers);
                    ui.notifications.info("Ficha atualizada.");
                }
            }
        }
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (this.actor.data.type != "Inventario") {
            if (!this.options.editable) return;
        }
  
        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            item.sheet.render(true);
        });
  
        if (this.actor.data.type != "Inventario") {
        //Ativa edição de descricao
        html.find('.ativaDesc').click(this._edtDesc.bind(this));
        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            this.actor.deleteOwnedItem(li.data("itemId"));
            li.slideUp(200, () => this.render(false));
        });

        html.find('.rollable').click(this._onItemRoll.bind(this));

        html.find(".movePertence").click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.getOwnedItem(li.data("itemId"));
            if (this.actor.data.data.carga_transp.hasTransp){
                if (!item.data.data.inTransport) {
                    item.update({
                        "data.inTransport": true
                    });
                } else {
                    item.update({
                        "data.inTransport": false
                    });
                }
            }
        });
        html.find(".ativaEfeito").click(this._ativaEfeito.bind(this));
        html.find(".calculaNovaEH").click(this._passandoEH.bind(this));
        html.find(".rollAtributos").hover(function (){
            $(".rollAtributos").html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function () {
            $(".rollAtributos").html("Característica Sorteada");
        });
        html.find(".rollAtributos").click(ev => {
            let formula = "{3d10dl,3d10dl,3d10dl,3d10dl,3d10dl,3d10dl,3d10dl}";
            let r = new Roll(formula);
            r.roll().toMessage({
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: ``
            });
        });
        html.find(".roll1d10").click(ev => {
            let formula = "1d10";
            let r = new Roll(formula);
            r.evaluate();
            r.toMessage({
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: ``
            });
            $(html.find(".valord10EH")).val(r.total);
            $('.calculaNovaEH').css('color', 'rgb(94, 8, 8)');
        });
        html.find(".clickHab").mousedown( function (event) {
            $('.clickHab').html("Nível");
            $('.habNivel').removeClass('esconde');
            $('.habTotal').addClass('esconde');
        });
        html.find(".clickHab").mouseup( function (event) {
            $('.clickHab').html("Total");
            $('.habNivel').addClass('esconde');
            $('.habTotal').removeClass('esconde');
        });
        html.find(".showImg").click(this._combateImg.bind(this));
        html.find(".displayRaca").click(this._displayRaca.bind(this));
        html.find(".displayProf").click(this._displayProf.bind(this));
        html.find(".addGrupoArmas").click(this._addGrupoArmas.bind(this));
        html.find(".subGrupoArmas").click(this._subGrupoArmas.bind(this));
        html.find(".rolarMoral").click(this._rolarMoral.bind(this));
        html.find(".rolaR_Fis").click(this._rolaRFIS.bind(this));
        html.find(".rolaR_Mag").click(this._rolaRMAG.bind(this));
        html.find(".rolarAtt").click(this._rolarAtt.bind(this));
        if (this.actor.owner) {
        let handler = ev => this._onDragStart(ev);
        html.find('.dragable').each((i, li) => {
            if (li.classList.contains("inventory-header")) return;
            li.setAttribute("draggable", true);
            li.addEventListener("dragstart", handler, false);
        });
        }
        }
        if (this.actor.data.type == "Inventario") {
            $('.searchPertence').prop( "disabled", false );
            html.find('.searchPertence').keyup(this._realcaPertence.bind(this));
            html.find('.item-cesto').click(ev => {
                const actors = game.actors;
                let personagem;
                let inventario;
                let bau;
                actors.forEach(function (actor){
                    if (actor.owner && actor.data.type == "Personagem") personagem = actor;
                    if (actor.owner && actor.data.type == "Inventario") {
                        bau = actor;
                        inventario = actor;
                    }
                    else if (actor.data.type == "Inventario") inventario = actor;
                });
                const li = $(ev.currentTarget).parents(".item");
                const item = this.actor.getOwnedItem(li.data("itemId"));
                personagem.createOwnedItem(item);
                if (bau) {
                    bau.deleteOwnedItem(item._id);
                }
            });
        } else if (this.actor.data.type == "Personagem") {
            html.find('.searchPertence').keyup(this._realcaPertence.bind(this));
            html.find('.searchMagia').keyup(this._realcaMagia.bind(this));
            html.find('.searchCombate').keyup(this._realcaCombate.bind(this));
            html.find('.searchHabilidade').keyup(this._realcaHablidade.bind(this));
            html.find('.searchEfeito').keyup(this._realcaEfeito.bind(this));
        } 
    }

    _caracSort(data, updatePers) {
        const sort_INT = data.data.carac_sort.INT;
        const sort_AUR = data.data.carac_sort.AUR;
        const sort_CAR = data.data.carac_sort.CAR;
        const sort_FIS = data.data.carac_sort.FIS;
        const sort_FOR = data.data.carac_sort.FOR;
        const sort_AGI = data.data.carac_sort.AGI;
        const sort_PER = data.data.carac_sort.PER;
        let final_INT = sort_INT + data.data.mod_racial.INT;
        let final_AUR = sort_AUR + data.data.mod_racial.AUR;
        let final_CAR = sort_CAR + data.data.mod_racial.CAR;
        let final_FIS = sort_FIS + data.data.mod_racial.FIS;
        let final_FOR = sort_FOR + data.data.mod_racial.FOR;
        let final_AGI = sort_AGI + data.data.mod_racial.AGI;
        let final_PER = sort_PER + data.data.mod_racial.PER;
        const final_actor = this.actor.data.data.carac_final;
        if (final_INT != final_actor.INT || final_AUR != final_actor.AUR || final_CAR != final_actor.CAR || final_FIS != final_actor.FIS || final_FOR != final_actor.FOR || final_AGI != final_actor.AGI || final_PER != final_actor.PER) {
            updatePers['data.carac_final.AGI'] = final_AGI;
            updatePers['data.carac_final.AUR'] = final_AUR;
            updatePers['data.carac_final.CAR'] = final_CAR;
            updatePers['data.carac_final.FIS'] = final_FIS;
            updatePers['data.carac_final.FOR'] = final_FOR;
            updatePers['data.carac_final.INT'] = final_INT;
            updatePers['data.carac_final.PER'] = final_PER;
        }
    }

    _realcaEfeito(event) {
        event.preventDefault();
        const search = $(event.target).val();
        let search_down = search.toLowerCase();
        $(".efeitoName").each(function(this_td, element) {
            let efeito = $(element).html();
            efeito = efeito.toLowerCase();
            let parente = $(element).closest('tr');
            if (efeito.includes(search_down) && search_down.length > 0) {
                $(parente).removeClass('esconde');
            } else if (search_down.length > 0) {
                $(parente).addClass('esconde');
            }
            else {
                $(parente).removeClass('esconde');
            }
        });
    }

    _realcaHablidade(event) {
        event.preventDefault();
        const search = $(event.target).val();
        let search_down = search.toLowerCase();
        $(".habName").each(function(this_td, element) {
            let pertence = $(element).html();
            pertence = pertence.toLowerCase();
            let parente = $(element).closest('tr');
            if (pertence.includes(search_down) && search_down.length > 0) {
                $(parente).removeClass('esconde');
            } else if (search_down.length > 0) {
                $(parente).addClass('esconde');
            }
            else {
                $(parente).removeClass('esconde');
            }
        });
    }

    _realcaCombate(event) {
        event.preventDefault();
        const search = $(event.target).val();
        let search_down = search.toLowerCase();
        $(".combateName").each(function(this_td, element) {
            let pertence = $(element).html();
            pertence = pertence.toLowerCase();
            let parente = $(element).closest('tr');
            if (pertence.includes(search_down) && search_down.length > 0) {
                $(parente).removeClass('esconde');
            } else if (search_down.length > 0) {
                $(parente).addClass('esconde');
            }
            else {
                $(parente).removeClass('esconde');
            }
        });
    }

    _realcaMagia(event) {
        event.preventDefault();
        const search = $(event.target).val();
        let search_down = search.toLowerCase();
        $(".magiaName").each(function(this_td, element) {
            let pertence = $(element).html();
            pertence = pertence.toLowerCase();
            let parente = $(element).closest('tr');
            if (pertence.includes(search_down) && search_down.length > 0) {
                $(parente).removeClass('esconde');
            } else if (search_down.length > 0) {
                $(parente).addClass('esconde');
            }
            else {
                $(parente).removeClass('esconde');
            }
        });
    }

    _realcaPertence(event) {
        event.preventDefault();
        const search = $(event.target).val();
        let search_down = search.toLowerCase();
        $(".pertenceName").each(function(this_td, element) {
            let pertence = $(element).html();
            pertence = pertence.toLowerCase();
            let parente = $(element).closest('tr');
            if (pertence.includes(search_down) && search_down.length > 0) {
                $(parente).removeClass('esconde');
            } 
            else if (search_down.length > 0) {
                $(parente).addClass('esconde');
            }
            else {
                $(parente).removeClass('esconde');
            }
        });
    }

    _edtDesc(event) {
        const actorData = this.actor.data.data;
            if (actorData.v_base == 0) {
                this.actor.update({
                    'data.v_base': 1
                });
            } else {
                this.actor.update({
                    'data.v_base': 0
                });
            }
    }

    _combateImg(event) {
        const actorData = this.actor.data.data;
        const grupo = $(event.currentTarget).data("itemId");
        let combos = actorData.combos;
        let com_list = combos.split(',');
        const found = com_list.find(element => element == grupo);
        if (found) {
            com_list.splice(com_list.indexOf(grupo),1);
            this.actor.update({
                "data.combos": com_list.join(',')
            });
        } else {
            com_list.push(grupo);
            this.actor.update({
                "data.combos": com_list.join(',')
            });
        }
    }

    _displayRaca(event) {
        const racaData = this.raca;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({
                actor: this.actor
              })
        };
        chatData.content = "<img src='"+ racaData.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + racaData.name + "</h1>"  + "<h3 class='mediaeval rola rola_desc'>" + racaData.data.descricao + "</h3>";
        ChatMessage.create(chatData);
    }

    _displayProf(event) {
        const profData = this.profissao;
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({
                actor: this.actor
              })
        };
        chatData.content = "<img src='"+ profData.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + profData.name + "</h1>"  + "<h3 class='mediaeval rola rola_desc'>" + profData.data.descricao + "</h3>";
        ChatMessage.create(chatData);
    }

    _rolaRMAG(event) {
        const table_resFisMag = this.table_resFisMag;
        const forcAtaqueI = parseInt($(".F_Ataque").val());
        if (!forcAtaqueI) {
            ui.notifications.warn("Preencha um valor maior que zero no campo F.Ataque.");
            $('.F_Ataque').css('background-color','Orange');
            return;
        }
        const valorDefI = this.actor.data.data.rm;
        let forcAtaque = forcAtaqueI;
        let valorDef = valorDefI;
        let def_ataq = valorDef - forcAtaque;
        let stringSucesso = "";
        let valorSucess = 0;
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
        const r = new Roll("1d20");
        r.evaluate();
        const Dresult = r.total;
        if (Dresult >= valorSucess) { // Sucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:blue;'>SUCESSO</h1>";
        } else {    // Insucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:red;'>FRACASSO</h1>";
        }  
        r.toMessage({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<h2 class="mediaeval rola">Teste de Resistência </h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaqueI}</h3><h3 class="mediaeval rola">Resistência Magía: ${valorDefI}</h3>${stringSucesso}`
        });
        $(".F_Ataque").val("");
        if (this.actor.data.data.forca_ataque) {
            this.actor.update({
                "data.forca_ataque": null
            });
        }
    }

    _rolaRFIS(event) {
        const table_resFisMag = this.table_resFisMag;
        const forcAtaqueI = parseInt($(".F_Ataque").val());
        if (!forcAtaqueI) {
            ui.notifications.warn("Preencha um valor maior que zero no campo F.Ataque.");
            $('.F_Ataque').css('background-color','Orange');
            return;
        }
        const valorDefI = this.actor.data.data.rf;
        let forcAtaque = forcAtaqueI;
        let valorDef = valorDefI;
        let def_ataq = valorDef - forcAtaque;
        let stringSucesso = "";
        let valorSucess = 0;
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
        const r = new Roll("1d20");
        r.evaluate();
        const Dresult = r.total;
        if (Dresult >= valorSucess) { // Sucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:blue;'>SUCESSO</h1>";
        } else {    // Insucesso
            stringSucesso = "<h1 class='mediaeval rola' style='text-align:center; color: white;background-color:red;'>FRACASSO</h1>";
        }  
        r.toMessage({
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<h2 class="mediaeval rola">Teste de Resistência </h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaqueI}</h3><h3 class="mediaeval rola">Resistência Física: ${valorDefI}</h3>${stringSucesso}`
        });
        $(".F_Ataque").val("");
        if (this.actor.data.data.forca_ataque) {
            this.actor.update({
                "data.forca_ataque": null
            });
        }
    }
    _passandoEH(event) {
        let estagio_atual = this.actor.data.data.estagio;
        let valord10 = parseInt($(".valord10EH").val());
        if (!valord10 && estagio_atual > 1) {
            ui.notifications.warn("Clique em '1d10' para rolar o dado ou preencha o valor no campo.");
            $('.roll1d10').css('color', 'rgb(94, 8, 8)');
            return;
        }
        let raca_list = [];
        let nova_eh = 0;
        let eh_atual = this.actor.data.data.eh.max;
        let attFIS = this.actor.data.data.atributos.FIS;
        if (estagio_atual > 1 && valord10 > 0 && valord10 <= 10) {
            if (this.profissao) {
                if (valord10 >= 1 && valord10 <= 2) {
                    nova_eh = this.profissao.data.lista_eh.v1;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 3 && valord10 <= 5) {
                    nova_eh = this.profissao.data.lista_eh.v2;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 6 && valord10 <= 8) {
                    nova_eh = this.profissao.data.lista_eh.v3;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 9 && valord10 <= 10) {
                    nova_eh = this.profissao.data.lista_eh.v4;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                }
            }
        }
        if (this.actor.data.data.valor_dado_eh) {
            this.actor.update({
                "data.valor_dado_eh": null
            });
        }
        //$(".valord10EH").val("");
        //this.render();
    }

    _attProximoEstag(data, updatePers) {
        if (!this.options.editable) return;
        let estagio_atual = this.actor.data.data.estagio;
        let prox_est = [0, 11, 21, 31, 46, 61, 76, 96, 116, 136, 166, 196, 226 , 266, 306, 346, 386, 436, 486, 536, 586, 646, 706, 766, 826, 896, 966, 1036, 1106, 1186, 1266, 
            1346, 1426, 1516, 1606, 1696, 1786, 1886, 1986, 2086];
        if (estagio_atual < 40 && this.actor.data.data.pontos_estagio.next != prox_est[estagio_atual]) {
            updatePers["data.pontos_estagio.next"] = prox_est[estagio_atual];
        }
    }

    _attRM(data, updatePers) {
        if (!this.options.editable) return;
        let rm = this.actor.data.data.estagio + this.actor.data.data.atributos.AUR;
        if (this.efeitos.length > 0) {
            for (let efeito of this.efeitos) {
                if (efeito.data.atributo == "RMAG" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        rm += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        rm -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        rm = rm * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        rm = rm / efeito.data.valor;
                    }
                }
            }
        }
        if (this.actor.data.data.rm != rm) {
            updatePers["data.rm"] = rm;
            this.actor.update({
                "data.rm": rm
            });
        }
    }

    _attRF(data, updatePers) {
        if (!this.options.editable) return;
        let rf = this.actor.data.data.estagio + this.actor.data.data.atributos.FIS;
        if (this.efeitos.length > 0) {
            for (let efeito of this.efeitos){
                if (efeito.data.atributo == "RFIS" && efeito.data.ativo){
                    if (efeito.data.tipo == "+") {
                        rf += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        rf -= efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        rf = rf / efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        rf = rf * efeito.data.valor;
                    }
                }
            }
        }
        if (this.actor.data.data.rf != rf) {
            updatePers["data.rf"] = rf;
        } 
    }

    _attKarmaMax(data, updatePers) {
        if (!this.options.editable) return;
        let karma = ((this.actor.data.data.atributos.AUR) + 1 ) * ((this.actor.data.data.estagio) + 1);
        if (karma < 0) karma = 0;
        if (this.efeitos.length > 0){
            for (let efeito of this.efeitos) {
                if (efeito.data.atributo == "KMA" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        karma += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        karma -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        karma = karma * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        karma = karma / efeito.data.valor;
                    }
                }
            }
        }
        if (this.actor.data.data.karma.max != karma) {
            updatePers["data.karma.max"] = karma;
        }
    }
    _addGrupoArmas(event) {
        const grupo = $(event.currentTarget).data("itemId");
        const actorData = this.actor.data;
        if (actorData.data.pontos_comb >= 0) {
            if (grupo == "CD") {
                let pontos = actorData.data.grupos.CD + 1;
                this.actor.update({
                    "data.grupos.CD": pontos
                });
            } else if (grupo == "CI") {
                let pontos = actorData.data.grupos.CI + 1;
                this.actor.update({
                    "data.grupos.CI": pontos
                });
            } else if (grupo == "CL") {
                let pontos = actorData.data.grupos.CL + 1;
                this.actor.update({
                    "data.grupos.CL": pontos
                });
            } else if (grupo == "CLD") {
                let pontos = actorData.data.grupos.CLD + 1;
                this.actor.update({
                    "data.grupos.CLD": pontos
                });
            } else if (grupo == "EL") {
                let pontos = actorData.data.grupos.EL + 1;
                this.actor.update({
                    "data.grupos.EL": pontos
                });
            } else if (grupo == "CmE") {
                let pontos = actorData.data.grupos.CmE + 1;
                this.actor.update({
                    "data.grupos.CmE": pontos
                });
            } else if (grupo == "CmM") {
                let pontos = actorData.data.grupos.CmM + 1;
                this.actor.update({
                    "data.grupos.CmM": pontos
                });
            } else if (grupo == "EM") {
                let pontos = actorData.data.grupos.EM + 1;
                this.actor.update({
                    "data.grupos.EM": pontos
                });
            } else if (grupo == "PmA") {
                let pontos = actorData.data.grupos.PmA + 1;
                this.actor.update({
                    "data.grupos.PmA": pontos
                });
            } else if (grupo == "PmL") {
                let pontos = actorData.data.grupos.PmL + 1;
                this.actor.update({
                    "data.grupos.PmL": pontos
                });
            } else if (grupo == "CpE") {
                let pontos = actorData.data.grupos.CpE + 1;
                this.actor.update({
                    "data.grupos.CpE": pontos
                });
            } else if (grupo == "CpM") {
                let pontos = actorData.data.grupos.CpM + 1;
                this.actor.update({
                    "data.grupos.CpM": pontos
                });
            } else if (grupo == "EP") {
                let pontos = actorData.data.grupos.EP + 1;
                this.actor.update({
                    "data.grupos.EP": pontos
                });
            } else if (grupo == "PP") {
                let pontos = actorData.data.grupos.PP + 1;
                this.actor.update({
                    "data.grupos.PP": pontos
                });
            } else if (grupo == "PpA") {
                let pontos = actorData.data.grupos.PpA + 1;
                this.actor.update({
                    "data.grupos.PpA": pontos
                });
            } else if (grupo == "PpB") {
                let pontos = actorData.data.grupos.PpB + 1;
                this.actor.update({
                    "data.grupos.PpB": pontos
                });
            }
        }
    }
    _subGrupoArmas(event){
        const grupo = $(event.currentTarget).data("itemId");
        const actorData = this.actor.data;
        if (grupo == "CD" && actorData.data.grupos.CD > 0) {
            let pontos = actorData.data.grupos.CD - 1;
            this.actor.update({
                "data.grupos.CD": pontos
            });
        } else if (grupo == "CI" && actorData.data.grupos.CI > 0) {
            let pontos = actorData.data.grupos.CI - 1;
            this.actor.update({
                "data.grupos.CI": pontos
            });
        } else if (grupo == "CL" && actorData.data.grupos.CL > 0) {
            let pontos = actorData.data.grupos.CL - 1;
            this.actor.update({
                "data.grupos.CL": pontos
            });
        } else if (grupo == "CLD" && actorData.data.grupos.CLD > 0) {
            let pontos = actorData.data.grupos.CLD - 1;
            this.actor.update({
                "data.grupos.CLD": pontos
            });
        } else if (grupo == "EL" && actorData.data.grupos.EL > 0) {
            let pontos = actorData.data.grupos.EL - 1;
            this.actor.update({
                "data.grupos.EL": pontos
            });
        } else if (grupo == "CmE" && actorData.data.grupos.CmE > 0) {
            let pontos = actorData.data.grupos.CmE - 1;
            this.actor.update({
                "data.grupos.CmE": pontos
            });
        } else if (grupo == "CmM" && actorData.data.grupos.CmM > 0) {
            let pontos = actorData.data.grupos.CmM - 1;
            this.actor.update({
                "data.grupos.CmM": pontos
            });
        } else if (grupo == "EM" && actorData.data.grupos.EM > 0) {
            let pontos = actorData.data.grupos.EM - 1;
            this.actor.update({
                "data.grupos.EM": pontos
            });
        } else if (grupo == "PmA" && actorData.data.grupos.PmA > 0) {
            let pontos = actorData.data.grupos.PmA - 1;
            this.actor.update({
                "data.grupos.PmA": pontos
            });
        } else if (grupo == "PmL" && actorData.data.grupos.PmL > 0) {
            let pontos = actorData.data.grupos.PmL - 1;
            this.actor.update({
                "data.grupos.PmL": pontos
            });
        } else if (grupo == "CpE" && actorData.data.grupos.CpE > 0) {
            let pontos = actorData.data.grupos.CpE - 1;
            this.actor.update({
                "data.grupos.CpE": pontos
            });
        } else if (grupo == "CpM" && actorData.data.grupos.CpM > 0) {
            let pontos = actorData.data.grupos.CpM - 1;
            this.actor.update({
                "data.grupos.CpM": pontos
            });
        } else if (grupo == "EP" && actorData.data.grupos.EP > 0) {
            let pontos = actorData.data.grupos.EP - 1;
            this.actor.update({
                "data.grupos.EP": pontos
            });
        } else if (grupo == "PP" && actorData.data.grupos.PP > 0) {
            let pontos = actorData.data.grupos.PP - 1;
            this.actor.update({
                "data.grupos.PP": pontos
            });
        } else if (grupo == "PpA" && actorData.data.grupos.PpA > 0) {
            let pontos = actorData.data.grupos.PpA - 1;
            this.actor.update({
                "data.grupos.PpA": pontos
            });
        } else if (grupo == "PpB" && actorData.data.grupos.PpB > 0) {
            let pontos = actorData.data.grupos.PpB - 1;
            this.actor.update({
                "data.grupos.PpB": pontos
            });
        }
        
    }
    _attProfissao(sheetData, updatePers) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        if (actorData.profissao) {
            const profissaoData = actorData.profissao;
            const max_hab = profissaoData.data.p_aquisicao.p_hab + Math.floor(actorData.data.estagio / 2);
            const atrib_magia = profissaoData.data.atrib_mag;
            let pontos_hab = profissaoData.data.p_aquisicao.p_hab * actorData.data.estagio;
            const grupo_pen = profissaoData.data.grupo_pen;
            const hab_nata = actorData.data.hab_nata;
            let pontos_tec = profissaoData.data.p_aquisicao.p_tec * actorData.data.estagio;
            let pontos_mag = 0;
            let pontos_gra = profissaoData.data.p_aquisicao.p_gra * actorData.data.estagio;
            if (max_hab != actorData.data.max_hab) {
                updatePers["data.max_hab"] = max_hab;
            }
            if (atrib_magia != "") {
                if (atrib_magia == "INT") pontos_mag = ((2 * actorData.data.atributos.INT) + 7) * actorData.data.estagio;
                else if (atrib_magia == "AUR") pontos_mag = ((2 * actorData.data.atributos.AUR) + 7) * actorData.data.estagio;
                else if (atrib_magia == "CAR") pontos_mag = ((2 * actorData.data.atributos.CAR) + 7) * actorData.data.estagio;
                else if (atrib_magia == "FOR") pontos_mag = ((2 * actorData.data.atributos.FOR) + 7) * actorData.data.estagio;
                else if (atrib_magia == "FIS") pontos_mag = ((2 * actorData.data.atributos.FIS) + 7)  * actorData.data.estagio;
                else if (atrib_magia == "AGI") pontos_mag = ((2 * actorData.data.atributos.AGI) + 7) * actorData.data.estagio;
                else if (atrib_magia == "PER") pontos_mag = ((2 * actorData.data.atributos.PER) + 7) * actorData.data.estagio;
            } else pontos_mag = 0;
            if (this.efeitos.length > 0){
                for (let efeito of this.efeitos) {
                    if (efeito.data.atributo == "PHAB" && efeito.data.ativo) {
                        if (efeito.data.tipo == "+") {
                            pontos_hab += efeito.data.valor;
                        } else if (efeito.data.tipo == "-") {
                            pontos_hab -= efeito.data.valor;
                        } else if (efeito.data.tipo == "*") {
                            pontos_hab = pontos_hab * efeito.data.valor;
                        } else if (efeito.data.tipo == "/") {
                            pontos_hab = pontos_hab / efeito.data.valor;
                        }
                    } else if (efeito.data.atributo == "PTEC" && efeito.data.ativo) {
                        if (efeito.data.tipo == "+") {
                            pontos_tec += efeito.data.valor;
                        } else if (efeito.data.tipo == "-") {
                            pontos_tec -= efeito.data.valor;
                        } else if (efeito.data.tipo == "*") {
                            pontos_tec = pontos_tec * efeito.data.valor;
                        } else if (efeito.data.tipo == "/") {
                            pontos_tec = pontos_tec / efeito.data.valor;
                        }
                    } else if (efeito.data.atributo == "PARM" && efeito.data.ativo) {
                        if (efeito.data.tipo == "+") {
                            pontos_gra += efeito.data.valor;
                        } else if (efeito.data.tipo == "-") {
                            pontos_gra -= efeito.data.valor;
                        } else if (efeito.data.tipo == "*") {
                            pontos_gra = pontos_gra * efeito.data.valor;
                        } else if (efeito.data.tipo == "/") {
                            pontos_gra = pontos_gra / efeito.data.valor;
                        }
                    } else if (efeito.data.atributo == "PMAG" && efeito.data.ativo) {
                        if (efeito.data.tipo == "+") {
                            pontos_mag += efeito.data.valor;
                        } else if (efeito.data.tipo == "-") {
                            pontos_mag -= efeito.data.valor;
                        } else if (efeito.data.tipo == "*") {
                            pontos_mag = pontos_mag * efeito.data.valor;
                        } else if (efeito.data.tipo == "/") {
                            pontos_mag = pontos_mag / efeito.data.valor;
                        }
                    }
                }
            }
            if (pontos_gra > 0) {
                pontos_gra -= actorData.data.grupos.CD;
                pontos_gra -= actorData.data.grupos.CI;
                pontos_gra -= actorData.data.grupos.CL;
                pontos_gra -= actorData.data.grupos.CLD;
                pontos_gra -= actorData.data.grupos.EL;
                pontos_gra -= actorData.data.grupos.CmE * 2;
                pontos_gra -= actorData.data.grupos.CmM * 2;
                pontos_gra -= actorData.data.grupos.EM * 2;
                pontos_gra -= actorData.data.grupos.PmA * 2;
                pontos_gra -= actorData.data.grupos.PmL * 2;
                pontos_gra -= actorData.data.grupos.CpE * 3;
                pontos_gra -= actorData.data.grupos.CpM * 3;
                pontos_gra -= actorData.data.grupos.EP * 3;
                pontos_gra -= actorData.data.grupos.PP * 3;
                pontos_gra -= actorData.data.grupos.PpA * 3;
                pontos_gra -= actorData.data.grupos.PpB * 3;

            }
            for (let i = 0; i < actorData.tecnicas.length; i++) {
                pontos_tec -= actorData.tecnicas[i].data.custo * actorData.tecnicas[i].data.nivel;
            }
            for (let i = 0; i < actorData.magias.length; i++) {
                pontos_mag -= actorData.magias[i].data.custo * actorData.magias[i].data.nivel;
            }
            for (let i = 0; i < actorData.h_prof.length; i++) {
                if (grupo_pen == "profissional") {
                    pontos_hab -= (actorData.h_prof[i].data.custo + 1) * actorData.h_prof[i].data.nivel;
                } else if (hab_nata == actorData.h_prof[i].name) {
                    //pontos_hab -= 0;
                    let habilidade = this.actor.getOwnedItem(actorData.h_prof[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_prof[i].data.custo * actorData.h_prof[i].data.nivel;
                }
            }
            for (let i = 0; i < actorData.h_man.length; i++) {
                if (grupo_pen == "manobra") {
                    pontos_hab -= (actorData.h_man[i].data.custo + 1) * actorData.h_man[i].data.nivel;
                } else if (hab_nata == actorData.h_man[i].name) {
                    const habilidade = this.actor.getOwnedItem(actorData.h_man[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_man[i].data.custo * actorData.h_man[i].data.nivel;
                }
            }
            for (let i = 0; i < actorData.h_con.length; i++) {
                if (grupo_pen == "conhecimento") {
                    pontos_hab -= (actorData.h_con[i].data.custo + 1) * actorData.h_con[i].data.nivel;
                } else if (hab_nata == actorData.h_con[i].name) {
                    const habilidade = this.actor.getOwnedItem(actorData.h_con[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_con[i].data.custo * actorData.h_con[i].data.nivel;
                }
            }
            for (let i = 0; i < actorData.h_sub.length; i++) {
                if (grupo_pen == "subterfugio") {
                    pontos_hab -= (actorData.h_sub[i].data.custo + 1) * actorData.h_sub[i].data.nivel;
                } else if (hab_nata == actorData.h_sub[i].name) {
                    const habilidade = this.actor.getOwnedItem(actorData.h_sub[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_sub[i].data.custo * actorData.h_sub[i].data.nivel;
                }
            }
            for (let i = 0; i < actorData.h_inf.length; i++) {
                if (grupo_pen == "influencia") {
                    pontos_hab -= (actorData.h_inf[i].data.custo + 1) * actorData.h_inf[i].data.nivel;
                } else if (hab_nata == actorData.h_inf[i].name) {
                    const habilidade = this.actor.getOwnedItem(actorData.h_inf[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_inf[i].data.custo * actorData.h_inf[i].data.nivel;
                }
            }
            for (let i = 0; i < actorData.h_geral.length; i++) {
                if (grupo_pen == "geral") {
                    pontos_hab -= (actorData.h_geral[i].data.custo + 1) * actorData.h_geral[i].data.nivel;
                } else if (hab_nata == actorData.h_geral[i].name) {
                    const habilidade = this.actor.getOwnedItem(actorData.h_geral[i]._id);
                    habilidade.update({
                        "data.nivel": actorData.data.estagio
                    });
                } else {
                    pontos_hab -= actorData.h_geral[i].data.custo * actorData.h_geral[i].data.nivel;
                }
            }
            if (pontos_hab != actorData.data.pontos_aqui) {
                updatePers["data.pontos_aqui"] = pontos_hab;
            }
            if (pontos_tec != actorData.data.pontos_tec) {
                updatePers["data.pontos_tec"] = pontos_tec;
            }
            if (pontos_gra != actorData.data.pontos_comb) {
                updatePers["data.pontos_comb"] = pontos_gra;
            }
            if (pontos_mag != actorData.data.pontos_mag) {
                updatePers["data.pontos_mag"] = pontos_mag;
            }
            if  (profissaoData.name != actorData.data.profissao) {
                updatePers["data.profissao"] = profissaoData.name;
            }
        }
    }

    _preparaCaracRaciais(sheetData, updatePers) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        if (actorData.raca) {
            const racaData = actorData.raca.data;
            if (actorData.data.raca != actorData.raca.name)
            {
                updatePers['data.raca'] = actorData.raca.name;
                updatePers['data.mod_racial.INT'] = racaData.mod_racial.INT;
                updatePers['data.mod_racial.AUR'] = racaData.mod_racial.AUR;
                updatePers['data.mod_racial.CAR'] = racaData.mod_racial.CAR;
                updatePers['data.mod_racial.FOR'] = racaData.mod_racial.FOR;
                updatePers['data.mod_racial.FIS'] = racaData.mod_racial.FIS;
                updatePers['data.mod_racial.AGI'] = racaData.mod_racial.AGI;
                updatePers['data.mod_racial.PER'] = racaData.mod_racial.PER;
            } 
        }
    }

    _calculaAjuste(sheetData, updatePers) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        let carac_finalINT = actorData.data.carac_final.INT;
        let carac_finalAUR = actorData.data.carac_final.AUR;
        let carac_finalCAR = actorData.data.carac_final.CAR;
        let carac_finalFOR = actorData.data.carac_final.FOR;
        let carac_finalFIS = actorData.data.carac_final.FIS;
        let carac_finalAGI = actorData.data.carac_final.AGI;
        let carac_finalPER = actorData.data.carac_final.PER;
        if (carac_finalINT >= 36) carac_finalINT = 36;
        else if (carac_finalAUR >= 36) carac_finalAUR = 36;
        else if (carac_finalCAR >= 36) carac_finalCAR = 36;
        else if (carac_finalFOR >= 36) carac_finalFOR = 36;
        else if (carac_finalFIS >= 36) carac_finalFIS = 36;
        else if (carac_finalAGI >= 36) carac_finalAGI = 36;
        else if (carac_finalPER >= 36) carac_finalPER = 36;
        let valores = [0,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,2,2,3,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        let somaINT = valores[carac_finalINT];
        let somaAUR = valores[carac_finalAUR];
        let somaCAR = valores[carac_finalCAR];
        let somaFOR = valores[carac_finalFOR];
        let somaFIS = valores[carac_finalFIS];
        let somaAGI = valores[carac_finalAGI];
        let somaPER = valores[carac_finalPER];
        if (this.efeitos.length > 0){
            for (let efeito of this.efeitos) {
                if (efeito.data.atributo == "INT" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaINT += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaINT -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaINT = somaINT * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaINT = somaINT / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "AUR" && efeito.data.ativo) {
                   if (efeito.data.tipo == "+") {
                       somaAUR += efeito.data.valor;
                   } else if (efeito.data.tipo == "-") {
                       somaAUR -= efeito.data.valor;
                   } else if (efeito.data.tipo == "*") {
                       somaAUR = somaAUR * efeito.data.valor;
                   } else if (efeito.data.tipo == "/") {
                       somaAUR = somaAUR / efeito.data.valor;
                   }
                } else if (efeito.data.atributo == "CAR" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaCAR += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaCAR -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaCAR = somaCAR * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaCAR = somaCAR / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "FOR" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaFOR += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaFOR -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaFOR = somaFOR * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaFOR = somaFOR / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "FIS" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaFIS += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaFIS -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaFIS = somaFIS * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaFIS = somaFIS / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "AGI" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaAGI += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaAGI -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaAGI = somaAGI * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaAGI = somaAGI / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "PER" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        somaPER += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        somaPER -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        somaPER = somaPER * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        somaPER = somaPER / efeito.data.valor;
                    }
                }
            }
        }
        if (carac_finalINT > 0 && actorData.data.atributos.INT != somaINT) {
            updatePers["data.atributos.INT"] = somaINT;
        }
        if (carac_finalAUR > 0 && actorData.data.atributos.AUR != somaAUR) {
            updatePers["data.atributos.AUR"] = somaAUR;
        }
        if (carac_finalCAR > 0 && actorData.data.atributos.CAR != somaCAR) {
            updatePers["data.atributos.CAR"] = somaCAR;
        }  
        if (carac_finalFOR > 0 && actorData.data.atributos.FOR != somaFOR) {
            updatePers["data.atributos.FOR"] = somaFOR;
        }  
        if (carac_finalFIS > 0 && actorData.data.atributos.FIS != somaFIS) {
            updatePers["data.atributos.FIS"] = somaFIS;
        } 
        if (carac_finalAGI > 0 && actorData.data.atributos.AGI != somaAGI) {
            updatePers["data.atributos.AGI"] = somaAGI;
        } 
        if (carac_finalPER > 0 && actorData.data.atributos.PER != somaPER) {
            updatePers["data.atributos.PER"] = somaPER;
        } 
    }

    _prepareValorTeste(sheetData, updatePers){
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        if (actorData.data.valor_teste.INT != actorData.data.atributos.INT*4 || actorData.data.valor_teste.AUR != actorData.data.atributos.AUR*4 || actorData.data.valor_teste.CAR != actorData.data.atributos.CAR*4 || actorData.data.valor_teste.FOR != actorData.data.atributos.FOR*4 || actorData.data.valor_teste.FIS != actorData.data.atributos.FIS*4 || actorData.data.valor_teste.AGI != actorData.data.atributos.AGI*4 || actorData.data.valor_teste.PER != actorData.data.atributos.PER*4) {
            updatePers["data.valor_teste.INT"] = actorData.data.atributos.INT*4;
            updatePers["data.valor_teste.AUR"] = actorData.data.atributos.AUR*4;
            updatePers["data.valor_teste.CAR"] = actorData.data.atributos.CAR*4;
            updatePers["data.valor_teste.FOR"] = actorData.data.atributos.FOR*4;
            updatePers["data.valor_teste.FIS"] = actorData.data.atributos.FIS*4;
            updatePers["data.valor_teste.AGI"] = actorData.data.atributos.AGI*4;
            updatePers["data.valor_teste.PER"] = actorData.data.atributos.PER*4;
        }
    }
    //Exclusivo para Inventário
    _prepareInventarioItems(sheetData) { 
        const actorData = sheetData.actor;
        const pertences = [];
        const transportes = [];
        const cesto = [];
        const itens = sheetData.items;
        itens.forEach(function(item, indice, array) {
            if (item.type == "Pertence") {
                pertences.push(item);
            } else if (item.type == "Transporte") {
                transportes.push(item);
            }
        });
        if (pertences.length > 1) pertences.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (transportes.length > 1) transportes.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        actorData.pertences = pertences;
        actorData.transportes = transportes;
        actorData.cesto = cesto;
        this.cesto = cesto;
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;
        const combate = [];
        const magias = [];
        const h_prof = [];
        const h_man = [];
        const h_con = [];
        const h_sub = [];
        const h_inf = [];
        const h_geral = [];
        const tecnicas = [];
        const defesas = [];
        const transportes = [];
        const pertences = [];
        const pertences_transporte = [];
        const racas = [];
        const profissoes = [];
        var especializacoes = [];
        const itens = sheetData.items;
        const efeitos = [];
        itens.forEach(function(item, indice, array) {
            if (item.type == "Combate"){
                combate.push(item);
            } else if (item.type == "Magia") {
                magias.push(item);
            } else if (item.type == "Habilidade") {
                if (item.data.tipo == "profissional") h_prof.push(item);
                else if (item.data.tipo == "manobra") h_man.push(item);
                else if (item.data.tipo == "conhecimento") h_con.push(item);
                else if (item.data.tipo == "subterfugio") h_sub.push(item);
                else if (item.data.tipo == "influencia") h_inf.push(item);
                else if (item.data.tipo == "geral") h_geral.push(item);
            } else if (item.type == "TecnicasCombate") { 
                tecnicas.push(item);
            } else if (item.type == "Defesa") {
                defesas.push(item);
            } else if (item.type == "Transporte") {
                transportes.push(item);
            } else if (item.type == "Pertence") {
                if (item.data.inTransport) pertences_transporte.push(item);
                else pertences.push(item);
            } else if (item.type == "Raca") {
                if (racas.length >= 1) this.actor.deleteOwnedItem(item._id);
                else racas.push(item);
                
            } else if (item.type == "Profissao") {
                if (profissoes.length >= 1) this.actor.deleteOwnedItem(item._id);
                else profissoes.push(item);
            } else if (item.type == "Efeito") {
                efeitos.push(item);
            }
        });
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
        const table_resFisMag = [
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
        if (profissoes[0]) {
            especializacoes = profissoes[0].data.especializacoes.split(",");
        } // Alow
        if (h_prof.length > 1) h_prof.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (h_man.length > 1) h_man.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (h_con.length > 1) h_con.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (h_sub.length > 1) h_sub.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (h_inf.length > 1) h_inf.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (h_geral.length > 1) h_geral.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (magias.length > 1) magias.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (combate.length > 1) combate.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (tecnicas.length > 1) tecnicas.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (defesas.length > 1) defesas.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (pertences.length > 1) pertences.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (transportes.length > 1) transportes.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (pertences_transporte.length > 1) pertences_transporte.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        if (efeitos.length > 1) efeitos.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        actorData.efeitos = efeitos;
        this.efeitos = efeitos;
        this.table_resFisMag = table_resFisMag;
        this.tabela_resol = tabela_resol;
        actorData.especializacoes = especializacoes;
        actorData.raca = racas[0];
        actorData.profissao = profissoes[0];
        this.raca = actorData.raca;
        this.profissao = actorData.profissao;
        actorData.pertences_transporte = pertences_transporte;
        actorData.pertences = pertences;
        actorData.defesas = defesas;
        actorData.transportes = transportes;
        actorData.tecnicas = tecnicas;
        actorData.h_prof = h_prof;
        actorData.h_man = h_man;
        actorData.h_con = h_con;
        actorData.h_sub = h_sub;
        actorData.h_inf = h_inf;
        actorData.h_geral = h_geral;
        actorData.combate = combate;
        actorData.magias = magias;
    }

    _attDefesaNPC(data, updateNpc) {
        if (!this.options.editable) return;
        var absorcao = 0;
        var def_pasVal = 0;
        var def_pasCat = "";
        if (data.actor.defesas.length > 0){
            data.actor.defesas.forEach(function(item){
                absorcao += item.data.absorcao;
                def_pasVal += item.data.defesa_base.valor;
                if (item.data.defesa_base.tipo != ""){
                    def_pasCat = item.data.defesa_base.tipo;
                }
            });
        }
        var def_atiVal = def_pasVal + this.actor.data.data.atributos.AGI;
        const actorData = this.actor.data.data;
        if (actorData.d_passiva.valor != def_pasVal || actorData.d_passiva.categoria != def_pasCat || actorData.d_ativa.categoria != def_pasCat || actorData.d_ativa.valor != def_atiVal || actorData.absorcao.max != absorcao) {
            updateNpc["data.d_passiva.valor"] = def_pasVal;
            updateNpc["data.d_passiva.categoria"] = def_pasCat;
            updateNpc["data.d_ativa.categoria"] = def_pasCat;
            updateNpc["data.d_ativa.valor"] = def_atiVal;
            updateNpc["data.absorcao.max"] = absorcao;
        }
    }
    _attCargaAbsorcaoDefesa(data, updatePers) {
        if (!this.options.editable) return;
        var actor_carga = 0;    // Atualiza Carga e verifica Sobrecarga
        var cap_transp = 0;
        var cap_usada = 0;
        var absorcao = 0;
        var def_pasVal = 0;
        var def_pasCat = "";
        
        if (data.actor.defesas.length > 0){
            data.actor.defesas.forEach(function(item){
                //actor_carga += item.data.peso;
                absorcao += item.data.absorcao;
                def_pasVal += item.data.defesa_base.valor;
                if (item.data.defesa_base.tipo != ""){
                    def_pasCat = item.data.defesa_base.tipo;
                }
            });
        }
        if (data.actor.pertences.length > 0){
            data.actor.pertences.forEach(function(item){
                actor_carga += item.data.peso * item.data.quant;
            });
        }
        if (data.actor.transportes.length > 0){
            data.actor.transportes.forEach(function(item){
                cap_transp += item.data.capacidade.carga;
            });
        }
        if (data.actor.pertences_transporte.length > 0){
            data.actor.pertences_transporte.forEach(function(item){
                cap_usada += item.data.peso * item.data.quant;
            });
        }
        
        var def_atiVal = def_pasVal + this.actor.data.data.atributos.AGI;
        if (this.efeitos.length > 0) {
            for (let efeito of this.efeitos) {
                if (efeito.data.atributo == "DEF" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        def_pasVal += efeito.data.valor;
                        def_atiVal += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        def_pasVal -= efeito.data.valor;
                        def_atiVal -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        def_pasVal = def_pasVal * efeito.data.valor;
                        def_atiVal = def_atiVal * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        def_pasVal = def_pasVal / efeito.data.valor;
                        def_atiVal = def_atiVal / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "ABS" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        absorcao += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        absorcao -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        absorcao = absorcao * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        absorcao = absorcao / efeito.data.valor;
                    }
                }
            }
        }
        const actorData = this.actor.data.data;
        if (actorData.d_passiva.valor != def_pasVal || actorData.d_passiva.categoria != def_pasCat || actorData.d_ativa.categoria != def_pasCat || actorData.d_ativa.valor != def_atiVal || actorData.carga_transp.value != cap_usada || actorData.carga_transp.max != cap_transp || actorData.carga.value != actor_carga || actorData.absorcao.max != absorcao) {
            updatePers["data.d_passiva.valor"] = def_pasVal;
            updatePers["data.d_passiva.categoria"] = def_pasCat;
            updatePers["data.d_ativa.categoria"] = def_pasCat;
            updatePers["data.d_ativa.valor"] = def_atiVal;
            updatePers["data.carga_transp.value"] = cap_usada;
            updatePers["data.carga_transp.max"] = cap_transp;
            updatePers["data.carga.value"] = actor_carga;
            updatePers["data.absorcao.max"] = absorcao;
        }
        if (cap_transp > 0 && cap_usada < cap_transp) {
            if (!actorData.carga_transp.hasTransp) {
                updatePers["data.carga_transp.hasTransp"] = true;
            }
        } else {
            if (actorData.carga_transp.hasTransp) {
                updatePers["data.carga_transp.hasTransp"] = false;
            }
        }
        let carga_max = 0;
        if (data.actor.data.atributos.FOR >= 1) {
            carga_max = (data.actor.data.atributos.FOR * 20) + 20;
            if (data.actor.data.carga.value > carga_max) {
                if (!actorData.carga.sobrecarga || actorData.carga.valor_s != data.actor.data.carga.value - carga_max) {
                    updatePers["data.carga.sobrecarga"] = true;
                    updatePers["data.carga.valor_s"] = data.actor.data.carga.value - carga_max;
                }
            } else {
                if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                    updatePers["data.carga.sobrecarga"] = false;
                    updatePers["data.carga.valor_s"] = 0;
                }
            }
        } else {
            carga_max = 20;
            if (data.actor.data.carga.value > carga_max) {
                if (!actorData.carga.sobrecarga || actorData.carga.valor_s != data.actor.data.carga.value - carga_max) {
                    updatePers["data.carga.sobrecarga"] = true;
                    updatePers["data.carga.valor_s"] = data.actor.data.carga.value - carga_max;
                }
            } else {
                if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                    updatePers["data.carga.sobrecarga"] = false;
                    updatePers["data.carga.valor_s"] = 0;
                }
            }
        }
    }

    _attEfEhVB(data, updatePers) {
        if (!this.options.editable) return;
        let ef_base = 0;
        let vb_base = 0;
        let eh_base = 0;
    
        ef_base = data.actor.raca.data.ef_base;
        vb_base = data.actor.raca.data.vb;
        eh_base = data.actor.profissao.data.eh_base;
        
        let efMax = this.actor.data.data.atributos.FOR + this.actor.data.data.atributos.FIS + ef_base;
        let vbTotal = this.actor.data.data.atributos.FIS + vb_base;
        if (this.efeitos.length > 0) {
            for (let efeito of this.efeitos) {
                if (efeito.data.atributo == "VB" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        vbTotal += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        vbTotal -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        vbTotal = vbTotal * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        vbTotal = vbTotal / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "EF" && efeito.data.ativo) {
                    if (efeito.data.tipo == "+") {
                        efMax += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        efMax -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        efMax = efMax * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        efMax = efMax / efeito.data.valor;
                    }
                }
            }
        }
        if (this.actor.data.data.ef.max != efMax || this.actor.data.data.vb != vbTotal) {
            updatePers["data.ef.max"] = efMax;
            updatePers["data.vb"] = vbTotal
        }
        if (this.actor.data.data.estagio == 1){
            let ehMax = eh_base + this.actor.data.data.atributos.FIS;
            if (this.actor.data.data.eh.max != ehMax) {
                updatePers["data.eh.max"] = ehMax;
            }
        }
    }
    
    _rolarMoral(event) {
        const tabela_resol = this.tabela_resol;
        let moral = this.actor.data.data.moral;
        if (moral < -7) moral = -7;
        let formulaD = "1d20";
        let r = new Roll(formulaD);
        let resultado = "";
        let PrintResult = "";
        r.evaluate();
        var Dresult = r.total;
        if (moral <= 20) {
            for (let i = 0; i < tabela_resol.length; i++) {
                if (tabela_resol[i][0] == moral) {
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
                        flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
                      });
                }
            }
        } else {
            let valor_hab = moral % 20;
                if (valor_hab == 0) {
                    let vezes = moral / 20;
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
                                r.toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(moral / 20);
                    let sobra = moral % 20;
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
                                r.toMessage({
                                    user: game.user._id,
                                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                    flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
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
                            r.toMessage({
                                user: game.user._id,
                                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                                flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
                              });
                        }
                    }
                }
        }
        
    }

    _rolarAtt(event) {      // Rolar Atributo
        const actorData = this.actor.data.data;
        const target = event.currentTarget;
        let valor_teste = 0;
        const cat = $(target).data("itemId");
        const tabela_resol = this.tabela_resol;
        let resultado = "";
        let PrintResult = "";
        let habil = 0;
        var r;

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
            r = new Roll("1d20");
            r.evaluate();
            var Dresult = r.total;
            if (valor_teste <= 20) {
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == valor_teste) {
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
                            flavor: `<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} - ${habil}</h2>${coluna}${PrintResult}`
                        });
                    }
                }
            } else {
                let valor_hab = valor_teste % 20;
                if (valor_hab == 0) {
                    let vezes = valor_teste / 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll("1d20");
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
                                    flavor: `<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} - ${habil}</h2>${coluna}${PrintResult}`
                                });
                            }
                        }
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(valor_teste / 20);
                    let sobra = valor_teste % 20;
                    let dados = [];
                    for (let x = 0; x < vezes; x++){
                        dados[x] = new Roll("1d20");
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
                                    flavor: `<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} - ${habil}</h2>${coluna}${PrintResult}`
                                });
                            }
                        }
                    }
                    var dado = new Roll("1d20");
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
                                flavor: `<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} - ${habil}</h2>${coluna}${PrintResult}`
                            });
                        }
                    }
                }
            }
        }
    }

    _ativaEfeito(event) {
        event.preventDefault();
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        let ativo = item.data.data.ativo;
        let ativa;
        if (ativo) {
            ativa = false;
        } else {
            ativa = true;
        }
        item.update({
            "data.ativo": ativa
        });
    }

    _onItemRoll(event) {
        const tabela_resol = this.tabela_resol;
    
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.getOwnedItem(li.data("itemId"));
        let formulaD = "";
        var conteudo = "";
        var resultado = "";
        var PrintResult = "";
        var r;
        Hooks.callAll('tagmar_itemRoll', item, game.user);
        
        if (item.data.type == "Habilidade") {
            let bonus_hab = this.actor.data.data.bonus_habil;
            let h_total = 0;
            if (item.data.data.nivel > 0){
                h_total = item.data.data.total + bonus_hab;
            } else {
                h_total = -7 + item.data.data.ajuste.valor + item.data.data.bonus + item.data.data.penalidade + bonus_hab;
            }
            if (h_total < -7) h_total = -7;
            formulaD = "1d20";
            conteudo = "<h3 class='mediaeval rola'>Tarefas Aperfeiçoadas: </h3>" + "<h4 class='mediaeval rola rola_desc'>" + item.data.data.tarefAperf + "</h4>";
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
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name}: ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
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
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name}: ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
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
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola'>${item.name}: ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
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
                                flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name}: ${h_total}</h2>${conteudo}${coluna}${PrintResult}`
                              });
                        }
                    }
                }
            } 
        } else if (item.data.type == "Magia") {
            //const mensage = new ChatMessage();
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker({
                    actor: this.actor
                  })
            };
            chatData.content = "<img src='"+ item.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + item.name + "</h1>" + "<h2 class='mediaeval rola' style='text-align: center'>Nível: " + item.data.data.nivel + "</h2>" + "<h3 class='mediaeval rola rola_desc'>" + item.data.data.efeito + "</h3>";
            ChatMessage.create(chatData);
        } else if (item.data.type == "TecnicasCombate") {
            formulaD = "1d20";
            conteudo = "<h3 class='mediaeval rola'>Descrição: </h3>" + "<h4 class='mediaeval rola rola_desc'>" + item.data.data.descricao + "</h4>";
            r = new Roll(formulaD);
            r.evaluate();
            var Dresult = r.total;
            if (item.data.data.total <= 20) {
                for (let i = 0; i < tabela_resol.length; i++) {
                    if (tabela_resol[i][0] == item.data.data.total) {
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
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name}: ${item.data.data.total}</h2>${conteudo}${coluna}${PrintResult}`
                        });
                    }
                }
            } else {
                let valor_hab = item.data.data.total % 20;
                if (valor_hab == 0) {
                    let vezes = item.data.data.total / 20;
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
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name}: ${item.data.data.total}</h2>${conteudo}${coluna}${PrintResult}`
                                  });
                            }
                        }
                    }
                } else if (valor_hab > 0) {
                    let vezes = parseInt(item.data.data.total / 20);
                    let sobra = item.data.data.total % 20;
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
                                    flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name}: ${item.data.data.total}</h2>${conteudo}${coluna}${PrintResult}`
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
                                flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class='mediaeval rola' style="text-align:center;">${item.name}: ${item.data.data.total}</h2>${conteudo}${coluna}${PrintResult}`
                              });
                        }
                    }
                }
            } 
        } else if (item.data.type == "Combate") { //Combate
            let municao = item.data.data.municao;
            let muni_usada = 0;
            let municao_text = "";
            let punicaoText = "";
            if (municao > 0) {
                muni_usada = 1;
                municao -= 1;
                if (item.data.data.municao != municao) {
                    item.update({
                        "data.municao": municao
                    });
                    //item.render();
                }
            }
            if (muni_usada == 1) municao_text = "<h4 class='mediaeval rola'>Munição gasta: " + muni_usada + " Restam: " + municao + "</h4>";
            else municao_text = "";
            let bonus_cat = item.data.data.bonus;
            let bonus_ajustev = 0;
            const puni_25 = item.data.data.penalidade.p25;
            const puni_50 = item.data.data.penalidade.p50;
            const puni_75 = item.data.data.penalidade.p75;
            const puni_100 = item.data.data.penalidade.p100;
            if (bonus_cat == "AUR") bonus_ajustev = this.actor.data.data.atributos.AUR;
            else if (bonus_cat == "FOR") bonus_ajustev = this.actor.data.data.atributos.FOR;
            else if (bonus_cat == "AGI") bonus_ajustev = this.actor.data.data.atributos.AGI;
            else if (bonus_cat == "PER") bonus_ajustev = this.actor.data.data.atributos.PER; 
            let total_l = item.data.data.nivel + bonus_ajustev + item.data.data.bonus_magico + item.data.data.def_l;
            let total_m = item.data.data.nivel + bonus_ajustev + item.data.data.bonus_magico + item.data.data.def_m;
            let total_p = item.data.data.nivel + bonus_ajustev + item.data.data.bonus_magico + item.data.data.def_p;
            var dano_total = 0;
            var dano_text = "";
            const cat_def = this.actor.data.data.inf_ataque.cat_def;
            var valor_tabela = 0;
            if (item.data.data.nivel > 0) {
                if (cat_def == "L") valor_tabela = total_l + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
                else if (cat_def == "M") valor_tabela = total_m + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
                else if (cat_def == "P") valor_tabela = total_p + this.actor.data.data.inf_ataque.bonus - this.actor.data.data.inf_ataque.valor_def;
            } else {
                valor_tabela = -7;
            }
            if (valor_tabela < -7) valor_tabela = -7; // Abaixo da Tabela
            formulaD = "1d20";
            conteudo = "<h4 class='mediaeval rola rola_desc'>Descrição: " + item.data.data.descricao + "</h4>";
            r = new Roll(formulaD);
            r.evaluate();
            var Dresult = r.total;
            
            if (valor_tabela <= 20) { // Começa Rolagem
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
                            } else dano_total = item.data.data.dano.d25;
                        }
                        else if (resultado == "laranja") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:orange;'>Laranja - 50%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = item.data.data.dano.d25;
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
                            } else dano_total = item.data.data.dano.d50;
                        }
                        else if (resultado == "vermelho") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:red;'>Vermelho - 75%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = item.data.data.dano.d50;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = item.data.data.dano.d25;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = 0;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = 0;
                                }
                            } else dano_total = item.data.data.dano.d75;
                        }
                        else if (resultado == "azul") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:blue;'>Azul - 100%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = item.data.data.dano.d75;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = item.data.data.dano.d50;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = item.data.data.dano.d25;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = 0;
                                }
                            } else dano_total = item.data.data.dano.d100;
                        }
                        else if (resultado == "roxo") {
                            PrintResult = "<h1 class='mediaeval rola' style='color: white; text-align:center;background-color:rgb(2,9,37);'>Azul Escuro - 125%</h1>";
                            if (puni_25 || puni_50 || puni_75 || puni_100) {
                                if (puni_25) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 25%</h4>";
                                    dano_total = item.data.data.dano.d100;
                                } else if (puni_50) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 50%</h4>";
                                    dano_total = item.data.data.dano.d75;
                                } else if (puni_75) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 75%</h4>";
                                    dano_total = item.data.data.dano.d50;
                                } else if (puni_100) {
                                    punicaoText = "<h4 class='mediaeval rola' style='color: red; text-align: center;'>Penalidade 100%</h4>";
                                    dano_total = item.data.data.dano.d25;
                                }
                            } else dano_total = item.data.data.dano.d125;
                        }
                        else if (resultado == "cinza") PrintResult = "<h1 class='mediaeval rola' style='color: black; text-align:center;background-color:gray;'>Cinza - Crítico</h1>";
                        let coluna = "<h4 class='mediaeval rola'>Coluna: " + tabela_resol[i][0] + "</h4>";
                        dano_text = "<h2 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_total + "</h2>";
                            r.toMessage({
                            user: game.user._id,
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name}: ${valor_tabela} - ${item.data.data.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${punicaoText}${dano_text}`
                          });
                    }
                }
            } else {
                let coluna_t = valor_tabela % 20;
                const ajusteDano = parseInt(valor_tabela/20) * 50;
                dano_total = 0;
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
                                dano_novo = item.data.data.dano.d25;
                                break;
                            case 50:
                                dano_novo = item.data.data.dano.d50;
                                break;
                            case 75:
                                dano_novo = item.data.data.dano.d75;
                                break;
                            case 100:
                                dano_novo = item.data.data.dano.d100;
                                break;
                            case 125:
                                dano_novo = item.data.data.dano.d125;
                                break;
                            case 150:
                                dano_novo = item.data.data.dano.d150;
                                break;
                            case 175:
                                dano_novo = item.data.data.dano.d175;
                                break;
                            case 200:
                                dano_novo = item.data.data.dano.d200;
                                break;
                            case 225:
                                dano_novo = item.data.data.dano.d225;
                                break;
                            case 250:
                                dano_novo = item.data.data.dano.d250;
                                break;
                            case 275:
                                dano_novo = item.data.data.dano.d275;
                                break;
                            case 300:
                                dano_novo = item.data.data.dano.d300;
                                break;
                        }
                        let coluna = "<h4 class='mediaeval rola'>Coluna: " + tabela_resol[i][0] + "</h4>";
                        let ajuste_text = "<h1 class='mediaeval rola' style='text-align: center;'>AAC20: " + ajusteDano + "%</h1>";
                        dano_text = "<h1 class='mediaeval rola rola_dano' style='text-align: center;'>Dano: " + dano_novo + "</h1>";
                        r.toMessage({
                        user: game.user._id,
                        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                        flavor: `<img src="${item.img}" style="display: block; margin-left: auto; margin-right: auto;" /><h2 class="mediaeval rola" style="text-align:center;">${item.name}: ${valor_tabela} - ${item.data.data.tipo}</h2>${conteudo}${municao_text}${coluna}${PrintResult}${ajuste_text}${punicaoText}${dano_text}`
                        });
                    }
                }
            } 
        }
        
        
    }
}