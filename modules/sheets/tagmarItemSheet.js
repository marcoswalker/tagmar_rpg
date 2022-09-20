export default class tagmarItemSheet extends ItemSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
        classes: ["tagmar", "sheet", "item"],
        width: 600,
        height: 600,
        tabs: [{
            navSelector: ".prim-tabs",
            contentSelector: ".sheet-primary",
            initial: "basico"
            }]
        });
    }

    get template() {
        let layout = game.settings.get("tagmar_rpg", "sheetTemplate");
        if (this.object.type == "Efeito") {
            this['options']['height'] = 350;
            this['position']['height'] = 350;
            this['options']['width'] = 500;
            this['position']['width'] = 500;
        }
        if (this.object.type == "Combate") {
            this['options']['height'] = 560;
            this['position']['height'] = 560;
        }
        if (this.object.type == "Profissao") {
            this['options']['height'] = 595;
            this['position']['height'] = 595;
        }
        if (layout != "base") {
            return 'systems/tagmar_rpg/templates/sheets/'+ this.object.type.toLowerCase() +'-ficha.hbs';
        } else {
            return 'systems/tagmar_rpg/templates/sheets/'+ this.object.type.toLowerCase() +'-sheet.hbs';
        }
    }

    getData(options) {
        const data = super.getData(options);
        
        if (this.object.type == "Profissao" && this.object.system.especializacoes != "") {
            data.data.system.especializacoes = this.object.system.especializacoes.split(",");
        } else if (this.object.type == "Profissao") data.data.system.especializacoes = [];
        return data;
    }

    activateListeners(html) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find(".dano25").change(event => {
            const dano25Input = html.find(".dano25");
            var dano25 = parseInt($(dano25Input).val());
            var dano50 = dano25 + dano25;
            var dano75 = dano50 + dano25;
            var dano100 = dano75 + dano25;
            var dano125 = dano100 + dano25;
            var dano150 = dano125 + dano25;
            var dano175 = dano150 + dano25;
            var dano200 = dano175 + dano25;
            var dano225 = dano200 + dano25;
            var dano250 = dano225 + dano25;
            var dano275 = dano250 + dano25;
            var dano300 = dano275 + dano25;
            $(html.find(".dano50")).val(dano50);
            $(html.find(".dano75")).val(dano75);
            $(html.find(".dano100")).val(dano100);
            $(html.find(".dano125")).val(dano125);
            $(html.find(".dano150")).val(dano150);
            $(html.find(".dano175")).val(dano175);
            $(html.find(".dano200")).val(dano200);
            $(html.find(".dano225")).val(dano225);
            $(html.find(".dano250")).val(dano250);
            $(html.find(".dano275")).val(dano275);
            $(html.find(".dano300")).val(dano300);
        });
        html.find(".sendMessage").click(this._sendMessage.bind(this));

        html.find(".ajuste").change(this._attTotalHab(this));
        html.find(".nivel").change(this._attTotalHab(this));
        html.find(".penal").change(this._attTotalHab(this));
        html.find(".bonus").change(this._attTotalHab(this));
        html.find(".bAddEspec").click(this._addEspec.bind(this));
        html.find(".bApagaEspec").click(this._deleteEspec.bind(this));
        html.find(".armPen25").click(function (event) {
            if (event.currentTarget.checked) {
                $('.armPen50').attr('checked', false);
                $('.armPen75').attr('checked', false);
                $('.armPen100').attr('checked', false);
            }
        });
        html.find(".armPen50").click(function (event) {
            if (event.currentTarget.checked) {
                $('.armPen25').attr('checked', false);
                $('.armPen75').attr('checked', false);
                $('.armPen100').attr('checked', false);
            }
        });
        html.find(".armPen75").click(function (event) {
            if (event.currentTarget.checked) {
                $('.armPen25').attr('checked', false);
                $('.armPen50').attr('checked', false);
                $('.armPen100').attr('checked', false);
            }
        });
        html.find(".armPen100").click(function (event) {
            if (event.currentTarget.checked) {
                $('.armPen25').attr('checked', false);
                $('.armPen50').attr('checked', false);
                $('.armPen75').attr('checked', false);
            }
        });
        html.find('.abs_magica').click(this._abs_magica.bind(this));
    }

    _abs_magica(event) {
        let abs_magica = 0; 
        if (this.object.system.peso == 0) {
            abs_magica = 1;
        } else {
            abs_magica = 0;
        }
        this.object.update({'system.peso': abs_magica});
    }

    async _sendMessage(event) {
        if (this.object.isOwned) {
            let itemActor = this.object.actor.items.get(this.object.id);
            let newItem = await Item.create(itemActor.data);
            let chatData = {};
            chatData.content = '@Item['+newItem.id+']';
            ChatMessage.create(chatData);
        } else {
            let chatData = {};
            chatData.content = '@Item['+this.item.id+']';
            ChatMessage.create(chatData);
        }
    }

    _deleteEspec(event) {
        const itemData = this.object.system;
        let especD = $(event.currentTarget).data("itemId");
        let espec_list_string = itemData.especializacoes;
        let nova_string = "";
        let espec_list = espec_list_string.split(",");
        for (let i = 0; i < espec_list.length; i++) {
            if (espec_list[i] == especD) {
                espec_list.splice(i, 1);
            }
        }
        nova_string = espec_list.join(",");
        this.item.update({
            "system.especializacoes": nova_string
        });
        this.render();
    }

    _addEspec(event) {
        const item = this.object;
        const espec_name = $(".iEspecName").val();
        let espec_list = item.system.especializacoes;
        let espec_list_string = "";
        
        if (!espec_list.search(",") && espec_name != "") {
            espec_list_string = espec_name + ",";
        } else if (espec_name != "") {
            espec_list_string = espec_list + espec_name + ",";
        }
        if (espec_list_string != "") {
            item.update({
                "system.especializacoes": espec_list_string
            });
        }
        this.render();
    }
    

    _attTotalHab(event) {
        if (!this.object.isOwned) return;
        const ajuste = $(".ajuste").val();
        const nivel = $(".nivel").val();
        const penal = $(".penal").val();
        const bonus = $(".bonus").val();
        let soma = 0;
        if (nivel > 0) { 
            soma = parseInt(ajuste) + parseInt(nivel) + parseInt(penal) + parseInt(bonus);
        } else {
            soma = parseInt(ajuste) - 7 + parseInt(penal) + parseInt(bonus);
        }
        $(".totalInput2").val(soma);
    }

}