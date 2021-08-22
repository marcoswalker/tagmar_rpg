export default class tagmarAltSheet extends ActorSheet {

    static get defaultOptions() {
        this.lastUpdate = {};
        this.lastItemsUpdate = [];
        return mergeObject(super.defaultOptions, {
        classes: ["tagmar", "sheet", "actor"],
        //width: 900,
        height: 960,
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

    async getData(options) {
        const data = super.getData(options);
        const actorUtils = await import("./actorUtils.js");
        data.dtypes = ["String", "Number", "Boolean"];
        if (data.actor.data.type == 'Personagem') {
            let updatePers = {};
            let items_toUpdate = [];
            this._prepareCharacterItems(data);
            const gameSystem = game.system.id;
            if (!game.settings.get(gameSystem, 'ajusteManual')) actorUtils._setPontosRaca(data, updatePers); // pontos = actor.data.data.carac_final.INT
            actorUtils._prepareValorTeste(data, updatePers);
            if (data.actor.raca) {
                actorUtils._preparaCaracRaciais(data, updatePers);
            }
            if (data.actor.profissao) {
                actorUtils._attProfissao(data, updatePers, items_toUpdate);
            }
            actorUtils._attCargaAbsorcaoDefesa(data, updatePers);
            if (data.actor.raca && data.actor.profissao) {
                actorUtils._attEfEhVB(data, updatePers); 
            }
            actorUtils._attProximoEstag(data, updatePers);
            actorUtils._attKarmaMax(data, updatePers);
            actorUtils._attRM(data, updatePers);
            actorUtils._attRF(data, updatePers);
            if (updatePers.hasOwnProperty('_id')) delete updatePers['_id'];
            if (this.lastUpdate) {
                if (this.lastUpdate.hasOwnProperty('_id')) delete this.lastUpdate['_id'];
            }
            if (Object.keys(updatePers).length > 0 && options.editable) {
                if (!this.lastUpdate) {
                    this.lastUpdate = updatePers;
                    data.actor.update(updatePers);
                    //ui.notifications.info("Ficha atualizada.");
                }
                else if (JSON.stringify(updatePers) !== JSON.stringify(this.lastUpdate)) {   // updatePers[Object.keys(updatePers)[0]] != this.lastUpdate[Object.keys(updatePers)[0]]
                    this.lastUpdate = updatePers;
                    data.actor.update(updatePers);
                    //ui.notifications.info("Ficha atualizada.");
                }
            }
            actorUtils._updateCombatItems(data, items_toUpdate);
            actorUtils._updateMagiasItems(data, items_toUpdate);
            actorUtils._updateTencnicasItems(data, items_toUpdate);
            if (items_toUpdate.length > 0 && options.editable) {
                if (!this.lastItemsUpdate) {
                    this.lastItemsUpdate = items_toUpdate;
                    data.actor.updateEmbeddedDocuments("Item", items_toUpdate);
                } else if (JSON.stringify(items_toUpdate) !== JSON.stringify(this.lastItemsUpdate)) {
                    this.lastItemsUpdate = items_toUpdate;
                    data.actor.updateEmbeddedDocuments("Item", items_toUpdate);
                }
            }
        } else if (data.actor.data.type == "Inventario") {
            this._prepareInventarioItems(data);
        } else if (data.actor.data.type == 'NPC') {
            let updateNpc = {};
            let updateItemsNpc = [];
            this._prepareCharacterItems(data);
            actorUtils._prepareValorTeste(data, updateNpc);
            actorUtils._attDefesaNPC(data, updateNpc);
            if (Object.keys(updateNpc).length > 0) {
                data.actor.update(updateNpc);
            }
            actorUtils._updateCombatItems(data,updateItemsNpc);
            actorUtils._updateMagiasItems(data,updateItemsNpc);
            actorUtils._updateTencnicasItems(data,updateItemsNpc);
            actorUtils._updateHabilItems(data, updateItemsNpc);
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

        html.find('.toJournal').click(this._toJournal.bind(this));

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
        html.find('.rolaR_Fis').hover(function (event) {
            $(event.currentTarget).html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function (event) {
            $(event.currentTarget).html("Física");
        });
        html.find('.rolaR_Mag').hover(function (event) {
            $(event.currentTarget).html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function (event) {
            $(event.currentTarget).html("Magia");
        });
        html.find('.rolarIniciativa').hover(function (event) {
            $(event.currentTarget).html("<i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i><i class='fas fa-dice-d20' style='margin-right:5px;'></i>");
        }, function (event) {
            $(event.currentTarget).html("Iniciativa");
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
            html.find('.descansar').click(this._descanso.bind(this));
        } 
    }

    _descanso(event) {
        let dialog = new Dialog({
            title: "Descanso",
            content: `<div class="container">
                        <div class="row">
                            <div class="col-12">
                                <select class="mediaeval tipoDescanso">
                                    <option value="full">Descanso Completo</option>
                                    <option value="meio">Descanso Curto</option>
                                </select>
                            </div>
                        </div>
                     </div>`,
            buttons: {
                "descansar": {
                    icon: '<i class="fas fa-check"></i>',
                    label: 'Descansar',
                    callback: (html) => {
                        let descanso = $('.tipoDescanso').val();
                        let changes = {};
                        if (descanso === "full") {
                            changes = {
                                'data.ef.value': this.actor.data.data.ef.max,
                                'data.eh.value': this.actor.data.data.eh.max,
                                'data.karma.value': this.actor.data.data.karma.max
                            };
                        } else if (descanso === "meio") {
                            let efAtual = this.actor.data.data.ef.value;
                            let ehAtual = this.actor.data.data.eh.value;
                            let karmaAtual = this.actor.data.data.karma.value;
                            let efMax = this.actor.data.data.ef.max;
                            let ehMax = this.actor.data.data.eh.max;
                            let karmaMax = this.actor.data.data.karma.max;
                            if (efAtual < efMax) {
                                efAtual += efMax/2;
                                if (efAtual > efMax) efAtual = efMax;
                                changes['data.ef.value'] = parseInt(efAtual)
                            }
                            if (ehAtual < ehMax) {
                                ehAtual += ehMax/2;
                                if (ehAtual > ehMax) ehAtual = ehMax;
                                changes['data.eh.value'] = parseInt(ehAtual)
                            }
                            if (karmaAtual < karmaMax) {
                                karmaAtual += karmaMax/2;
                                if (karmaAtual > karmaMax) karmaAtual = karmaMax;
                                changes['data.karma.value'] = parseInt(karmaAtual)
                            }
                        }
                        this.actor.update(changes);
                    }
                },
                "cancelar": {
                    icon: '<i class="fas fa-times"></i>',
                    label: 'Cancelar'
                }
            },
            default: "cancelar"
        });
        dialog.render(true);
    }

    async _toJournal(event) {
        let journal = await JournalEntry.create({
            name: this.actor.data.name,
            img: this.actor.data.img,
            content: `<div class="bg-img"><div class="container" style="height:100%;">
                <div class="row">
                    <div class="col-12">
                        <h2 class="fairyDust" style="text-align:center;">${this.actor.data.name}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <img src="${this.actor.data.img}" style="border-width:0;display:block;margin-left:auto;margin-right:auto;"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="mediaeval">${this.actor.data.data.descricao}</p>
                    </div>
                </div>
            </div></div>`
        });
        journal.sheet.render(true);
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
        actorData.ficha = "Pontos";
    }

}