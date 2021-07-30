export default class tagmarAltSheet extends ActorSheet {

    static get defaultOptions() {
        this.lastUpdate = {};
        this.lastItemsUpdate = [];
        return mergeObject(super.defaultOptions, {
        classes: ["tagmar", "sheet", "actor"],
        //width: 900,
        height: 970,
        tabs: [{
            navSelector: ".prim-tabs",
            contentSelector: ".sheet-primary",
            initial: "basico"
            }]
        });
    }
    
    get template() {
        let gameSystem = game.system.id;
        let layout = game.settings.get(gameSystem, "sheetTemplate");
        if (this.actor.data.type == "Personagem" && layout != "base") {
            if (layout == 'tagmar3anao') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-anao.hbs';
            } else if (layout == 'tagmar3barda') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-barda.hbs';
            } else if (layout == 'tagmar3bardo') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-bardo.hbs';
            } else if (layout == 'tagmar3gana') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-gana.hbs';
            } else if (layout == 'tagmar3ghuma') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-ghuma.hbs';
            } else if (layout == 'tagmar3ghumk') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-ghumk.hbs';
            } else if (layout == 'tagmar3lhuma') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-lhuma.hbs';
            } else if (layout == 'tagmar3lpeqa') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-lpeqa.hbs';
            } else if (layout == 'tagmar3lpeq') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-lpeq.hbs';
            } else if (layout == 'tagmar3lhum') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-lhum.hbs';
            } else if (layout == 'tagmar3melfa') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-melfa.hbs';
            } else if (layout == 'tagmar3mhuma') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-mhuma.hbs';
            } else if (layout == 'tagmar3melfo') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-melfo.hbs';
            } else if (layout == 'tagmar3pap') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-pap.hbs';
            } else if (layout == 'tagmar3relf') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-relf.hbs';
            } else if (layout == 'tagmar3rhuma') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-rhuma.hbs';
            } else if (layout == 'tagmar3shum') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-shum.hbs';
            } else if (layout == 'tagmar3shumv') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-shumv.hbs';
            } else if (layout == 'tagmar3selfa') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-selfa.hbs';
            } else if (layout == 'tagmar3shum1') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-shum1.hbs';
            } else if (layout == 'tagmar3shum2') {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha-shum2.hbs';
            } else {
                return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-ficha.hbs';
            }
            
        } else if (this.actor.data.type == "Personagem" && layout == "base") {
            return 'systems/tagmar_rpg/templates/sheetsPoints/personagem-sheet.hbs';
        } else if (this.actor.data.type == "NPC" && layout != "base") {
            return 'systems/tagmar_rpg/templates/sheets/npc-ficha.hbs';
        } else if (this.actor.data.type == "Inventario" && layout != "base") {
            return 'systems/tagmar_rpg/templates/sheets/inventario-ficha.hbs';
        } else {
            return 'systems/tagmar_rpg/templates/sheets/'+ this.actor.data.type.toLowerCase() +'-sheet.hbs';
        }
    }

    getData(options) {
        const data = super.getData(options);
        data.dtypes = ["String", "Number", "Boolean"];
        if (this.actor.data.type == 'Personagem') {
            let updatePers = {};
            let items_toUpdate = [];
            this._prepareCharacterItems(data);
            const gameSystem = game.system.id;
            if (!game.settings.get(gameSystem, 'ajusteManual')) this._setPontosRaca(data, updatePers); // pontos = actor.data.data.carac_final.INT
            this._prepareValorTeste(data, updatePers);
            if (data.actor.raca) {
                this._preparaCaracRaciais(data, updatePers);
            }
            if (data.actor.profissao) {
                this._attProfissao(data, updatePers, items_toUpdate);
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
                    //ui.notifications.info("Ficha atualizada.");
                }
                else if (JSON.stringify(updatePers) !== JSON.stringify(this.lastUpdate)) {   // updatePers[Object.keys(updatePers)[0]] != this.lastUpdate[Object.keys(updatePers)[0]]
                    this.lastUpdate = updatePers;
                    this.actor.update(updatePers);
                    //ui.notifications.info("Ficha atualizada.");
                }
            }
            this._updateCombatItems(data, items_toUpdate);
            this._updateMagiasItems(data, items_toUpdate);
            this._updateTencnicasItems(data, items_toUpdate);
            if (items_toUpdate.length > 0 && options.editable) {
                if (!this.lastItemsUpdate) {
                    this.lastItemsUpdate = items_toUpdate;
                    data.actor.updateEmbeddedDocuments("Item", items_toUpdate);
                } else if (JSON.stringify(items_toUpdate) !== JSON.stringify(this.lastItemsUpdate)) {
                    this.lastItemsUpdate = items_toUpdate;
                    data.actor.updateEmbeddedDocuments("Item", items_toUpdate);
                }
            }
        } else if (this.actor.data.type == "Inventario") {
            this._prepareInventarioItems(data);
        } else if (this.actor.data.type == 'NPC') {
            let updateNpc = {};
            let updateItemsNpc = [];
            this._prepareCharacterItems(data);
            this._prepareValorTeste(data, updateNpc);
            this._attDefesaNPC(data, updateNpc);
            if (Object.keys(updateNpc).length > 0) {
                this.actor.update(updateNpc);
            }
            this._updateCombatItems(data,updateItemsNpc);
            this._updateMagiasItems(data,updateItemsNpc);
            this._updateTencnicasItems(data,updateItemsNpc);
            this._updateHabilItems(data, updateItemsNpc);
            if (updateItemsNpc.length > 0) {
                data.actor.updateEmbeddedDocuments("Item", updateItemsNpc);
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
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });

        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            let dialog = new Dialog({
                title: "Tem certeza que deseja deletar?",
                content: "<p class='rola_desc mediaeval'>Deseja mesmo <b>deletar</b> esse item?</p>",
                buttons: {
                    sim: {
                        icon: "<i class='fas fa-check'></i>",
                        label: "Confirmar",
                        callback: () => {
                            this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
                            li.slideUp(200, () => this.render(false));
                        }
                    },
                    nao: {
                        icon: '<i class="fas fa-times"></i>',
                        label: "Cancelar",
                        callback: () => {}
                    }
                },
                default: "nao"
            });
            dialog.render(true);
        });

        html.mouseleave(function (event) {
            $(event.currentTarget).find('.form_tagmar').find('a').css('box-shadow','inset 1px 1px 5px red');
        });

        html.mouseenter(function (event) {
            $(event.currentTarget).find('.form_tagmar').find('a').css('box-shadow','none');
        });
  
        if (this.actor.data.type != "Inventario") {
        //Ativa edição de descricao
        html.find('.ativaDesc').click(this._edtDesc.bind(this));

        html.find('.item-copy').click(this._duplicateItem.bind(this));

        html.find('.rollable').click(this._onItemRoll.bind(this));
        html.find('.rollable').contextmenu(this._onItemRightButton.bind(this));
        html.find('.dano_rell').click(this._danoRell.bind(this));
        html.find(".movePertence").click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
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
        html.find('.newEfeito').click(this._newEfeito.bind(this));
        html.find(".newHabilidade").click(this._newHabilidade.bind(this));
        html.find(".newCombat").click(this._newCombate.bind(this));
        html.find(".newMagia").click(this._newMagia.bind(this));
        html.find(".newPertence").click(this._newPertence.bind(this));
        html.find(".calculaNovaEH").click(this._passandoEH.bind(this));
        html.find(".rolarIniciativa").click(this._rolarIniciativa.bind(this));
        html.find('.rolaR_Fis').hover(function () {
            $('.rolaR_Fis').html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function () {
            $('.rolaR_Fis').html("Física");
        });
        html.find('.rolaR_Mag').hover(function () {
            $('.rolaR_Mag').html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function () {
            $('.rolaR_Mag').html("Magia");
        });
        html.find('.rolarIniciativa').hover(function () {
            $('.rolarIniciativa').html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function () {
            $('.rolarIniciativa').html("Iniciativa");
        });
        html.find(".roll1d10").click(ev => {
            let formula = "1d10";
            let r = new Roll(formula);
            r.evaluate({async: false});
            r.toMessage({
                user: game.user.id,
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
        html.find(".displayRaca").contextmenu(this._editRaca.bind(this));
        html.find(".displayProf").click(this._displayProf.bind(this));
        html.find(".displayProf").contextmenu(this._editProf.bind(this));
        html.find(".addGrupoArmas").click(this._addGrupoArmas.bind(this));
        html.find(".subGrupoArmas").click(this._subGrupoArmas.bind(this));
        html.find(".rolarMoral").click(this._rolarMoral.bind(this));
        html.find(".rolaR_Fis").click(this._rolaRFIS.bind(this));
        html.find(".rolaR_Mag").click(this._rolaRMAG.bind(this));
        html.find(".rolarAtt").click(this._rolarAtt.bind(this));
        html.find('.rolarAtt').hover(function (event) {
            const target = event.currentTarget;
            const cat = $(target).data("itemId");
            $(target).html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function (event) {
            const target = event.currentTarget;
            const cat = $(target).data("itemId");
            $(target).html(cat);
        });
        if (this.actor.isOwner) {
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
                let bau = null;
                actors.forEach(function (actor){
                    if (actor.isOwner && actor.data.type == "Personagem") personagem = actor;
                    if (actor.isOwner && actor.data.type == "Inventario") {
                        bau = actor;
                        inventario = actor;
                    }
                    else if (actor.data.type == "Inventario") inventario = actor;
                });
                const li = $(ev.currentTarget).parents(".item");
                const item = this.actor.items.get(li.data('itemId')); 
                personagem.createEmbeddedDocuments("Item", [item.data]); 
                if (bau == this.actor) {
                    bau.deleteEmbeddedDocuments("Item", [item.id]); 
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

    _rolarIniciativa(event) {
        if (!this.options.editable) return;
        if (game.combats.size > 0) this.actor.rollInitiative({createCombatants:false, rerollInitiative:false});
    }

    _newMagia(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        actor.createEmbeddedDocuments('Item', [{name: "Nova Magia", type: "Magia"}]).then(function (item) {
            item[0].sheet.render(true);
        });
    }

    _newPertence(event) {
        if (!this.options.editable) return;
        let create = false;
        let tipo = "";
        const actor = this.actor;
        let dialogContent = `<div>
            <label for="selectTipo" class="mediaeval">Selecione o tipo do item:</label>
            <select id="selectTipo" name="selectTipo" class="selectType mediaeval" height="30" style="margin-left:2px;">
                <option value="Pertence">Pertence</option>
                <option value="Transporte">Transporte</option>
            </select>
        </div>`;
        let dialog = new Dialog({
            title: "Escolha o tipo do item que deseja criar.",
            content: dialogContent,
            buttons: {
                criar: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Criar Item",
                    callback: html => {
                        create = true;
                        tipo = html.find(".selectType").val();
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: 'Cancelar'
                }
            },
            default: "cancel",
            close: html => {
                if (create) {
                    if (tipo.length > 0) {
                        actor.createEmbeddedDocuments("Item", [{name: `Novo ${tipo}`, type: tipo}]).then(function (item) {
                            item[0].sheet.render(true);
                        });
                    }
                }
            }
        });
        dialog.render(true);
    }

    _newCombate(event) {
        if (!this.options.editable) return;
        let create = false;
        let tipo = "";
        const actor = this.actor;
        let dialogContent = `<div>
            <label for="selectTipo" class="mediaeval">Selecione o tipo do item:</label>
            <select id="selectTipo" name="selectTipo" class="selectType mediaeval" height="30" style="margin-left:2px;">
                <option value="Ataque">Ataque</option>
                <option value="Defesa">Defesa</option>
                <option value="Tecnica">Técnica de Combate</option>
            </select>
            </div>`;
        let dialog = new Dialog({
            title: "Escolha o tipo do item que deseja criar.",
            content: dialogContent,
            buttons: {
                criar: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Criar Item",
                    callback: html => {
                        create = true;
                        tipo = html.find(".selectType").val();
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: 'Cancelar'
                }
            },
            default: "cancel",
            close: html => {
                if (create) {
                    let tipoItem = "";
                    if (tipo == "Ataque") tipoItem = "Combate";
                    else if (tipo == "Defesa") tipoItem = "Defesa";
                    else if (tipo == "Tecnica") tipoItem = "TecnicasCombate";
                    if (tipoItem.length > 0) {
                        actor.createEmbeddedDocuments("Item", [{name: "Novo Item Criado", type: tipoItem}]).then(function (item) {
                            item[0].sheet.render(true);
                        });
                    }
                }
            }
        });
        dialog.render(true);
    }

    _newHabilidade(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        actor.createEmbeddedDocuments("Item", [{name: "Nova Habilidade", type: "Habilidade", data: {tipo: "profissional"}}]).then(function (item) {
            item[0].sheet.render(true);
        });
    }

    _newEfeito(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        actor.createEmbeddedDocuments('Item', [{name: "Novo Efeito", type: "Efeito"}]).then(function (efeito) {
            efeito[0].sheet.render(true);
        });
    }

    _danoRell(event) {
        if (!this.options.editable) return;
        const tipo = $(event.currentTarget).data('tipo');
        const actor = this.actor;
        let updateComand = "";
        let valor = 0;
        if (tipo == "EF") {
            if (actor.type == "Personagem") {
                valor = actor.data.data.ef.value;
                updateComand = "EF";
            }
            else if (actor.type == "NPC") {
                valor = actor.data.data.ef_npc.value;
                updateComand = "EF_NPC";
            }
        } else if (tipo == "EH") {
            if (actor.type == "Personagem") {
                valor = actor.data.data.eh.value;
                updateComand = "EH";
            }
            else if (actor.type == "NPC") {
                valor = actor.data.data.eh_npc.value;
                updateComand = "EH_NPC";
            }
        } else if (tipo == "KARMA") {
            if (actor.type == "Personagem") {
                valor = actor.data.data.karma.value;
                updateComand = "KARMA";
            } else if (actor.type == "NPC") {
                valor = actor.data.data.karma_npc.value;
                updateComand = "KARMA_NPC";
            }
        } else if (tipo == "FOCUS") {
            if (actor.type == "Personagem" || actor.type == "NPC") {
                valor = actor.data.data.focus.value;
                updateComand = "FOCUS";
            }
        } else if (tipo == "ABS") {
            if (actor.type == "Personagem" || actor.type == "NPC") {
                valor = actor.data.data.absorcao.value;
                updateComand = "ABS";
            }
        }
        let dialog = new Dialog({
            title: "Dano/Cura na " + tipo,
            content: '<input type="number" class="dano_valor"/>',
            buttons: {
                vai: {
                    icon: '<i class="fas fa-check-circle"></i>',
                    label: 'Aceitar',
                    callback: (html) => {
                        let dano = html.find('.dano_valor').val();
                        if (dano) dano = parseInt(dano);
                        else dano = 0;
                        valor -= dano;
                    }
                },
                novai: {
                    icon: '<i class="fas fa-window-close"></i>',
                    label: 'Cancelar'
                }
            },
            default: 'vai',
            render: html => {html.css('font-family','GoudyMediaeval');},
            close: html => {
                switch (updateComand) {
                    case 'EF':
                        actor.update({'data.ef.value': valor});
                        break;
                    case 'EF_NPC':
                        actor.update({'data.ef_npc.value': valor});
                        break;
                    case 'EH':
                        actor.update({'data.eh.value': valor});
                        break;
                    case 'EH_NPC':
                        actor.update({'data.eh_npc.value': valor});
                        break;
                    case 'KARMA':
                        actor.update({'data.karma.value': valor});
                        break;
                    case 'KARMA_NPC':
                        actor.update({'data.karma_npc.value': valor});
                        break;
                    case 'FOCUS':
                        actor.update({'data.focus.value': valor});
                        break;
                    case 'ABS':
                        actor.update({'data.absorcao.value': valor});
                        break;
                }
            }
        });
        if (updateComand != "") dialog.render(true);
    }

    _updateTencnicasItems(sheetData) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
        const tecnicas = sheetData.actor.items.filter(item => item.type == "TecnicasCombate");
        let update_tecnicas = [];
        for (let tecnica of tecnicas) {
            let tec = tecnica.data;
            const ajusteTecnica = tec.data.ajuste;
            const nivel_tecnica = tec.data.nivel;
            let total = 0;
            if (ajusteTecnica.atributo == "INT") total = actorData.data.atributos.INT + nivel_tecnica;
            else if (ajusteTecnica.atributo == "CAR") total = actorData.data.atributos.CAR + nivel_tecnica;
            else if (ajusteTecnica.atributo == "AUR") total = actorData.data.atributos.AUR + nivel_tecnica;
            else if (ajusteTecnica.atributo == "FOR") total = actorData.data.atributos.FOR + nivel_tecnica;
            else if (ajusteTecnica.atributo == "FIS") total = actorData.data.atributos.FIS + nivel_tecnica;
            else if (ajusteTecnica.atributo == "AGI") total = actorData.data.atributos.AGI + nivel_tecnica;
            else if (ajusteTecnica.atributo == "PER") total = actorData.data.atributos.PER + nivel_tecnica;
            else total = nivel_tecnica;
            total += ajusteTecnica.valor;
            if (tec.data.total != total) {
                update_tecnicas.push({
                    "_id": tec._id,
                    "data.total": total
                });
            }
        }
        if (update_tecnicas.length > 0) {
            this.actor.updateEmbeddedDocuments("Item", update_tecnicas);
        }
    }

    _updateMagiasItems(sheetData) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
        const magias = sheetData.actor.items.filter(item => item.type == "Magia");
        let update_magias = [];
        for (let magia of magias) {
            let mag = magia.data;
            const aura = actorData.data.atributos.AUR;
            const m_nivel = mag.data.nivel;
            const m_karma = mag.data.total.valorKarma;
            let total = aura + m_nivel + m_karma;
            if (mag.data.total.valor != total) {
                update_magias.push({
                    "_id": mag._id,
                    "data.total.valor": total
                });
            }
        }
        if (update_magias.length > 0) {
            this.actor.updateEmbeddedDocuments("Item", update_magias);
        }
    }

    _updateHabilItems(sheetData, updateItemsNpc) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
        const habilidades = sheetData.actor.items.filter(item => item.type == "Habilidade");
        for (let habilidade of habilidades) {
            let hab = habilidade.data;
            const atributo = hab.data.ajuste.atributo;
            let hab_nivel = 0;
            let hab_penal = 0;
            let hab_bonus = 0;
            if (hab.data.nivel) hab_nivel = hab.data.nivel;
            if (hab.data.penalidade) hab_penal = hab.data.penalidade;
            if (hab.data.bonus) hab_bonus = hab.data.bonus;
            let valor_atrib = 0;
            if (atributo == "INT") valor_atrib = actorData.data.atributos.INT;
            else if (atributo == "AUR") valor_atrib = actorData.data.atributos.AUR;
            else if (atributo == "CAR") valor_atrib = actorData.data.atributos.CAR;
            else if (atributo == "FOR") valor_atrib = actorData.data.atributos.FOR;
            else if (atributo == "FIS") valor_atrib = actorData.data.atributos.FIS;
            else if (atributo == "AGI") valor_atrib = actorData.data.atributos.AGI;
            else if (atributo == "PER") valor_atrib = actorData.data.atributos.PER;
            let total = 0;
            if (hab_nivel > 0) {
                total = parseInt(valor_atrib) + parseInt(hab_nivel) + parseInt(hab_penal) + parseInt(hab_bonus);
            } else {
                total = parseInt(valor_atrib) - 7 + parseInt(hab_penal) + parseInt(hab_bonus);
            }
            if (hab.data.ajuste.valor != valor_atrib || hab.data.total != total) {
                updateItemsNpc.push({
                    "_id": hab._id,
                    "data.ajuste.valor": valor_atrib,
                    "data.total": total
                });
            }
        }
    }

    _updateCombatItems(sheetData) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
        const combates = sheetData.actor.items.filter(item => item.type == "Combate");
        let comb_updates = [];
        for (let combs of combates) {
            let comb = combs.data;
            let nivel_comb = 0;
            const bonus_magico = comb.data.bonus_magico;
            const bonus_danomais = comb.data.peso;
            const bonus_dano = comb.data.bonus_dano;
            const bonus = comb.data.bonus;
            let bonus_normal = 0;
            let bonus_valor = 0;
            if (bonus_dano == "AUR") bonus_valor = actorData.data.atributos.AUR;
            else if (bonus_dano == "FOR") bonus_valor = actorData.data.atributos.FOR;
            else if (bonus_dano == "AGI") bonus_valor = actorData.data.atributos.AGI;
            else if (bonus_dano == "PER") bonus_valor = actorData.data.atributos.PER;
            if (bonus == "AUR") bonus_normal = actorData.data.atributos.AUR;
            else if (bonus == "FOR") bonus_normal = actorData.data.atributos.FOR;
            else if (bonus == "AGI") bonus_normal = actorData.data.atributos.AGI;
            else if (bonus == "PER") bonus_normal = actorData.data.atributos.PER;
            const p_25 = comb.data.dano_base.d25;
            const p_50 = comb.data.dano_base.d50;
            const p_75 = comb.data.dano_base.d75;
            const p_100 = comb.data.dano_base.d100;
            const p_125 = comb.data.dano_base.d125;
            const p_150 = comb.data.dano_base.d150;
            const p_175 = comb.data.dano_base.d175;
            const p_200 = comb.data.dano_base.d200;
            const p_225 = comb.data.dano_base.d225;
            const p_250 = comb.data.dano_base.d250;
            const p_275 = comb.data.dano_base.d275;
            const p_300 = comb.data.dano_base.d300;
            if (comb.data.tipo == "CD") {
                nivel_comb = actorData.data.grupos.CD;
            }
            else if (comb.data.tipo == "CI") {
                nivel_comb = actorData.data.grupos.CI;
            }
            else if (comb.data.tipo == "CL") {
                nivel_comb = actorData.data.grupos.CL;
            }
            else if (comb.data.tipo == "CLD") {
                nivel_comb = actorData.data.grupos.CLD;
            }
            else if (comb.data.tipo == "EL") {
                nivel_comb = actorData.data.grupos.EL;
            }
            else if (comb.data.tipo == "CmE") {
                nivel_comb = actorData.data.grupos.CmE;
            }
            else if (comb.data.tipo == "CmM") {
                nivel_comb = actorData.data.grupos.CmM;
            }
            else if (comb.data.tipo == "EM") {
                nivel_comb = actorData.data.grupos.EM;
            }
            else if (comb.data.tipo == "PmA") {
                nivel_comb = actorData.data.grupos.PmA;
            }
            else if (comb.data.tipo == "PmL") {
                nivel_comb = actorData.data.grupos.PmL;
            }
            else if (comb.data.tipo == "CpE") {
                nivel_comb = actorData.data.grupos.CpE;
            }
            else if (comb.data.tipo == "CpM") {
                nivel_comb = actorData.data.grupos.CpM;
            }
            else if (comb.data.tipo == "EP") {
                nivel_comb = actorData.data.grupos.EP;
            }
            else if (comb.data.tipo == "PP") {
                nivel_comb = actorData.data.grupos.PP;
            }
            else if (comb.data.tipo == "PpA") {
                nivel_comb = actorData.data.grupos.PpA;
            }
            else if (comb.data.tipo == "PpB") {
                nivel_comb = actorData.data.grupos.PpB;
            }
            else if (comb.data.tipo == "") {
                nivel_comb = comb.data.nivel;
            } 
            else if (comb.data.tipo == "MAG") {
                nivel_comb = comb.data.nivel;
            }
            if (comb.data.nivel != nivel_comb || comb.data.dano.d25 != p_25 + bonus_valor + bonus_danomais || comb.data.custo != bonus_normal) {
                comb_updates.push({
                    '_id': comb._id,
                    'data.nivel': nivel_comb,
                    "data.dano.d25": p_25 + bonus_valor + bonus_danomais,
                    "data.dano.d50": p_50 + bonus_valor + bonus_danomais,
                    "data.dano.d75": p_75 + bonus_valor + bonus_danomais,
                    "data.dano.d100": p_100 + bonus_valor + bonus_danomais,
                    "data.dano.d125": p_125 + bonus_valor + bonus_danomais,
                    "data.dano.d150": p_150 + bonus_valor + bonus_danomais,
                    "data.dano.d175": p_175 + bonus_valor + bonus_danomais,
                    "data.dano.d200": p_200 + bonus_valor + bonus_danomais,
                    "data.dano.d225": p_225 + bonus_valor + bonus_danomais,
                    "data.dano.d250": p_250 + bonus_valor + bonus_danomais,
                    "data.dano.d275": p_275 + bonus_valor + bonus_danomais,
                    "data.dano.d300": p_300 + bonus_valor + bonus_danomais,
                    'data.custo': bonus_normal
                });
            }
        }
        if (comb_updates.length > 0) {
            this.actor.updateEmbeddedDocuments("Item", comb_updates);
        }
    }

    async _rolarMoral(event) {
        const tabela_resol = this.tabela_resol;
        let moral = this.actor.data.data.moral;
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
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
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
                        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                        flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
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
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                            flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
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
                        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                        flavor: `<h2 class='mediaeval rola'>Moral - ${moral}</h2>${coluna}${PrintResult}`
                    });
                }
        }
        
    }

    _attDefesaNPC(data, updateNpc) {
        if (!this.options.editable) return;
        var absorcao = 0;
        var def_pasVal = 0;
        var def_pasCat = "";
        data.actor.defesas.forEach(function(itemd){
            let item = itemd.data;
            absorcao += item.data.absorcao;
            def_pasVal += item.data.defesa_base.valor;
            if (item.data.defesa_base.tipo != ""){
                def_pasCat = item.data.defesa_base.tipo;
            }
        });
        var def_atiVal = def_pasVal + data.actor.data.data.atributos.AGI;
        const actorData = data.actor.data.data;
        if (actorData.d_passiva.valor != def_pasVal || actorData.d_passiva.categoria != def_pasCat || actorData.d_ativa.categoria != def_pasCat || actorData.d_ativa.valor != def_atiVal || actorData.absorcao.max != absorcao) {
            updateNpc["data.d_passiva.valor"] = def_pasVal;
            updateNpc["data.d_passiva.categoria"] = def_pasCat;
            updateNpc["data.d_ativa.categoria"] = def_pasCat;
            updateNpc["data.d_ativa.valor"] = def_atiVal;
            updateNpc["data.absorcao.max"] = absorcao;
        }
    }

    _prepareInventarioItems(sheetData) { 
        const actorData = sheetData.actor;
        const pertences = actorData.items.filter(item => item.type == "Pertence");
        const transportes = actorData.items.filter(item => item.type == "Transporte");
        const cesto = [];
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

    async _rolarAtt(event) {      // Rolar Atributo
        const actorData = this.actor.data.data;
        const target = event.currentTarget;
        let valor_teste = 0;
        const cat = $(target).data("itemId");
        const tabela_resol = this.tabela_resol;
        const actorImg = `<img src='${this.actor.data.img}' style='display:block;border-width:0;margin-left:auto;margin-right:auto;'/>`;
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
                    speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
                            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
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
                        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                        flavor: `${actorImg}<h2 class="mediaeval rola" style="text-align:center;">Teste de Habilidade ${cat} : ${habil}</h2>${coluna}${PrintResult}`
                    });
                }
            }
        }
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
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<img src="${this.actor.data.img}" style="display:block;margin-left:auto;margin-right:auto;border-width:0;"/><h2 class="mediaeval rola" style="text-align:center;">Teste de Resistência </h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaqueI}</h3><h3 class="mediaeval rola">Resistência Magía: ${valorDefI}</h3>${stringSucesso}`
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
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: `<img src="${this.actor.data.img}" style="display:block;margin-left:auto;margin-right:auto;border-width:0;"/><h2 class="mediaeval rola" style="text-align:center;">Teste de Resistência </h2><h3 class="mediaeval rola"> Força Ataque: ${forcAtaqueI}</h3><h3 class="mediaeval rola">Resistência Física: ${valorDefI}</h3>${stringSucesso}`
        });
        $(".F_Ataque").val("");
        if (this.actor.data.data.forca_ataque) {
            this.actor.update({
                "data.forca_ataque": null
            });
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

    _editRaca(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        const raca = actor.items.find(item => item.type == "Raca");
        if (!raca) return;
        raca.sheet.render(true);
    }

    _displayRaca(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        const racaData = actor.items.find(item => item.type == "Raca");
        if (!racaData) {
            actor.createEmbeddedDocuments("Item", [{name: "Raça", type: "Raca"}]).then(function (item) {
                item[0].sheet.render(true);
            });
        } else {
            let chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({
                    actor: this.actor
                  })
            };
            chatData.content = "<img src='"+ racaData.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + racaData.name + "</h1>"  + "<h3 class='mediaeval rola rola_desc'>" + racaData.data.data.descricao + "</h3>";
            ChatMessage.create(chatData);
        } 
    }

    _editProf(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        const profissao = actor.items.find(item => item.type == "Profissao");
        if (!profissao) return;
        profissao.sheet.render(true);
    }

    _displayProf(event) {
        if (!this.options.editable) return;
        const actor = this.actor;
        const profData = actor.items.find(item => item.type == "Profissao");
        if (!profData) {
            actor.createEmbeddedDocuments("Item", [{name: "Profissão", type: "Profissao"}]).then(function (item) {
                item[0].sheet.render(true);
            });
        } else {
            let chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({
                    actor: this.actor
                  })
            };
            chatData.content = "<img src='"+ profData.img +"' style='display: block; margin-left: auto; margin-right: auto;' /><h1 class='mediaeval rola' style='text-align: center;'>" + profData.name + "</h1>"  + "<h3 class='mediaeval rola rola_desc'>" + profData.data.data.descricao + "</h3>";
            ChatMessage.create(chatData);
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
                    nova_eh = this.profissao.data.data.lista_eh.v1;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 3 && valord10 <= 5) {
                    nova_eh = this.profissao.data.data.lista_eh.v2;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 6 && valord10 <= 8) {
                    nova_eh = this.profissao.data.data.lista_eh.v3;
                    this.actor.update({
                        "data.eh.max": eh_atual + nova_eh + attFIS
                    });
                    ui.notifications.info("Nova EH calculada.");
                } else if (valord10 >= 9 && valord10 <= 10) {
                    nova_eh = this.profissao.data.data.lista_eh.v4;
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

    _ativaEfeito(event) {
        event.preventDefault();
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        let ativo = item.data.data.ativo;
        let ativa;
        if (ativo) {
            ativa = false;
        } else {
            ativa = true;
        }
        this.actor.updateEmbeddedDocuments("Item", [{
            "_id": item.data._id,
            "data.ativo": ativa
        }]);
    }

    _onItemRightButton (event) {
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        if (typeof item.data.data.descricao == "string") {
            let content = `<div style="height:800px" class='rola_desc mediaeval'><img src="${item.data.img}" style="display:block;margin-left:auto;margin-right:auto">`;
            content += `<h1 class="fairyDust" style="text-align:center;">${item.name}</h1>`;
            if (item.data.type == "Magia") content += item.data.data.efeito ;
            else if (item.data.type == "Habilidade") {
                if (item.data.data.tarefAperf.length > 0) content += `<h3 class="mediaeval">Tarefas aperfeiçoadas:</h3>` +  item.data.data.tarefAperf;
                content += `<br><br><h3 class="mediaeval">Descrição:</h3>` + item.data.data.descricao;
            }
            else content += item.data.data.descricao;
            content += `</div>`;
            let dialog = new Dialog({
                title: item.name,
                content: content,
                buttons: {}
            });
            dialog.render(true);
        }
    }

    _onItemRoll (event) {
        let button = $(event.currentTarget);
        const li = button.parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        item.rollTagmarItem();
    }

    _duplicateItem(event) {
        const li = $(event.currentTarget).parents(".item");
        const item = this.actor.items.get(li.data("itemId"));
        let dupi = duplicate(item);
        dupi.name = dupi.name + "(Cópia)";
        this.actor.createEmbeddedDocuments("Item", [dupi]);
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

    _attRM(data, updatePers) {
        if (!this.options.editable) return;
        let rm = data.actor.data.data.estagio + data.actor.data.data.atributos.AUR;
        const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "RMAG" && e.data.data.ativo));
        efeitos.forEach(function(efeit) {
            let efeito = efeit.data;
            if (efeito.data.tipo == "+") {
                rm += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                rm -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                rm = rm * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                rm = rm / efeito.data.valor;
            }
        });
        if (data.actor.data.data.rm != rm) {
            updatePers["data.rm"] = rm;
        }
    }

    _attRF(data, updatePers) {
        if (!this.options.editable) return;
        let rf = data.actor.data.data.estagio + data.actor.data.data.atributos.FIS;
        const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "RFIS" && e.data.data.ativo));
        efeitos.forEach(function(efeit) {
            let efeito = efeit.data;
            if (efeito.data.tipo == "+") {
                rf += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                rf -= efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                rf = rf / efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                rf = rf * efeito.data.valor;
            }
        });
        if (data.actor.data.data.rf != rf) {
            updatePers["data.rf"] = rf;
        } 
    }

    _attKarmaMax(data, updatePers) {
        if (!this.options.editable) return;
        let karma = ((data.actor.data.data.atributos.AUR) + 1 ) * ((data.actor.data.data.estagio) + 1);
        if (karma < 0) karma = 0;
        const efeitos = data.actor.items.filter(e => e.type == "Efeito" && (e.data.data.atributo == "KMA" && e.data.data.ativo));
        efeitos.forEach(function(efeit) {
            let efeito = efeit.data;
            if (efeito.data.tipo == "+") {
                karma += efeito.data.valor;
            } else if (efeito.data.tipo == "-") {
                karma -= efeito.data.valor;
            } else if (efeito.data.tipo == "*") {
                karma = karma * efeito.data.valor;
            } else if (efeito.data.tipo == "/") {
                karma = karma / efeito.data.valor;
            }
        });
        if (data.actor.data.data.karma.max != karma) {
            updatePers["data.karma.max"] = karma;
        }
    }

    _attProximoEstag(data, updatePers) {
        if (!this.options.editable) return;
        let estagio_atual = data.actor.data.data.estagio;
        let prox_est = [0, 11, 21, 31, 46, 61, 76, 96, 116, 136, 166, 196, 226 , 266, 306, 346, 386, 436, 486, 536, 586, 646, 706, 766, 826, 896, 966, 1036, 1106, 1186, 1266, 
            1346, 1426, 1516, 1606, 1696, 1786, 1886, 1986, 2086];
        if (estagio_atual < 40 && data.actor.data.data.pontos_estagio.next != prox_est[estagio_atual]) {
            updatePers["data.pontos_estagio.next"] = prox_est[estagio_atual];
        }
    }

    _attEfEhVB(data, updatePers) {
        if (!this.options.editable) return;
        let ef_base = 0;
        let vb_base = 0;
        let eh_base = 0;
    
        ef_base = data.actor.raca.data.data.ef_base;
        vb_base = data.actor.raca.data.data.vb;
        eh_base = data.actor.profissao.data.data.eh_base;
        
        let efMax = data.actor.data.data.atributos.FOR + data.actor.data.data.atributos.FIS + ef_base;
        let vbTotal = data.actor.data.data.atributos.FIS + vb_base;
        const efeitos = data.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "VB" || e.data.data.atributo == "EF") && e.data.data.ativo));
        efeitos.forEach(function (efeit) {
            let efeito = efeit.data;
            if (efeito.data.atributo == "VB") {
                if (efeito.data.tipo == "+") {
                    vbTotal += efeito.data.valor;
                } else if (efeito.data.tipo == "-") {
                    vbTotal -= efeito.data.valor;
                } else if (efeito.data.tipo == "*") {
                    vbTotal = vbTotal * efeito.data.valor;
                } else if (efeito.data.tipo == "/") {
                    vbTotal = vbTotal / efeito.data.valor;
                }
            } else if (efeito.data.atributo == "EF") {
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
        });
        if (data.actor.data.data.ef.max != efMax || data.actor.data.data.vb != vbTotal) {
            updatePers["data.ef.max"] = efMax;
            updatePers["data.vb"] = vbTotal
        }
        if (data.actor.data.data.estagio == 1){
            let ehMax = eh_base + data.actor.data.data.atributos.FIS;
            if (data.actor.data.data.eh.max != ehMax) {
                updatePers["data.eh.max"] = ehMax;
            }
        }
    }

    _attCargaAbsorcaoDefesa(data, updatePers) {
        if (!this.options.editable) return;
        const actorSheet = data.actor;
        var actor_carga = 0;    // Atualiza Carga e verifica Sobrecarga
        var cap_transp = 0;
        var cap_usada = 0;
        var absorcao = 0;
        var def_pasVal = 0;
        var def_pasCat = "";
        
        if (actorSheet.defesas.length > 0){
            actorSheet.defesas.forEach(function(item){
                let itemData = item.data;
                //actor_carga += item.data.peso;
                absorcao += itemData.data.absorcao;
                def_pasVal += itemData.data.defesa_base.valor;
                if (itemData.data.defesa_base.tipo != ""){
                    def_pasCat = itemData.data.defesa_base.tipo;
                }
            });
        }
        if (actorSheet.pertences.length > 0){
            actorSheet.pertences.forEach(function(item){
                let itemData = item.data;
                actor_carga += itemData.data.peso * itemData.data.quant;
            });
        }
        if (actorSheet.transportes.length > 0){
            actorSheet.transportes.forEach(function(item){
                let itemData = item.data;
                cap_transp += itemData.data.capacidade.carga;
            });
        }
        if (actorSheet.pertences_transporte.length > 0){
            actorSheet.pertences_transporte.forEach(function(item){
                let itemData = item.data;
                cap_usada += itemData.data.peso * itemData.data.quant;
            });
        }
        
        var def_atiVal = def_pasVal + data.actor.data.data.atributos.AGI;
        const efeitos = data.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "DEF" || e.data.data.atributo == "ABS") && e.data.data.ativo));
        efeitos.forEach(function (efeit){
            let efeito = efeit.data;
            if (efeito.data.atributo == "DEF") {
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
            } else if (efeito.data.atributo == "ABS") {
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
        });
        const actorData = data.actor.data.data;
        const actorSheetData = actorSheet.data;
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
        if (actorSheetData.data.atributos.FOR >= 1) {
            carga_max = (actorSheetData.data.atributos.FOR * 20) + 20;
            if (actorSheetData.data.carga.value > carga_max) {
                if (!actorData.carga.sobrecarga || actorData.carga.valor_s != actorSheetData.data.carga.value - carga_max) {
                    updatePers["data.carga.sobrecarga"] = true;
                    updatePers["data.carga.valor_s"] = actorSheetData.data.carga.value - carga_max;
                }
            } else {
                if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                    updatePers["data.carga.sobrecarga"] = false;
                    updatePers["data.carga.valor_s"] = 0;
                }
            }
        } else {
            carga_max = 20;
            if (actorSheetData.data.carga.value > carga_max) {
                if (!actorData.carga.sobrecarga || actorData.carga.valor_s != actorSheetData.data.carga.value - carga_max) {
                    updatePers["data.carga.sobrecarga"] = true;
                    updatePers["data.carga.valor_s"] = actorSheetData.data.carga.value - carga_max;
                }
            } else {
                if (actorData.carga.sobrecarga || actorData.carga.valor_s != 0) {
                    updatePers["data.carga.sobrecarga"] = false;
                    updatePers["data.carga.valor_s"] = 0;
                }
            }
        }
    }

    _attProfissao(sheetData, updatePers, items_toUpdate) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        const actorSheetData = sheetData.actor.data;
        const profissoes = actorData.items.filter(item => item.type == "Profissao");
        if (profissoes.length > 1) {
            let ids = [];
            profissoes.slice(1).forEach(function (item) {
                ids.push(item.id);
            });
            actorData.deleteEmbeddedDocuments("Item", ids);
        }
        const profissaoP = profissoes[0];
        if (profissaoP) {
            const profissaoData = profissaoP.data;
            const max_hab = profissaoData.data.p_aquisicao.p_hab + Math.floor(actorSheetData.data.estagio / 2);
            const atrib_magia = profissaoData.data.atrib_mag;
            let pontos_hab = profissaoData.data.p_aquisicao.p_hab * actorSheetData.data.estagio;
            const grupo_pen = profissaoData.data.grupo_pen;
            const hab_nata = actorSheetData.data.hab_nata;
            let pontos_tec = profissaoData.data.p_aquisicao.p_tec * actorSheetData.data.estagio;
            let pontos_mag = 0;
            let pontos_gra = profissaoData.data.p_aquisicao.p_gra * actorSheetData.data.estagio;
            let intel = actorSheetData.data.atributos.INT;
            let aura = actorSheetData.data.atributos.AUR;
            let cari = actorSheetData.data.atributos.CAR;
            let forca = actorSheetData.data.atributos.FOR;
            let fisico = actorSheetData.data.atributos.FIS;
            let agilid = actorSheetData.data.atributos.AGI;
            let peric = actorSheetData.data.atributos.PER;
            if (updatePers.hasOwnProperty("data.atributos.INT")) intel = updatePers['data.atributos.INT'];
            if (updatePers.hasOwnProperty("data.atributos.AUR")) aura = updatePers['data.atributos.AUR'];
            if (updatePers.hasOwnProperty("data.atributos.CAR")) cari = updatePers['data.atributos.CAR'];
            if (updatePers.hasOwnProperty("data.atributos.FOR")) forca = updatePers['data.atributos.FOR'];
            if (updatePers.hasOwnProperty("data.atributos.FIS")) fisico = updatePers['data.atributos.FIS'];
            if (updatePers.hasOwnProperty("data.atributos.AGI")) agilid = updatePers['data.atributos.AGI'];
            if (updatePers.hasOwnProperty("data.atributos.PER")) peric = updatePers['data.atributos.PER'];
            if (max_hab != actorSheetData.data.max_hab) {
                updatePers["data.max_hab"] = max_hab;
            }
            if (atrib_magia != "") {
                if (atrib_magia == "INT") pontos_mag = ((2 * intel) + 7) * actorSheetData.data.estagio;
                else if (atrib_magia == "AUR") pontos_mag = ((2 * aura) + 7) * actorSheetData.data.estagio;
                else if (atrib_magia == "CAR") pontos_mag = ((2 * cari) + 7) * actorSheetData.data.estagio;
                else if (atrib_magia == "FOR") pontos_mag = ((2 * forca) + 7) * actorSheetData.data.estagio;
                else if (atrib_magia == "FIS") pontos_mag = ((2 * fisico) + 7)  * actorSheetData.data.estagio;
                else if (atrib_magia == "AGI") pontos_mag = ((2 * agilid) + 7) * actorSheetData.data.estagio;
                else if (atrib_magia == "PER") pontos_mag = ((2 * peric) + 7) * actorSheetData.data.estagio;
            } else pontos_mag = 0;
            const efeitos = sheetData.actor.items.filter(e => e.type == "Efeito" && ((e.data.data.atributo == "PHAB" || e.data.data.atributo == "PTEC" || e.data.data.atributo == "PARM" || e.data.data.atributo == "PMAG") && e.data.data.ativo));
            efeitos.forEach(function(efeit) {
                let efeito = efeit.data;
                if (efeito.data.atributo == "PHAB") {
                    if (efeito.data.tipo == "+") {
                        pontos_hab += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        pontos_hab -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        pontos_hab = pontos_hab * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        pontos_hab = pontos_hab / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "PTEC") {
                    if (efeito.data.tipo == "+") {
                        pontos_tec += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        pontos_tec -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        pontos_tec = pontos_tec * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        pontos_tec = pontos_tec / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "PARM") {
                    if (efeito.data.tipo == "+") {
                        pontos_gra += efeito.data.valor;
                    } else if (efeito.data.tipo == "-") {
                        pontos_gra -= efeito.data.valor;
                    } else if (efeito.data.tipo == "*") {
                        pontos_gra = pontos_gra * efeito.data.valor;
                    } else if (efeito.data.tipo == "/") {
                        pontos_gra = pontos_gra / efeito.data.valor;
                    }
                } else if (efeito.data.atributo == "PMAG") {
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
            });
            if (pontos_gra > 0) {
                pontos_gra -= actorSheetData.data.grupos.CD;
                pontos_gra -= actorSheetData.data.grupos.CI;
                pontos_gra -= actorSheetData.data.grupos.CL;
                pontos_gra -= actorSheetData.data.grupos.CLD;
                pontos_gra -= actorSheetData.data.grupos.EL;
                pontos_gra -= actorSheetData.data.grupos.CmE * 2;
                pontos_gra -= actorSheetData.data.grupos.CmM * 2;
                pontos_gra -= actorSheetData.data.grupos.EM * 2;
                pontos_gra -= actorSheetData.data.grupos.PmA * 2;
                pontos_gra -= actorSheetData.data.grupos.PmL * 2;
                pontos_gra -= actorSheetData.data.grupos.CpE * 3;
                pontos_gra -= actorSheetData.data.grupos.CpM * 3;
                pontos_gra -= actorSheetData.data.grupos.EP * 3;
                pontos_gra -= actorSheetData.data.grupos.PP * 3;
                pontos_gra -= actorSheetData.data.grupos.PpA * 3;
                pontos_gra -= actorSheetData.data.grupos.PpB * 3;

            }
            let tecnicasP = actorData.items.filter(item => item.type == "TecnicasCombate");
            tecnicasP.forEach(function (tecnica) {
                pontos_tec -= tecnica.data.data.custo * tecnica.data.data.nivel;
            });
            let magiasP = actorData.items.filter(item => item.type == "Magia");
            magiasP.forEach(function (magia) {
                pontos_mag -= magia.data.data.custo * magia.data.data.nivel;
            });
            //let hab_updates = [];
            let habilidadesP = actorData.items.filter(item => item.type == "Habilidade");
            habilidadesP.forEach(function (habilidade) {
                let hab_nataD = false;
                if (habilidade.data.data.tipo == grupo_pen) {
                    pontos_hab -= (habilidade.data.data.custo + 1) * habilidade.data.data.nivel;
                } else if (habilidade.name == hab_nata) {
                    hab_nataD = true;
                } else {
                    pontos_hab -= habilidade.data.data.custo * habilidade.data.data.nivel;
                }
                let hab = habilidade.data;
                const atributo = hab.data.ajuste.atributo;
                let hab_nivel = 0;
                let hab_penal = 0;
                let hab_bonus = 0;
                if (hab.data.nivel) hab_nivel = hab.data.nivel;
                if (hab.data.penalidade) hab_penal = hab.data.penalidade;
                if (hab.data.bonus) hab_bonus = hab.data.bonus;
                if (hab_nataD) hab_nivel = actorSheetData.data.estagio;
                let valor_atrib = 0;
                if (atributo == "INT") valor_atrib = intel;
                else if (atributo == "AUR") valor_atrib = aura;
                else if (atributo == "CAR") valor_atrib = cari;
                else if (atributo == "FOR") valor_atrib = forca;
                else if (atributo == "FIS") valor_atrib = fisico;
                else if (atributo == "AGI") valor_atrib = agilid;
                else if (atributo == "PER") valor_atrib = peric;
                let total = 0;
                if (hab_nivel > 0) {
                    total = parseInt(valor_atrib) + parseInt(hab_nivel) + parseInt(hab_penal) + parseInt(hab_bonus);
                } else {
                    total = parseInt(valor_atrib) - 7 + parseInt(hab_penal) + parseInt(hab_bonus);
                }
                if (hab.data.ajuste.valor != valor_atrib || hab.data.total != total) {
                    if (hab_nataD) {
                        items_toUpdate.push({
                            "_id": hab._id,
                            "data.ajuste.valor": valor_atrib,
                            "data.total": total,
                            "data.nivel": actorSheetData.data.estagio
                        }); 
                    } else {
                        items_toUpdate.push({
                            "_id": hab._id,
                            "data.ajuste.valor": valor_atrib,
                            "data.total": total
                        });
                    }
                }

            });
            if (pontos_hab != actorSheetData.data.pontos_aqui) {
                updatePers["data.pontos_aqui"] = pontos_hab;
            }
            if (pontos_tec != actorSheetData.data.pontos_tec) {
                updatePers["data.pontos_tec"] = pontos_tec;
            }
            if (pontos_gra != actorSheetData.data.pontos_comb) {
                updatePers["data.pontos_comb"] = pontos_gra;
            }
            if (pontos_mag != actorSheetData.data.pontos_mag) {
                updatePers["data.pontos_mag"] = pontos_mag;
            }
            if  (profissaoData.name != actorSheetData.data.profissao) {
                updatePers["data.profissao"] = profissaoData.name;
            }
        }
    }

    _prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;
        const combate = actorData.items.filter(item => item.type == "Combate");
        const magias = actorData.items.filter(item => item.type == "Magia");
        const h_prof = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "profissional");
        const h_man = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "manobra");
        const h_con = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "conhecimento");
        const h_sub = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "subterfugio");
        const h_inf = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "influencia");
        const h_geral = actorData.items.filter(item => item.type == "Habilidade" && item.data.data.tipo == "geral");
        const tecnicas = actorData.items.filter(item => item.type == "TecnicasCombate");
        const defesas = actorData.items.filter(item => item.type == "Defesa");
        const transportes = actorData.items.filter(item => item.type == "Transporte");
        const pertences = actorData.items.filter(item => item.type == "Pertence" && !item.data.data.inTransport);
        const pertences_transporte = actorData.items.filter(item => item.type == "Pertence" && item.data.data.inTransport);
        const racas = actorData.items.filter(item => item.type == "Raca");
        const profissoes = actorData.items.filter(item => item.type == "Profissao");
        //if (racas.length >= 1) this.actor.deleteEmbeddedDocuments("Item", [racas]);
        //if (profissoes.length >= 1) this.actor.deleteEmbeddedDocuments("Item", [item._id]);
        var especializacoes = [];
        const efeitos = actorData.items.filter(item => item.type == "Efeito");
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
            especializacoes = profissoes[0].data.data.especializacoes.split(",");
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
        if (tecnicas.length > 1) tecnicas.sort(function (a, b) {
            return a.data.data.categoria.localeCompare(b.data.data.categoria);
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

    _preparaCaracRaciais(sheetData, updatePers) {
        if (!this.options.editable) return;
        const actorData = sheetData.actor;
        const racas = actorData.items.filter(item => item.type == "Raca");
        if (racas.length > 1) {
            let ids = [];
            racas.slice(1).forEach(function (item) {
                ids.push(item.id);
            });
            actorData.deleteEmbeddedDocuments("Item", ids);  
        }
        const racaP = racas[0];
        if (racaP) {
            const racaData = racaP.data.data;
            if (actorData.data.raca != racaP.name)
            {
                updatePers['data.raca'] = racaP.name;
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

    somaPontos(atributo) {
        if (atributo <= -1) {
            return (atributo/2);
        } else if (atributo == 0) {
            return 0;
        } else if (atributo == 1) {
            return 1;
        } else if (atributo > 1) {
            return atributo + this.somaPontos(atributo - 1);
        }
    }

    _setPontosRaca(sheetData, updatePers){
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
        const raca = actorData.data.raca;
        const estagio = actorData.data.estagio;
        let pontos = 14;
        let g_int = 0;
        let g_aur = 0;
        let g_car = 0;
        let g_for = 0;
        let g_fis = 0;
        let g_agi = 0;
        let g_per = 0;
        if (raca === "Humano") pontos = 15;

        for (let x = 0; x <= estagio; x++) {
            if ((x % 2) != 0) pontos += 1;
        }

        if ((actorData.data.atributos.INT > actorData.data.mod_racial.INT) && (actorData.data.mod_racial.INT > 0)) { 
            pontos -= this.somaPontos(actorData.data.atributos.INT) - this.somaPontos(actorData.data.mod_racial.INT);
            g_int = this.somaPontos(actorData.data.atributos.INT) - this.somaPontos(actorData.data.mod_racial.INT);
        } else if ((actorData.data.atributos.INT > actorData.data.mod_racial.INT) && (actorData.data.mod_racial.INT < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.INT) - actorData.data.mod_racial.INT);
            g_int = (this.somaPontos(actorData.data.atributos.INT) - actorData.data.mod_racial.INT);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.INT - actorData.data.mod_racial.INT);
            g_int = this.somaPontos(actorData.data.atributos.INT - actorData.data.mod_racial.INT);
        }

        if ((actorData.data.atributos.AUR > actorData.data.mod_racial.AUR) && (actorData.data.mod_racial.AUR > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.AUR) - this.somaPontos(actorData.data.mod_racial.AUR);
            g_aur = this.somaPontos(actorData.data.atributos.AUR) - this.somaPontos(actorData.data.mod_racial.AUR);
        } else if ((actorData.data.atributos.AUR > actorData.data.mod_racial.AUR) && (actorData.data.mod_racial.AUR < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.AUR) - actorData.data.mod_racial.AUR);
            g_aur = (this.somaPontos(actorData.data.atributos.AUR) - actorData.data.mod_racial.AUR);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.AUR - actorData.data.mod_racial.AUR);
            g_aur = this.somaPontos(actorData.data.atributos.AUR - actorData.data.mod_racial.AUR);
        }

        if ((actorData.data.atributos.CAR > actorData.data.mod_racial.CAR) && (actorData.data.mod_racial.CAR > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.CAR) - this.somaPontos(actorData.data.mod_racial.CAR);
            g_car = this.somaPontos(actorData.data.atributos.CAR) - this.somaPontos(actorData.data.mod_racial.CAR);
        } else if ((actorData.data.atributos.CAR > actorData.data.mod_racial.CAR) && (actorData.data.mod_racial.CAR < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.CAR) - actorData.data.mod_racial.CAR);
            g_car = (this.somaPontos(actorData.data.atributos.CAR) - actorData.data.mod_racial.CAR);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.CAR - actorData.data.mod_racial.CAR);
            g_car = this.somaPontos(actorData.data.atributos.CAR - actorData.data.mod_racial.CAR);
        }

        if ((actorData.data.atributos.FOR > actorData.data.mod_racial.FOR) && (actorData.data.mod_racial.FOR > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.FOR) - this.somaPontos(actorData.data.mod_racial.FOR);
            g_for = this.somaPontos(actorData.data.atributos.FOR) - this.somaPontos(actorData.data.mod_racial.FOR);
        } else if ((actorData.data.atributos.FOR > actorData.data.mod_racial.FOR) && (actorData.data.mod_racial.FOR < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.FOR) - actorData.data.mod_racial.FOR);
            g_for = (this.somaPontos(actorData.data.atributos.FOR) - actorData.data.mod_racial.FOR);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.FOR - actorData.data.mod_racial.FOR);
            g_for = this.somaPontos(actorData.data.atributos.FOR - actorData.data.mod_racial.FOR);
        }

        if ((actorData.data.atributos.FIS > actorData.data.mod_racial.FIS) && (actorData.data.mod_racial.FIS > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.FIS) - this.somaPontos(actorData.data.mod_racial.FIS);
            g_fis = this.somaPontos(actorData.data.atributos.FIS) - this.somaPontos(actorData.data.mod_racial.FIS);
        } else if ((actorData.data.atributos.FIS > actorData.data.mod_racial.FIS) && (actorData.data.mod_racial.FIS < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.FIS) - actorData.data.mod_racial.FIS);
            g_fis = (this.somaPontos(actorData.data.atributos.FIS) - actorData.data.mod_racial.FIS);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.FIS - actorData.data.mod_racial.FIS);
            g_fis = this.somaPontos(actorData.data.atributos.FIS - actorData.data.mod_racial.FIS);
        }

        if ((actorData.data.atributos.AGI > actorData.data.mod_racial.AGI) && (actorData.data.mod_racial.AGI > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.AGI) - this.somaPontos(actorData.data.mod_racial.AGI);
            g_agi = this.somaPontos(actorData.data.atributos.AGI) - this.somaPontos(actorData.data.mod_racial.AGI);
        } else if ((actorData.data.atributos.AGI > actorData.data.mod_racial.AGI) && (actorData.data.mod_racial.AGI < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.AGI) - actorData.data.mod_racial.AGI);
            g_agi = (this.somaPontos(actorData.data.atributos.AGI) - actorData.data.mod_racial.AGI);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.AGI - actorData.data.mod_racial.AGI);
            g_agi = this.somaPontos(actorData.data.atributos.AGI - actorData.data.mod_racial.AGI);
        }

        if ((actorData.data.atributos.PER > actorData.data.mod_racial.PER) && (actorData.data.mod_racial.PER > 0)) {
            pontos -= this.somaPontos(actorData.data.atributos.PER) - this.somaPontos(actorData.data.mod_racial.PER);
            g_per = this.somaPontos(actorData.data.atributos.PER) - this.somaPontos(actorData.data.mod_racial.PER);
        } else if ((actorData.data.atributos.PER > actorData.data.mod_racial.PER) && (actorData.data.mod_racial.PER < 0)) {
            pontos -= (this.somaPontos(actorData.data.atributos.PER) - actorData.data.mod_racial.PER);
            g_per = (this.somaPontos(actorData.data.atributos.PER) - actorData.data.mod_racial.PER);
        } else {
            pontos -= this.somaPontos(actorData.data.atributos.PER - actorData.data.mod_racial.PER);
            g_per = this.somaPontos(actorData.data.atributos.PER - actorData.data.mod_racial.PER);
        }
        
        if (pontos != actorData.data.carac_final.INT) {
            updatePers['data.carac_final.INT'] = pontos;
            updatePers['data.carac_sort.INT'] = g_int;
            updatePers['data.carac_sort.AUR'] = g_aur;
            updatePers['data.carac_sort.CAR'] = g_car;
            updatePers['data.carac_sort.FOR'] = g_for;
            updatePers['data.carac_sort.FIS'] = g_fis;
            updatePers['data.carac_sort.AGI'] = g_agi;
            updatePers['data.carac_sort.PER'] = g_per;
        }
    }

    _prepareValorTeste(sheetData, updatePers){
        if (!this.options.editable) return;
        const actorData = sheetData.actor.data;
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
}